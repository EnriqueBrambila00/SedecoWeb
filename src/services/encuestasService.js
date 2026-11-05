const STORAGE_KEY = 'sedeco_encuestas_respuestas';

const getApiUrl = () =>
  import.meta.env.VITE_API_URL || 'https://sedecobackend.onrender.com';

const getLocalResponses = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error leyendo respuestas locales:', e);
    return [];
  }
};

const saveLocalResponses = (list) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error guardando respuestas locales:', e);
  }
};

/**
 * Guarda una respuesta de encuesta intentando primero en la base de datos (API)
 * y respaldando también en almacenamiento local para disponibilidad inmediata en el Dashboard.
 */
export const guardarRespuestaEncuesta = async (payload) => {
  const apiUrl = getApiUrl();
  const token = localStorage.getItem('token');
  const usuarioLocal = (() => {
    try {
      return JSON.parse(localStorage.getItem('usuario'));
    } catch {
      return null;
    }
  })();

  const nuevoRegistro = {
    id_respuesta: payload.id_respuesta || `ENC-${Date.now()}`,
    folio:
      payload.folio ||
      `SEDECO-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`,
    tipo_encuesta: payload.tipo_encuesta, // 'diagnostico' | 'canvas'
    titulo_encuesta:
      payload.tipo_encuesta === 'diagnostico'
        ? 'Diagnóstico de Emprendimiento (CDE)'
        : 'Modelo de Negocios CANVAS',
    nombre_solicitante: payload.nombre_solicitante || 'Emprendedor',
    correo_solicitante: payload.correo_solicitante || '',
    telefono_solicitante: payload.telefono_solicitante || '',
    municipio: payload.municipio || '',
    id_usuario: usuarioLocal?.id_usuario || null,
    datos: payload.datos,
    comentarios_sedeco: payload.comentarios_sedeco || '',
    fecha_registro: new Date().toISOString(),
    sincronizado_bd: false,
  };

  // Intentar guardar en el backend
  try {
    const response = await fetch(`${apiUrl}/api/encuestas/respuestas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(nuevoRegistro),
    });

    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const savedFromServer = await response.json();
        nuevoRegistro.id_respuesta =
          savedFromServer.id_respuesta || savedFromServer.id || nuevoRegistro.id_respuesta;
        nuevoRegistro.sincronizado_bd = true;
      }
    }
  } catch (err) {
    console.warn('Servidor en espera o sin endpoint remoto, respaldando registro:', err.message);
  }

  const actuales = getLocalResponses();
  actuales.unshift(nuevoRegistro);
  saveLocalResponses(actuales);

  return nuevoRegistro;
};

/**
 * Obtiene todas las respuestas de las encuestas combinando la base de datos remota y el respaldo local.
 */
export const obtenerRespuestasEncuestas = async () => {
  const apiUrl = getApiUrl();
  const token = localStorage.getItem('token');
  const locales = getLocalResponses();

  try {
    const response = await fetch(`${apiUrl}/api/encuestas/respuestas`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const remotas = await response.json();
        if (Array.isArray(remotas)) {
          // Combinar por folio / id_respuesta sin duplicar
          const mapa = new Map();
          remotas.forEach((r) => {
            const key = r.folio || r.id_respuesta;
            mapa.set(key, {
              ...r,
              datos: typeof r.datos === 'string' ? JSON.parse(r.datos) : r.datos,
              sincronizado_bd: true,
            });
          });
          locales.forEach((l) => {
            const key = l.folio || l.id_respuesta;
            if (!mapa.has(key)) {
              mapa.set(key, l);
            }
          });
          const combinadas = Array.from(mapa.values()).sort(
            (a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro)
          );
          saveLocalResponses(combinadas);
          return combinadas;
        }
      }
    }
  } catch (err) {
    console.warn('Usando registros locales de encuestas:', err.message);
  }

  return locales;
};

/**
 * Actualiza los comentarios exclusivos del personal de SEDECO o el Folio/Atendió.
 */
export const actualizarComentarioSedeco = async (id_respuesta, camposActualizados) => {
  const apiUrl = getApiUrl();
  const token = localStorage.getItem('token');

  try {
    await fetch(`${apiUrl}/api/encuestas/respuestas/${id_respuesta}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(camposActualizados),
    });
  } catch (err) {
    console.warn('Actualizando en almacenamiento local:', err.message);
  }

  const actuales = getLocalResponses().map((item) => {
    if (String(item.id_respuesta) === String(id_respuesta)) {
      return {
        ...item,
        ...camposActualizados,
        datos: {
          ...item.datos,
          ...(camposActualizados.comentarios_sedeco !== undefined
            ? { comentarios_sedeco: camposActualizados.comentarios_sedeco }
            : {}),
          ...(camposActualizados.atendio !== undefined
            ? { atendio: camposActualizados.atendio }
            : {}),
        },
      };
    }
    return item;
  });

  saveLocalResponses(actuales);
  return actuales;
};

/**
 * Elimina una respuesta de encuesta.
 */
export const eliminarRespuestaEncuesta = async (id_respuesta) => {
  const apiUrl = getApiUrl();
  const token = localStorage.getItem('token');

  try {
    await fetch(`${apiUrl}/api/encuestas/respuestas/${id_respuesta}`, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch (err) {
    console.warn('Eliminando localmente:', err.message);
  }

  const filtradas = getLocalResponses().filter(
    (item) => String(item.id_respuesta) !== String(id_respuesta)
  );
  saveLocalResponses(filtradas);
  return filtradas;
};

