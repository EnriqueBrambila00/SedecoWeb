import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import { guardarRespuestaEncuesta } from '../services/encuestasService';

const MUNICIPIOS_COLIMA = [
  'Colima',
  'Villa de Álvarez',
  'Manzanillo',
  'Tecomán',
  'Armería',
  'Comala',
  'Coquimatlán',
  'Cuauhtémoc',
  'Ixtlahuacán',
  'Minatitlán',
  'Otro',
];

const NECESIDADES_OPCIONES = [
  'Financiamiento',
  'Capacitación',
  'Contactos y redes de negocio',
  'Subsidios',
  'Asesoría',
  'Otros',
];

const TEMAS_CAPACITACION_OPCIONES = [
  'Financiero',
  'Ventas',
  'Administración',
  'Modelo de Negocios',
  'Otros',
];

/**
 * Componente de botón "Ver ejemplo" que despliega una pestaña flotante únicamente cuando el usuario lo solicita.
 */
const EjemploFlotante = ({ titulo, ejemplos, consejo }) => {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className=" d-inline-block position-relative ml-2" style={{ verticalAlign: 'middle' }}>
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        className="btn btn-sm font-weight-bold shadow-sm"
        style={{
          backgroundColor: abierto ? 'var(--color-primary)' : 'rgba(188, 149, 92, 0.18)',
          color: abierto ? '#ffffff' : 'var(--color-primary)',
          border: '1.5px solid var(--color-secondary)',
          borderRadius: '20px',
          padding: '3px 12px',
          fontSize: '0.8rem',
          transition: 'all 0.2s ease',
        }}
      >
        <i className={`fa ${abierto ? 'fa-times-circle' : 'fa-lightbulb-o'} mr-1`}></i>
        {abierto ? 'Ocultar ejemplo' : 'Ver ejemplo'}
      </button>

      {abierto && (
        <>
          {/* Fondo transparente para cerrar al hacer clic afuera */}
          <div
            onClick={() => setAbierto(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1055,
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
            }}
          />
          {/* Pestaña flotante centrada / emergente */}
          <div
            className="shadow-lg p-4"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1060,
              width: '92vw',
              maxWidth: '540px',
              maxHeight: '85vh',
              overflowY: 'auto',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              borderRadius: '16px',
              borderTop: '5px solid var(--color-secondary)',
              border: '1px solid var(--color-secondary)',
            }}
          >
            <div className="d-flex justify-content-between align-items-start mb-3 pb-2 border-bottom">
              <div className="d-flex align-items-center">
                <span
                  className="d-inline-flex align-items-center justify-content-center mr-2"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(188, 149, 92, 0.2)',
                    color: 'var(--color-secondary)',
                  }}
                >
                  <i className="fa fa-lightbulb-o fa-lg"></i>
                </span>
                <div>
                  <span
                    className="badge text-white mb-1"
                    style={{ backgroundColor: 'var(--color-secondary)', fontSize: '0.7rem' }}
                  >
                    GUÍA DE APOYO
                  </span>
                  <h6 className="mb-0 font-weight-bold" style={{ color: 'var(--color-primary)' }}>
                    {titulo}
                  </h6>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-light rounded-circle"
                onClick={() => setAbierto(false)}
                title="Cerrar ejemplo"
              >
                <i className="fa fa-times"></i>
              </button>
            </div>

            {consejo && (
              <p className="small text-muted mb-3">
                <i className="fa fa-info-circle mr-1" style={{ color: 'var(--color-secondary)' }}></i>
                {consejo}
              </p>
            )}

            <div className="mb-3">
              {ejemplos.map((ej, idx) => (
                <div
                  key={idx}
                  className="p-3 mb-2 rounded"
                  style={{
                    backgroundColor: 'rgba(127, 40, 65, 0.06)',
                    borderLeft: '4px solid var(--color-primary)',
                    fontSize: '0.9rem',
                  }}
                >
                  {ej.categoria && (
                    <div
                      className="font-weight-bold mb-1"
                      style={{ color: 'var(--color-primary)', fontSize: '0.82rem' }}
                    >
                      <i className="fa fa-check-circle mr-1" style={{ color: 'var(--color-secondary)' }}></i>
                      {ej.categoria}:
                    </div>
                  )}
                  <div style={{ color: 'var(--color-text)', lineHeight: '1.45' }}>{ej.texto}</div>
                </div>
              ))}
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => setAbierto(false)}
                className="btn btn-sm text-white font-weight-bold px-4"
                style={{ backgroundColor: 'var(--color-primary)', borderRadius: '20px' }}
              >
                ¡Entendido!
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Encuestas = () => {
  const [encuestaActiva, setEncuestaActiva] = useState('diagnostico'); // 'diagnostico' | 'canvas'
  const [guardando, setGuardando] = useState(false);
  const [exitoFolio, setExitoFolio] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-llenar nombre y correo si el usuario inició sesión
  const usuarioSesion = (() => {
    try {
      return JSON.parse(localStorage.getItem('usuario'));
    } catch {
      return null;
    }
  })();

  const hoyISO = new Date().toISOString().split('T')[0];

  // =========================================================================
  // ESTADO ENCUESTA 1: DIAGNÓSTICO DE EMPRENDIMIENTO (CDE)
  // =========================================================================
  const [diagnostico, setDiagnostico] = useState({
    fecha: hoyISO,
    lugar_atencion: 'Portal Web SEDECO Colima',
    atendio: '',
    nombre: usuarioSesion?.nombre || '',
    edad: '',
    genero: '',
    nivel_educativo: '',
    nivel_educativo_otro: '',
    ocupacion_actual: '',
    ocupacion_otro: '',
    situacion_emprendimiento: '', // 'a' | 'b' | 'c'
    estado_sat: '', // 'Sin alta en SAT' | 'Con alta en SAT'
    descripcion_emprendimiento: '',
    necesidades_prioridad: [], // Array ordenado por clic
    necesidades_otro: '',
    tiene_proyecto_negocios: '', // 'Si' | 'No'
    temas_capacitacion_prioridad: [], // Array ordenado por clic
    temas_capacitacion_otro: '',
    participar_programa_sedeco: '', // 'Si' | 'No'
    nombre_firma: usuarioSesion?.nombre || '',
    telefono: '',
    whatsapp: '',
    correo: usuarioSesion?.correo || '',
    municipio: 'Colima',
    domicilio: '',
    comentarios_sedeco: '',
  });

  // =========================================================================
  // ESTADO ENCUESTA 2: GUÍA BÁSICA MODELO DE NEGOCIOS CANVAS
  // =========================================================================
  const [canvas, setCanvas] = useState({
    nombre_emprendedor: usuarioSesion?.nombre || '',
    correo_emprendedor: usuarioSesion?.correo || '',
    telefono_emprendedor: '',
    municipio: 'Colima',
    descripcion_negocio: '',
    segmento_clientes: '',
    propuesta_valor: '',
    canales_tipo: 'Ambos (Físico y en Línea)',
    canales_distribucion: '',
    relacion_cliente: '',
    publicidad: '',
    productos_ingresos: [
      { producto: '', costo: '', precio_venta: '' },
      { producto: '', costo: '', precio_venta: '' },
    ],
    proyeccion_mensual: {
      concepto: 'Venta de producto/servicio',
      precio_promedio: '',
      unidades_mes: '',
    },
    actividades_claves: ['', '', ''],
    recursos_claves: {
      recurso_humano: '',
      mobiliario: '',
      equipo: '',
      insumos: '',
      otros: '',
    },
    red_alianzas: {
      proveedores: '',
      aliados: '',
    },
    costos_fijos: {
      renta_local: '',
      luz: '',
      agua: '',
      telefono_internet: '',
      salarios: '',
      otro_concepto: '',
      otro_monto: '',
    },
    costos_variables: [
      { concepto: 'Materia prima (insumos)', monto: '' },
      { concepto: 'Empaques / Envíos / Comisiones', monto: '' },
    ],
    requisitos_inversion: [
      { requisito: 'Mobiliario', precio: '', fuente: '' },
      { requisito: 'Equipo y maquinaria', precio: '', fuente: '' },
      { requisito: 'Insumos iniciales', precio: '', fuente: '' },
    ],
    inversion_requerida: {
      aportacion_propia: '',
      recurso_externo: '',
    },
  });

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  // Alternar prioridad en listas ordenables (Preguntas 1 y 3 de Diagnóstico)
  const togglePrioridad = (campoLista, opcion) => {
    setDiagnostico((prev) => {
      const actual = prev[campoLista];
      if (actual.includes(opcion)) {
        return { ...prev, [campoLista]: actual.filter((item) => item !== opcion) };
      } else {
        return { ...prev, [campoLista]: [...actual, opcion] };
      }
    });
  };

  // =========================================================================
  // CÁLCULOS AUTOMÁTICOS PARA MODELO CANVAS
  // =========================================================================
  const totalVendidoMesCanvas =
    (parseFloat(canvas.proyeccion_mensual.precio_promedio) || 0) *
    (parseFloat(canvas.proyeccion_mensual.unidades_mes) || 0);

  const totalCostosFijos =
    (parseFloat(canvas.costos_fijos.renta_local) || 0) +
    (parseFloat(canvas.costos_fijos.luz) || 0) +
    (parseFloat(canvas.costos_fijos.agua) || 0) +
    (parseFloat(canvas.costos_fijos.telefono_internet) || 0) +
    (parseFloat(canvas.costos_fijos.salarios) || 0) +
    (parseFloat(canvas.costos_fijos.otro_monto) || 0);

  const totalCostosVariables = canvas.costos_variables.reduce(
    (acc, item) => acc + (parseFloat(item.monto) || 0),
    0
  );

  const totalRequisitosProyecto = canvas.requisitos_inversion.reduce(
    (acc, item) => acc + (parseFloat(item.precio) || 0),
    0
  );

  const totalRecursoIniciar =
    (parseFloat(canvas.inversion_requerida.aportacion_propia) || 0) +
    (parseFloat(canvas.inversion_requerida.recurso_externo) || 0);

  // =========================================================================
  // ENVÍO DE ENCUESTA 1: DIAGNÓSTICO
  // =========================================================================
  const handleSubmitDiagnostico = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (diagnostico.necesidades_prioridad.length === 0) {
      setErrorMsg('Por favor selecciona al menos una necesidad en la pregunta 1 para establecer tu prioridad.');
      return;
    }
    if (diagnostico.temas_capacitacion_prioridad.length === 0) {
      setErrorMsg('Por favor selecciona al menos un tema de capacitación en la pregunta 3.');
      return;
    }

    setGuardando(true);
    try {
      const folioGenerado = `CDE-${new Date().getFullYear()}-${String(
        Math.floor(1000 + Math.random() * 9000)
      )}`;

      const registro = await guardarRespuestaEncuesta({
        folio: folioGenerado,
        tipo_encuesta: 'diagnostico',
        nombre_solicitante: diagnostico.nombre || diagnostico.nombre_firma,
        correo_solicitante: diagnostico.correo,
        telefono_solicitante: diagnostico.telefono || diagnostico.whatsapp,
        municipio: diagnostico.municipio,
        comentarios_sedeco: diagnostico.comentarios_sedeco,
        datos: {
          ...diagnostico,
          folio: folioGenerado,
        },
      });

      setExitoFolio({
        folio: registro.folio,
        titulo: 'Diagnóstico de Emprendimiento (CDE)',
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrorMsg('Ocurrió un error al guardar la encuesta: ' + err.message);
    } finally {
      setGuardando(false);
    }
  };

  // =========================================================================
  // ENVÍO DE ENCUESTA 2: MODELO CANVAS
  // =========================================================================
  const handleSubmitCanvas = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setGuardando(true);

    try {
      const folioGenerado = `CANVAS-${new Date().getFullYear()}-${String(
        Math.floor(1000 + Math.random() * 9000)
      )}`;

      const registro = await guardarRespuestaEncuesta({
        folio: folioGenerado,
        tipo_encuesta: 'canvas',
        nombre_solicitante: canvas.nombre_emprendedor,
        correo_solicitante: canvas.correo_emprendedor,
        telefono_solicitante: canvas.telefono_emprendedor,
        municipio: canvas.municipio,
        datos: {
          ...canvas,
          folio: folioGenerado,
          totales_calculados: {
            total_vendido_mes: totalVendidoMesCanvas,
            total_costos_fijos: totalCostosFijos,
            total_costos_variables: totalCostosVariables,
            total_requisitos_proyecto: totalRequisitosProyecto,
            total_recurso_iniciar: totalRecursoIniciar,
          },
        },
      });

      setExitoFolio({
        folio: registro.folio,
        titulo: 'Guía Básica Modelo de Negocios CANVAS',
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setErrorMsg('Ocurrió un error al guardar el Modelo CANVAS: ' + err.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <main className="main-content container py-5" style={{ minHeight: '85vh' }}>
      {/* Encabezado Principal */}
      <div className="text-center mb-5" data-aos="fade-down">
        <span
          className="badge px-3 py-2 mb-3 text-white shadow-sm"
          style={{
            backgroundColor: 'var(--color-secondary)',
            borderRadius: '20px',
            fontSize: '0.85rem',
            letterSpacing: '0.5px',
          }}
        >
          <i className="fa fa-check-square-o mr-2"></i>CENTRO DE DESARROLLO EMPRENDEDOR
        </span>
        <h1 className="display-4 font-weight-bold mb-3" style={{ color: 'var(--color-primary)' }}>
          Encuestas y Diagnóstico Empresarial
        </h1>
        <p className="lead mx-auto" style={{ color: 'var(--color-text)', maxWidth: '760px' }}>
          Selecciona la herramienta que deseas completar. En cada sección encontrarás un botón{' '}
          <strong>&ldquo;Ver ejemplo&rdquo;</strong> que puedes abrir si necesitas ideas claras de cómo contestar.
        </p>
      </div>

      {/* Selector Interactivo de las 2 Encuestas */}
      <div className="row justify-content-center mb-5" data-aos="fade-up">
        <div className="col-md-6 col-lg-5 mb-3 mb-md-0">
          <div
            onClick={() => {
              setEncuestaActiva('diagnostico');
              setExitoFolio(null);
              setErrorMsg('');
            }}
            className="card h-100 shadow-sm p-3"
            style={{
              cursor: 'pointer',
              borderRadius: '16px',
              border:
                encuestaActiva === 'diagnostico'
                  ? '3px solid var(--color-primary)'
                  : '1px solid var(--color-border)',
              backgroundColor:
                encuestaActiva === 'diagnostico'
                  ? 'rgba(127, 40, 65, 0.06)'
                  : 'var(--color-surface)',
              transition: 'all 0.25s ease',
            }}
          >
            <div className="card-body d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center mr-3 flex-shrink-0"
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  backgroundColor:
                    encuestaActiva === 'diagnostico'
                      ? 'var(--color-primary)'
                      : 'rgba(127, 40, 65, 0.12)',
                  color: encuestaActiva === 'diagnostico' ? '#ffffff' : 'var(--color-primary)',
                }}
              >
                <i className="fa fa-clipboard fa-2x"></i>
              </div>
              <div>
                <span
                  className="badge mb-1"
                  style={{
                    backgroundColor: 'var(--color-secondary)',
                    color: '#fff',
                  }}
                >
                  Encuesta 1
                </span>
                <h5 className="font-weight-bold mb-1" style={{ color: 'var(--color-primary)' }}>
                  Cédula de Diagnóstico Emprendedor
                </h5>
                <p className="small text-muted mb-0">
                  Identifica la etapa actual de tu idea o negocio, necesidades prioritarias y temas de capacitación.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-5">
          <div
            onClick={() => {
              setEncuestaActiva('canvas');
              setExitoFolio(null);
              setErrorMsg('');
            }}
            className="card h-100 shadow-sm p-3"
            style={{
              cursor: 'pointer',
              borderRadius: '16px',
              border:
                encuestaActiva === 'canvas'
                  ? '3px solid var(--color-primary)'
                  : '1px solid var(--color-border)',
              backgroundColor:
                encuestaActiva === 'canvas'
                  ? 'rgba(127, 40, 65, 0.06)'
                  : 'var(--color-surface)',
              transition: 'all 0.25s ease',
            }}
          >
            <div className="card-body d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center mr-3 flex-shrink-0"
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '50%',
                  backgroundColor:
                    encuestaActiva === 'canvas'
                      ? 'var(--color-primary)'
                      : 'rgba(127, 40, 65, 0.12)',
                  color: encuestaActiva === 'canvas' ? '#ffffff' : 'var(--color-primary)',
                }}
              >
                <i className="fa fa-th-large fa-2x"></i>
              </div>
              <div>
                <span
                  className="badge mb-1"
                  style={{
                    backgroundColor: 'var(--color-secondary)',
                    color: '#fff',
                  }}
                >
                  Encuesta 2
                </span>
                <h5 className="font-weight-bold mb-1" style={{ color: 'var(--color-primary)' }}>
                  Guía Básica Modelo CANVAS
                </h5>
                <p className="small text-muted mb-0">
                  Estructura tus clientes, propuesta de valor, costos, ingresos e inversión con cálculos automáticos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mensaje de confirmación cuando se envía con éxito */}
      {exitoFolio && (
        <div
          className="card border-0 shadow-lg mb-5 p-4 text-center"
          style={{
            borderRadius: '16px',
            borderTop: '6px solid #28a745',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <div className="py-3">
            <i className="fa fa-check-circle fa-4x text-success mb-3"></i>
            <h3 className="font-weight-bold" style={{ color: 'var(--color-primary)' }}>
              ¡Tu encuesta se ha registrado exitosamente!
            </h3>
            <p className="lead mb-2" style={{ color: 'var(--color-text)' }}>
              Formulario: <strong>{exitoFolio.titulo}</strong>
            </p>
            <div
              className="d-inline-block px-4 py-2 my-2 rounded font-weight-bold"
              style={{
                backgroundColor: 'rgba(188, 149, 92, 0.2)',
                color: 'var(--color-primary)',
                fontSize: '1.15rem',
                border: '1px dashed var(--color-secondary)',
              }}
            >
              Folio de seguimiento: {exitoFolio.folio}
            </div>
            <p className="text-muted small mt-2">
              Tu información ya fue enviada y está disponible en el Panel de Control de SEDECO para su revisión y seguimiento.
            </p>
            <div className="mt-3">
              <button
                type="button"
                className="btn text-white font-weight-bold px-4 mr-2"
                style={{ backgroundColor: 'var(--color-primary)', borderRadius: '25px' }}
                onClick={() => setExitoFolio(null)}
              >
                Llenar otra respuesta
              </button>
              <button
                type="button"
                className="btn text-white font-weight-bold px-4"
                style={{ backgroundColor: 'var(--color-secondary)', borderRadius: '25px' }}
                onClick={() => {
                  setExitoFolio(null);
                  setEncuestaActiva(encuestaActiva === 'diagnostico' ? 'canvas' : 'diagnostico');
                }}
              >
                Ir a la otra encuesta <i className="fa fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="alert alert-danger shadow-sm text-center font-weight-bold mb-4" role="alert">
          <i className="fa fa-exclamation-triangle mr-2"></i>
          {errorMsg}
        </div>
      )}

      {/* =====================================================================
          FORMULARIO 1: DIAGNÓSTICO DE EMPRENDIMIENTO (CDE)
         ===================================================================== */}
      {encuestaActiva === 'diagnostico' && !exitoFolio && (
        <form onSubmit={handleSubmitDiagnostico}>
          <div
            className="card shadow-lg border-0 mb-5"
            style={{ borderRadius: '16px', overflow: 'hidden' }}
          >
            <div
              className="p-4 text-white d-flex justify-content-between align-items-center flex-wrap"
              style={{
                backgroundColor: 'var(--color-primary)',
                borderBottom: '4px solid var(--color-secondary)',
              }}
            >
              <div>
                <h3 className="mb-1 font-weight-bold">
                  <i className="fa fa-file-text-o mr-2"></i>
                  Cuestionario de Diagnóstico Emprendedor
                </h3>
                <p className="mb-0 text-white-50 small">
                  Centro de Desarrollo Emprendedor — Secretaría de Desarrollo Económico (SEDECO)
                </p>
              </div>
              <span
                className="badge px-3 py-2 mt-2 mt-md-0"
                style={{ backgroundColor: 'var(--color-secondary)', color: '#fff', fontSize: '0.85rem' }}
              >
                Fecha: {diagnostico.fecha}
              </span>
            </div>

            <div className="card-body p-4 p-md-5">
              {/* SECCIÓN A: DATOS GENERALES */}
              <div className="mb-5">
                <h5
                  className="font-weight-bold pb-2 mb-4 border-bottom d-flex align-items-center flex-wrap"
                  style={{ color: 'var(--color-primary)' }}
                >
                  <span>
                    <i className="fa fa-user-circle mr-2" style={{ color: 'var(--color-secondary)' }}></i>
                    Datos Generales del Solicitante
                  </span>
                  <EjemploFlotante
                    titulo="Datos Generales y Perfil"
                    consejo="Completa tus datos básicos para poder brindarte atención personalizada según tu perfil."
                    ejemplos={[
                      {
                        categoria: 'Lugar de atención',
                        texto:
                          'Puedes dejar "Portal Web SEDECO Colima" si lo llenas en línea, o poner "Complejo Administrativo Colima" / "Feria MiPyME" si estás en un módulo presencial.',
                      },
                      {
                        categoria: 'Ocupación actual',
                        texto:
                          'Si trabajas en una empresa pero quieres iniciar un negocio por las tardes, selecciona "Empleado(a)". Si ya vives de tu oficio o comercio, selecciona "Negocio propio".',
                      },
                    ]}
                  />
                </h5>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="font-weight-bold small">Fecha</label>
                    <input
                      type="date"
                      className="form-control"
                      value={diagnostico.fecha}
                      onChange={(e) => setDiagnostico({ ...diagnostico, fecha: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="font-weight-bold small">Lugar de atención</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej. Portal Web SEDECO / Complejo Administrativo"
                      value={diagnostico.lugar_atencion}
                      onChange={(e) =>
                        setDiagnostico({ ...diagnostico, lugar_atencion: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="font-weight-bold small">
                      Atendió <span className="text-muted font-weight-normal">(Opcional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre del asesor (si aplica)"
                      value={diagnostico.atendio}
                      onChange={(e) => setDiagnostico({ ...diagnostico, atendio: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="font-weight-bold small">Nombre Completo *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ej. María Guadalupe Hernández López"
                      value={diagnostico.nombre}
                      onChange={(e) =>
                        setDiagnostico({
                          ...diagnostico,
                          nombre: e.target.value,
                          nombre_firma: diagnostico.nombre_firma || e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-2 mb-3">
                    <label className="font-weight-bold small">Edad *</label>
                    <input
                      type="number"
                      min="15"
                      max="110"
                      className="form-control"
                      placeholder="Ej. 32"
                      value={diagnostico.edad}
                      onChange={(e) => setDiagnostico({ ...diagnostico, edad: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="font-weight-bold small d-block">Género *</label>
                    <div className="d-flex flex-wrap" style={{ gap: '0.4rem' }}>
                      {['Hombre', 'Mujer', 'Prefiero no responder'].map((gen) => (
                        <button
                          key={gen}
                          type="button"
                          onClick={() => setDiagnostico({ ...diagnostico, genero: gen })}
                          className="btn btn-sm font-weight-bold"
                          style={{
                            borderRadius: '20px',
                            backgroundColor:
                              diagnostico.genero === gen
                                ? 'var(--color-primary)'
                                : 'transparent',
                            color:
                              diagnostico.genero === gen ? '#ffffff' : 'var(--color-text)',
                            border: '1.5px solid var(--color-primary)',
                          }}
                        >
                          {gen}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nivel educativo */}
                <div className="mb-3">
                  <label className="font-weight-bold small d-block">Nivel educativo *</label>
                  <div className="d-flex flex-wrap" style={{ gap: '0.5rem' }}>
                    {[
                      'Primaria',
                      'Secundaria',
                      'Bachillerato',
                      'Nivel Superior',
                      'Posgrado',
                      'Otro',
                    ].map((niv) => (
                      <button
                        key={niv}
                        type="button"
                        onClick={() => setDiagnostico({ ...diagnostico, nivel_educativo: niv })}
                        className="btn btn-sm px-3 py-2 font-weight-bold"
                        style={{
                          borderRadius: '20px',
                          backgroundColor:
                            diagnostico.nivel_educativo === niv
                              ? 'var(--color-secondary)'
                              : 'transparent',
                          color:
                            diagnostico.nivel_educativo === niv
                              ? '#ffffff'
                              : 'var(--color-text)',
                          border: '1.5px solid var(--color-secondary)',
                        }}
                      >
                        {niv}
                      </button>
                    ))}
                  </div>
                  {diagnostico.nivel_educativo === 'Otro' && (
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Especifica tu nivel educativo (Ej. Carrera técnica)"
                      value={diagnostico.nivel_educativo_otro}
                      onChange={(e) =>
                        setDiagnostico({ ...diagnostico, nivel_educativo_otro: e.target.value })
                      }
                      required
                    />
                  )}
                </div>

                {/* Ocupación actual */}
                <div className="mb-3">
                  <label className="font-weight-bold small d-block">Ocupación actual *</label>
                  <div className="d-flex flex-wrap" style={{ gap: '0.5rem' }}>
                    {[
                      'Empleado (a)',
                      'Negocio propio',
                      'Desempleado (a)',
                      'Labores del Hogar',
                      'Otro',
                    ].map((ocu) => (
                      <button
                        key={ocu}
                        type="button"
                        onClick={() => setDiagnostico({ ...diagnostico, ocupacion_actual: ocu })}
                        className="btn btn-sm px-3 py-2 font-weight-bold"
                        style={{
                          borderRadius: '20px',
                          backgroundColor:
                            diagnostico.ocupacion_actual === ocu
                              ? 'var(--color-primary)'
                              : 'transparent',
                          color:
                            diagnostico.ocupacion_actual === ocu
                              ? '#ffffff'
                              : 'var(--color-text)',
                          border: '1.5px solid var(--color-primary)',
                        }}
                      >
                        {ocu === 'Otro' ? 'Otro, ¿Cuál?' : ocu}
                      </button>
                    ))}
                  </div>
                  {diagnostico.ocupacion_actual === 'Otro' && (
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="¿Cuál es tu ocupación actual? (Ej. Estudiante universitario / Freelance)"
                      value={diagnostico.ocupacion_otro}
                      onChange={(e) =>
                        setDiagnostico({ ...diagnostico, ocupacion_otro: e.target.value })
                      }
                      required
                    />
                  )}
                </div>
              </div>

              {/* SECCIÓN B: SITUACIÓN ACTUAL DE EMPRENDIMIENTO */}
              <div className="mb-5">
                <h5
                  className="font-weight-bold pb-2 mb-4 border-bottom d-flex align-items-center flex-wrap"
                  style={{ color: 'var(--color-primary)' }}
                >
                  <span>
                    <i className="fa fa-rocket mr-2" style={{ color: 'var(--color-secondary)' }}></i>
                    Situación Actual de Emprendimiento
                  </span>
                  <EjemploFlotante
                    titulo="¿Cómo describir en qué consiste tu emprendimiento?"
                    consejo="Explica qué producto o servicio ofreces (o planeas ofrecer), cómo funciona y a quién se lo vendes."
                    ejemplos={[
                      {
                        categoria: 'Ejemplo A (Idea de emprendimiento)',
                        texto:
                          '"Quiero elaborar salsas artesanales de chile habanero con tamarindo de Colima, envasadas al vacío para venderlas en tiendas locales y por redes sociales."',
                      },
                      {
                        categoria: 'Ejemplo B (Producto definido para empezar a vender)',
                        texto:
                          '"Ya tengo las recetas y pruebas de repostería saludable sin azúcar para personas diabéticas; busco iniciar ventas bajo pedido desde casa."',
                      },
                      {
                        categoria: 'Ejemplo C (Ya estoy vendiendo)',
                        texto:
                          '"Tengo un taller de serigrafía y bordado de uniformes escolares y empresariales con 1 año operando en Villa de Álvarez."',
                      },
                    ]}
                  />
                </h5>

                <label className="font-weight-bold small d-block mb-2">
                  Selecciona la opción que mejor describe tu etapa actual: *
                </label>

                <div className="row mb-3">
                  {[
                    {
                      id: 'a) Tengo una idea de emprendimiento',
                      titulo: 'a) Tengo una idea de emprendimiento',
                      desc: 'Aún estoy definiendo cómo funcionará mi negocio.',
                      icon: 'fa-lightbulb-o',
                    },
                    {
                      id: 'b) Tengo definido un producto o servicio para empezar a vender',
                      titulo: 'b) Tengo definido un producto o servicio para empezar a vender',
                      desc: 'Ya sé qué voy a ofrecer y estoy listo(a) para lanzar.',
                      icon: 'fa-cube',
                    },
                    {
                      id: 'c) Ya estoy vendiendo',
                      titulo: 'c) Ya estoy vendiendo',
                      desc: 'Ya tengo clientes y ventas activas.',
                      icon: 'fa-shopping-bag',
                    },
                  ].map((op) => {
                    const seleccionado = diagnostico.situacion_emprendimiento === op.id;
                    return (
                      <div className="col-md-4 mb-3" key={op.id}>
                        <div
                          onClick={() =>
                            setDiagnostico({ ...diagnostico, situacion_emprendimiento: op.id })
                          }
                          className="p-3 h-100 rounded shadow-sm"
                          style={{
                            cursor: 'pointer',
                            border: seleccionado
                              ? '2.5px solid var(--color-primary)'
                              : '1px solid var(--color-border)',
                            backgroundColor: seleccionado
                              ? 'rgba(127, 40, 65, 0.08)'
                              : 'var(--color-surface)',
                          }}
                        >
                          <div className="d-flex align-items-center mb-2">
                            <i
                              className={`fa ${op.icon} fa-lg mr-2`}
                              style={{ color: 'var(--color-secondary)' }}
                            ></i>
                            <strong style={{ color: 'var(--color-primary)', fontSize: '0.92rem' }}>
                              {op.titulo}
                            </strong>
                          </div>
                          <p className="small text-muted mb-0">{op.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Si elige c) Ya estoy vendiendo -> mostrar Sin alta en SAT / Con alta en SAT */}
                {diagnostico.situacion_emprendimiento === 'c) Ya estoy vendiendo' && (
                  <div
                    className="p-3 mb-3 rounded"
                    style={{
                      backgroundColor: 'rgba(188, 149, 92, 0.12)',
                      borderLeft: '4px solid var(--color-secondary)',
                    }}
                  >
                    <label className="font-weight-bold small d-block mb-2">
                      Situación fiscal actual ante el SAT: *
                    </label>
                    <div className="d-flex flex-wrap" style={{ gap: '0.75rem' }}>
                      {['Sin alta en SAT', 'Con alta en SAT'].map((sat) => (
                        <button
                          key={sat}
                          type="button"
                          onClick={() => setDiagnostico({ ...diagnostico, estado_sat: sat })}
                          className="btn btn-sm px-4 py-2 font-weight-bold"
                          style={{
                            borderRadius: '20px',
                            backgroundColor:
                              diagnostico.estado_sat === sat
                                ? 'var(--color-primary)'
                                : 'var(--color-surface)',
                            color:
                              diagnostico.estado_sat === sat ? '#ffffff' : 'var(--color-text)',
                            border: '1.5px solid var(--color-primary)',
                          }}
                        >
                          <i
                            className={`fa ${
                              diagnostico.estado_sat === sat ? 'fa-check-circle' : 'fa-circle-o'
                            } mr-2`}
                          ></i>
                          {sat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="font-weight-bold">
                    De acuerdo a su respuesta anterior, mencione en qué consiste su emprendimiento: *
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Describe brevemente tu producto o servicio, qué problema resuelve y a quién va dirigido..."
                    value={diagnostico.descripcion_emprendimiento}
                    onChange={(e) =>
                      setDiagnostico({
                        ...diagnostico,
                        descripcion_emprendimiento: e.target.value,
                      })
                    }
                    required
                  ></textarea>
                </div>
              </div>

              {/* SECCIÓN C: PREGUNTAS 1 A 4 */}
              <div className="mb-5">
                <h5
                  className="font-weight-bold pb-2 mb-4 border-bottom"
                  style={{ color: 'var(--color-primary)' }}
                >
                  <i className="fa fa-list-ol mr-2" style={{ color: 'var(--color-secondary)' }}></i>
                  Detección de Necesidades y Capacitación
                </h5>

                {/* PREGUNTA 1 */}
                <div className="mb-4 p-3 rounded" style={{ border: '1px solid var(--color-border)' }}>
                  <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                    <label className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                      1.- Señale qué tipo de necesidades considera más importantes para iniciar o desarrollar su negocio (en orden de prioridad): *
                    </label>
                    <EjemploFlotante
                      titulo="Cómo ordenar tus necesidades por prioridad"
                      consejo="Haz clic en los botones en el orden de importancia para ti. El primero que toques será tu prioridad #1."
                      ejemplos={[
                        {
                          categoria: 'Ejemplo de ordenamiento',
                          texto:
                            '1° Financiamiento (para comprar horno), 2° Capacitación (para llevar mis cuentas), 3° Contactos y redes de negocio (para entrar a ferias Hecho en Colima).',
                        },
                      ]}
                    />
                  </div>
                  <p className="small text-muted mb-3">
                    Haz clic sobre cada opción en el orden de importancia para ti (se numerarán 1°, 2°, 3°...):
                  </p>

                  <div className="d-flex flex-wrap mb-2" style={{ gap: '0.6rem' }}>
                    {NECESIDADES_OPCIONES.map((nec) => {
                      const pos = diagnostico.necesidades_prioridad.indexOf(nec);
                      const seleccionado = pos !== -1;
                      return (
                        <button
                          key={nec}
                          type="button"
                          onClick={() => togglePrioridad('necesidades_prioridad', nec)}
                          className="btn px-3 py-2 font-weight-bold d-flex align-items-center"
                          style={{
                            borderRadius: '25px',
                            backgroundColor: seleccionado
                              ? 'var(--color-primary)'
                              : 'var(--color-surface)',
                            color: seleccionado ? '#ffffff' : 'var(--color-text)',
                            border: '1.5px solid var(--color-primary)',
                          }}
                        >
                          {seleccionado && (
                            <span
                              className="badge badge-light mr-2"
                              style={{ color: 'var(--color-primary)', borderRadius: '50%' }}
                            >
                              {pos + 1}°
                            </span>
                          )}
                          {nec === 'Otros' ? 'Otros: ¿Cuál?' : nec}
                        </button>
                      );
                    })}
                  </div>

                  {diagnostico.necesidades_prioridad.length > 0 && (
                    <div className="d-flex align-items-center justify-content-between flex-wrap mt-2 pt-2 border-top">
                      <span className="small font-weight-bold" style={{ color: 'var(--color-secondary)' }}>
                        Tu orden de prioridad:{' '}
                        {diagnostico.necesidades_prioridad
                          .map((n, i) => `${i + 1}°. ${n}`)
                          .join(' → ')}
                      </span>
                      <button
                        type="button"
                        className="btn btn-link btn-sm text-danger p-0"
                        onClick={() =>
                          setDiagnostico({ ...diagnostico, necesidades_prioridad: [] })
                        }
                      >
                        Reiniciar orden
                      </button>
                    </div>
                  )}

                  {diagnostico.necesidades_prioridad.includes('Otros') && (
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder="Especifica qué otra necesidad tienes (Ej. Registro de marca, código de barras, permisos)"
                      value={diagnostico.necesidades_otro}
                      onChange={(e) =>
                        setDiagnostico({ ...diagnostico, necesidades_otro: e.target.value })
                      }
                      required
                    />
                  )}
                </div>

                {/* PREGUNTA 2 */}
                <div className="mb-4 p-3 rounded" style={{ border: '1px solid var(--color-border)' }}>
                  <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                    <label className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                      2.- ¿Ha realizado un proyecto de negocios, modelo o plan para su emprendimiento? *
                    </label>
                    <EjemploFlotante
                      titulo="¿Qué es un proyecto o modelo de negocios?"
                      ejemplos={[
                        {
                          categoria: 'Selecciona "Sí"',
                          texto:
                            'Si ya tienes escrito un Modelo CANVAS, un plan financiero con costos y precios, o un estudio de mercado básico.',
                        },
                        {
                          categoria: 'Selecciona "No"',
                          texto:
                            'Si aún llevas todo mentalmente. ¡No te preocupes! Puedes llenar la Encuesta 2 (Guía Básica CANVAS) aquí mismo para armar el tuyo.',
                        },
                      ]}
                    />
                  </div>
                  <div className="d-flex mt-2" style={{ gap: '1rem' }}>
                    {['Sí', 'No'].map((resp) => (
                      <button
                        key={resp}
                        type="button"
                        onClick={() =>
                          setDiagnostico({ ...diagnostico, tiene_proyecto_negocios: resp })
                        }
                        className="btn px-4 py-2 font-weight-bold"
                        style={{
                          borderRadius: '25px',
                          backgroundColor:
                            diagnostico.tiene_proyecto_negocios === resp
                              ? 'var(--color-primary)'
                              : 'transparent',
                          color:
                            diagnostico.tiene_proyecto_negocios === resp
                              ? '#ffffff'
                              : 'var(--color-text)',
                          border: '1.5px solid var(--color-primary)',
                        }}
                      >
                        {resp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PREGUNTA 3 */}
                <div className="mb-4 p-3 rounded" style={{ border: '1px solid var(--color-border)' }}>
                  <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
                    <label className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                      3.- ¿Si pudiera usted capacitarse en favor de su proyecto, en qué temas considera le beneficiarían? (En orden de prioridad) *
                    </label>
                    <EjemploFlotante
                      titulo="Temas de Capacitación Empresarial"
                      ejemplos={[
                        {
                          categoria: 'Financiero',
                          texto: 'Cómo calcular costos, fijar precios, separar gastos personales de los del negocio y solicitar créditos.',
                        },
                        {
                          categoria: 'Ventas y Marketing',
                          texto: 'Cómo vender en redes sociales, Mercado Libre, atención al cliente y cierre de ventas.',
                        },
                        {
                          categoria: 'Administración / Modelo de Negocios',
                          texto: 'Control de inventarios, organización del personal y planeación estratégica con CANVAS.',
                        },
                      ]}
                    />
                  </div>
                  <p className="small text-muted mb-3">
                    Haz clic en las opciones según tu orden de prioridad (1°, 2°, 3°...):
                  </p>

                  <div className="d-flex flex-wrap mb-2" style={{ gap: '0.6rem' }}>
                    {TEMAS_CAPACITACION_OPCIONES.map((tema) => {
                      const pos = diagnostico.temas_capacitacion_prioridad.indexOf(tema);
                      const seleccionado = pos !== -1;
                      return (
                        <button
                          key={tema}
                          type="button"
                          onClick={() => togglePrioridad('temas_capacitacion_prioridad', tema)}
                          className="btn px-3 py-2 font-weight-bold d-flex align-items-center"
                          style={{
                            borderRadius: '25px',
                            backgroundColor: seleccionado
                              ? 'var(--color-secondary)'
                              : 'var(--color-surface)',
                            color: seleccionado ? '#ffffff' : 'var(--color-text)',
                            border: '1.5px solid var(--color-secondary)',
                          }}
                        >
                          {seleccionado && (
                            <span
                              className="badge badge-light mr-2"
                              style={{ color: 'var(--color-primary)', borderRadius: '50%' }}
                            >
                              {pos + 1}°
                            </span>
                          )}
                          {tema === 'Otros' ? 'Otros: ¿Cuáles?' : tema}
                        </button>
                      );
                    })}
                  </div>

                  {diagnostico.temas_capacitacion_prioridad.length > 0 && (
                    <div className="d-flex align-items-center justify-content-between flex-wrap mt-2 pt-2 border-top">
                      <span className="small font-weight-bold" style={{ color: 'var(--color-primary)' }}>
                        Orden elegido:{' '}
                        {diagnostico.temas_capacitacion_prioridad
                          .map((t, i) => `${i + 1}°. ${t}`)
                          .join(' → ')}
                      </span>
                      <button
                        type="button"
                        className="btn btn-link btn-sm text-danger p-0"
                        onClick={() =>
                          setDiagnostico({ ...diagnostico, temas_capacitacion_prioridad: [] })
                        }
                      >
                        Reiniciar orden
                      </button>
                    </div>
                  )}

                  {diagnostico.temas_capacitacion_prioridad.includes('Otros') && (
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder="¿En qué otros temas te gustaría capacitarte? (Ej. Marketing digital, exportación, registro ante IMPI)"
                      value={diagnostico.temas_capacitacion_otro}
                      onChange={(e) =>
                        setDiagnostico({
                          ...diagnostico,
                          temas_capacitacion_otro: e.target.value,
                        })
                      }
                      required
                    />
                  )}
                </div>

                {/* PREGUNTA 4 */}
                <div className="mb-4 p-3 rounded" style={{ border: '1px solid var(--color-border)' }}>
                  <label className="font-weight-bold" style={{ color: 'var(--color-primary)' }}>
                    4.- ¿Le gustaría participar en un programa de la Secretaría de Desarrollo Económico de asesoría, mentoría y eventos en favor de su emprendimiento o negocio? *
                  </label>
                  <div className="d-flex mt-2" style={{ gap: '1rem' }}>
                    {['Sí', 'No'].map((resp) => (
                      <button
                        key={resp}
                        type="button"
                        onClick={() =>
                          setDiagnostico({
                            ...diagnostico,
                            participar_programa_sedeco: resp,
                          })
                        }
                        className="btn px-4 py-2 font-weight-bold"
                        style={{
                          borderRadius: '25px',
                          backgroundColor:
                            diagnostico.participar_programa_sedeco === resp
                              ? 'var(--color-primary)'
                              : 'transparent',
                          color:
                            diagnostico.participar_programa_sedeco === resp
                              ? '#ffffff'
                              : 'var(--color-text)',
                          border: '1.5px solid var(--color-primary)',
                        }}
                      >
                        {resp}
                      </button>
                    ))}
                  </div>

                  {/* Campos condicionales si responde Sí */}
                  {diagnostico.participar_programa_sedeco === 'Sí' && (
                    <div
                      className="mt-4 p-4 rounded"
                      style={{
                        backgroundColor: 'rgba(127, 40, 65, 0.05)',
                        borderLeft: '4px solid var(--color-primary)',
                      }}
                    >
                      <h6 className="font-weight-bold mb-3" style={{ color: 'var(--color-primary)' }}>
                        <i className="fa fa-address-card-o mr-2"></i>
                        Datos de Contacto para Seguimiento SEDECO
                      </h6>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="font-weight-bold small">
                            Nombre completo (Confirmación / Firma digital) *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Escribe tu nombre completo como confirmación"
                            value={diagnostico.nombre_firma}
                            onChange={(e) =>
                              setDiagnostico({ ...diagnostico, nombre_firma: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className="font-weight-bold small">Teléfono *</label>
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="Ej. 312 123 4567"
                            value={diagnostico.telefono}
                            onChange={(e) =>
                              setDiagnostico({ ...diagnostico, telefono: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label className="font-weight-bold small">WhatsApp</label>
                          <input
                            type="tel"
                            className="form-control"
                            placeholder="Ej. 312 123 4567"
                            value={diagnostico.whatsapp}
                            onChange={(e) =>
                              setDiagnostico({ ...diagnostico, whatsapp: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <label className="font-weight-bold small">Correo electrónico *</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="ejemplo@correo.com"
                            value={diagnostico.correo}
                            onChange={(e) =>
                              setDiagnostico({ ...diagnostico, correo: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="col-md-4 mb-3">
                          <label className="font-weight-bold small">Municipio *</label>
                          <select
                            className="form-control"
                            value={diagnostico.municipio}
                            onChange={(e) =>
                              setDiagnostico({ ...diagnostico, municipio: e.target.value })
                            }
                            required
                          >
                            {MUNICIPIOS_COLIMA.map((mun) => (
                              <option key={mun} value={mun}>
                                {mun}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-4 mb-3">
                          <label className="font-weight-bold small">
                            Domicilio (calle, número, colonia) *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Ej. Av. Constitución #120, Col. Centro"
                            value={diagnostico.domicilio}
                            onChange={(e) =>
                              setDiagnostico({ ...diagnostico, domicilio: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Aviso de Privacidad */}
              <div
                className="p-3 rounded mb-4 small"
                style={{
                  backgroundColor: 'rgba(188, 149, 92, 0.1)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <p className="mb-1">
                  <i className="fa fa-lock mr-2" style={{ color: 'var(--color-primary)' }}></i>
                  La información proporcionada en este cuestionario es de uso exclusivo del{' '}
                  <strong>Centro de Desarrollo Emprendedor de la Secretaría de Desarrollo Económico (SEDECO)</strong>.
                </p>
                <p className="mb-0">
                  El aviso de privacidad de la Secretaría de Desarrollo Económico está disponible en el siguiente link:{' '}
                  <a
                    href="https://bit.ly/3IR1vxH"
                    target="_blank"
                    rel="noreferrer"
                    className="font-weight-bold"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    https://bit.ly/3IR1vxH <i className="fa fa-external-link"></i>
                  </a>
                </p>
              </div>

              <button
                type="submit"
                disabled={guardando}
                className="btn btn-lg btn-block text-white font-weight-bold shadow"
                style={{ backgroundColor: 'var(--color-secondary)', borderRadius: '30px' }}
              >
                {guardando ? (
                  <span>
                    <i className="fa fa-spinner fa-spin mr-2"></i>Guardando diagnóstico...
                  </span>
                ) : (
                  <span>
                    <i className="fa fa-paper-plane mr-2"></i>Enviar Cédula de Diagnóstico
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* =====================================================================
          FORMULARIO 2: GUÍA BÁSICA MODELO DE NEGOCIOS CANVAS
         ===================================================================== */}
      {encuestaActiva === 'canvas' && !exitoFolio && (
        <form onSubmit={handleSubmitCanvas}>
          <div
            className="card shadow-lg border-0 mb-5"
            style={{ borderRadius: '16px', overflow: 'hidden' }}
          >
            <div
              className="p-4 text-white d-flex justify-content-between align-items-center flex-wrap"
              style={{
                backgroundColor: 'var(--color-primary)',
                borderBottom: '4px solid var(--color-secondary)',
              }}
            >
              <div>
                <h3 className="mb-1 font-weight-bold">
                  <i className="fa fa-th-large mr-2"></i>
                  Guía Básica Modelo de Negocios CANVAS
                </h3>
                <p className="mb-0 text-white-50 small">
                  Herramienta interactiva con cálculo automático de utilidades, costos e inversión
                </p>
              </div>
              <span
                className="badge px-3 py-2 mt-2 mt-md-0"
                style={{ backgroundColor: 'var(--color-secondary)', color: '#fff', fontSize: '0.85rem' }}
              >
                10 Pasos Clave
              </span>
            </div>

            <div className="card-body p-4 p-md-5">
              {/* DATOS DEL EMPRENDEDOR Y DESCRIPCIÓN GENERAL */}
              <div className="mb-5 p-4 rounded" style={{ backgroundColor: 'rgba(127, 40, 65, 0.04)', border: '1px solid var(--color-border)' }}>
                <div className="d-flex align-items-center justify-content-between flex-wrap mb-3">
                  <h5 className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                    <i className="fa fa-briefcase mr-2" style={{ color: 'var(--color-secondary)' }}></i>
                    Datos del Emprendedor y Descripción del Negocio
                  </h5>
                  <EjemploFlotante
                    titulo="Descripción general del negocio"
                    consejo="Resume en 2 o 3 renglones qué es tu negocio, dónde opera y qué vende."
                    ejemplos={[
                      {
                        categoria: 'Ejemplo 1 (Alimentos)',
                        texto:
                          '"Cafetería y barra de postres artesanales elaborados con café orgánico de Comala y frutas regionales, ubicada en el centro de Colima."',
                      },
                      {
                        categoria: 'Ejemplo 2 (Servicios)',
                        texto:
                          '"Servicio de mantenimiento preventivo y reparación de equipos de aire acondicionado y refrigeración comercial a domicilio en Manzanillo."',
                      },
                    ]}
                  />
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="font-weight-bold small">Tu Nombre Completo *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre del emprendedor(a)"
                      value={canvas.nombre_emprendedor}
                      onChange={(e) =>
                        setCanvas({ ...canvas, nombre_emprendedor: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="font-weight-bold small">Correo Electrónico *</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="correo@ejemplo.com"
                      value={canvas.correo_emprendedor}
                      onChange={(e) =>
                        setCanvas({ ...canvas, correo_emprendedor: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="font-weight-bold small">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="312 123 4567"
                      value={canvas.telefono_emprendedor}
                      onChange={(e) =>
                        setCanvas({ ...canvas, telefono_emprendedor: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-group mb-0">
                  <label className="font-weight-bold">Descripción del negocio: *</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="Describe de forma clara en qué consiste tu negocio..."
                    value={canvas.descripcion_negocio}
                    onChange={(e) =>
                      setCanvas({ ...canvas, descripcion_negocio: e.target.value })
                    }
                    required
                  ></textarea>
                </div>
              </div>

              {/* BLOQUES 1 AL 4 EN GRID 2x2 */}
              <div className="row mb-4">
                {/* 1. SEGMENTO DE CLIENTES */}
                <div className="col-lg-6 mb-4">
                  <div className="card h-100 shadow-sm custom-border-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                        <h5 className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                          1.- Segmento de clientes *
                        </h5>
                        <EjemploFlotante
                          titulo="1.- Segmento de Clientes"
                          consejo="Define a quién va dirigido tu producto o servicio (Sexo, Edad, Profesión, Ubicación, hábitos)."
                          ejemplos={[
                            {
                              categoria: 'Ejemplo Panadería / Repostería',
                              texto:
                                'Hombres y mujeres de 25 a 60 años que viven en Colima y Villa de Álvarez, familias y profesionistas que buscan pan recién horneado o pasteles para eventos y personas que cuidan su consumo de azúcar.',
                            },
                            {
                              categoria: 'Ejemplo Ropa / Calzado',
                              texto:
                                'Mujeres jóvenes de 18 a 35 años, estudiantes y trabajadoras en el estado de Colima que buscan ropa casual a precios accesibles con entrega a domicilio.',
                            },
                          ]}
                        />
                      </div>
                      <p className="small text-muted mb-2">
                        ¿Quiénes son tus clientes y cuáles son sus necesidades? ¿Para quién va dirigido tu producto/servicio (Sexo, Edad, Profesión, Ubicación)?
                      </p>
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Describe el perfil de tus clientes ideales..."
                        value={canvas.segmento_clientes}
                        onChange={(e) =>
                          setCanvas({ ...canvas, segmento_clientes: e.target.value })
                        }
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* 2. PROPUESTA DE VALOR */}
                <div className="col-lg-6 mb-4">
                  <div className="card h-100 shadow-sm custom-border-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                        <h5 className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                          2.- Propuesta de valor *
                        </h5>
                        <EjemploFlotante
                          titulo="2.- Propuesta de Valor"
                          consejo="Explica qué hace único a tu negocio y por qué te elegirán a ti en lugar de a la competencia."
                          ejemplos={[
                            {
                              categoria: 'Ejemplo Alimentos',
                              texto:
                                'Elaboramos tortillas y totopos 100% de maíz nativo nixtamalizado sin conservadores, empacados al alto vacío y con entrega a domicilio en menos de 40 minutos.',
                            },
                            {
                              categoria: 'Ejemplo Servicios Técnicos',
                              texto:
                                'Diagnóstico en el mismo día, garantía escrita de 6 meses en cada reparación y atención en horario extendido incluidos sábados.',
                            },
                          ]}
                        />
                      </div>
                      <p className="small text-muted mb-2">
                        ¿Qué hace única a tu oferta y por qué los clientes deberían elegirte? ¿Qué hace que tu producto sea diferente y mejor que la competencia?
                      </p>
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="Explica el diferenciador principal de tu producto o servicio..."
                        value={canvas.propuesta_valor}
                        onChange={(e) =>
                          setCanvas({ ...canvas, propuesta_valor: e.target.value })
                        }
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* 3. CANALES DE DISTRIBUCIÓN */}
                <div className="col-lg-6 mb-4">
                  <div className="card h-100 shadow-sm custom-border-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                        <h5 className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                          3.- Canales de distribución *
                        </h5>
                        <EjemploFlotante
                          titulo="3.- Canales de Distribución"
                          consejo="Indica si venderás en local físico, en línea o ambos, y cómo entregarás el producto."
                          ejemplos={[
                            {
                              categoria: 'Ejemplo Híbrido (Físico y en Línea)',
                              texto:
                                'Venta directa en nuestro local en Colima centro, pedidos por WhatsApp e Instagram con envío mediante repartidor propio y tienda oficial Hecho en Colima en Mercado Libre.',
                            },
                          ]}
                        />
                      </div>
                      <p className="small text-muted mb-2">
                        Evalúa cómo se venderá mejor tu oferta: ¿en punto de venta físico, en línea o ambos?
                      </p>
                      <div className="d-flex flex-wrap mb-2" style={{ gap: '0.4rem' }}>
                        {[
                          'Punto de venta físico',
                          'En línea / Redes Sociales',
                          'Ambos (Físico y en Línea)',
                        ].map((canal) => (
                          <button
                            key={canal}
                            type="button"
                            onClick={() => setCanvas({ ...canvas, canales_tipo: canal })}
                            className="btn btn-sm font-weight-bold"
                            style={{
                              borderRadius: '20px',
                              backgroundColor:
                                canvas.canales_tipo === canal
                                  ? 'var(--color-secondary)'
                                  : 'transparent',
                              color:
                                canvas.canales_tipo === canal ? '#fff' : 'var(--color-text)',
                              border: '1.5px solid var(--color-secondary)',
                            }}
                          >
                            {canal}
                          </button>
                        ))}
                      </div>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Describe cómo llegarás a tus clientes y cómo entregarás tu producto/servicio..."
                        value={canvas.canales_distribucion}
                        onChange={(e) =>
                          setCanvas({ ...canvas, canales_distribucion: e.target.value })
                        }
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* 4. RELACIÓN CON EL CLIENTE Y PUBLICIDAD */}
                <div className="col-lg-6 mb-4">
                  <div className="card h-100 shadow-sm custom-border-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                        <h5 className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                          4.- Relación con el cliente y Publicidad *
                        </h5>
                        <EjemploFlotante
                          titulo="4.- Relación con el Cliente y Publicidad"
                          consejo="Explica cómo atenderás al cliente para que regrese y cómo darás a conocer tu negocio."
                          ejemplos={[
                            {
                              categoria: 'Relación con el cliente',
                              texto:
                                'Atención personalizada en mostrador y vía WhatsApp Business, seguimiento post-venta y tarjeta de cliente frecuente (en la 6ta compra recibe descuento).',
                            },
                            {
                              categoria: 'Publicidad',
                              texto:
                                'Publicaciones y reels en Facebook, Instagram y TikTok, volantes en colonias cercanas y participación en bazares y ferias locales.',
                            },
                          ]}
                        />
                      </div>
                      <label className="small font-weight-bold">
                        ¿Qué tipo de relación establecerás con tu cliente (atención personalizada, telefónica, web, correo)?
                      </label>
                      <textarea
                        className="form-control mb-2"
                        rows="2"
                        placeholder="Ej. Atención personalizada, seguimiento por WhatsApp, promociones de lealtad..."
                        value={canvas.relacion_cliente}
                        onChange={(e) =>
                          setCanvas({ ...canvas, relacion_cliente: e.target.value })
                        }
                        required
                      ></textarea>
                      <label className="small font-weight-bold">
                        Publicidad: ¿Cómo promocionas el negocio?
                      </label>
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="Ej. Redes sociales (Facebook/Instagram), recomendaciones, lonas, ferias..."
                        value={canvas.publicidad}
                        onChange={(e) => setCanvas({ ...canvas, publicidad: e.target.value })}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. FLUJO DE INGRESO */}
              <div className="card shadow-sm custom-border-card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                    <h5 className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                      5.- Flujo de Ingreso (Cálculo automático de utilidad y ventas)
                    </h5>
                    <EjemploFlotante
                      titulo="5.- Flujo de Ingreso"
                      consejo="Escribe cuánto te cuesta producir o comprar tu producto y a qué precio lo vendes; el sistema calculará tu ganancia (utilidad) automáticamente."
                      ejemplos={[
                        {
                          categoria: 'Ejemplo de Producto y Utilidad',
                          texto:
                            'Producto: Pastel mediano | Costo de producción: $140 | Precio de venta: $280 | Utilidad automática: $140 por unidad.',
                        },
                        {
                          categoria: 'Ejemplo de Proyección Mensual',
                          texto:
                            'Precio de venta promedio: $280 | Unidades estimadas por mes: 60 pasteles | Total vendido por mes: $16,800.',
                        },
                      ]}
                    />
                  </div>
                  <p className="small text-muted mb-3">
                    Identifica tus principales productos o servicios. La columna <strong>Utilidad</strong> se calcula automáticamente restando el costo al precio de venta.
                  </p>

                  <div className="table-responsive mb-3">
                    <table className="table table-bordered">
                      <thead style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
                        <tr>
                          <th>Producto / Servicio</th>
                          <th>Costo de producción / Compra ($)</th>
                          <th>Precio de venta ($)</th>
                          <th>Utilidad por unidad ($)</th>
                          <th style={{ width: '60px' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {canvas.productos_ingresos.map((fila, idx) => {
                          const utilidad =
                            (parseFloat(fila.precio_venta) || 0) -
                            (parseFloat(fila.costo) || 0);
                          return (
                            <tr key={idx}>
                              <td>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Ej. Producto principal"
                                  value={fila.producto}
                                  onChange={(e) => {
                                    const copia = [...canvas.productos_ingresos];
                                    copia[idx].producto = e.target.value;
                                    setCanvas({ ...canvas, productos_ingresos: copia });
                                  }}
                                  required={idx === 0}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  className="form-control form-control-sm"
                                  placeholder="0.00"
                                  value={fila.costo}
                                  onChange={(e) => {
                                    const copia = [...canvas.productos_ingresos];
                                    copia[idx].costo = e.target.value;
                                    setCanvas({ ...canvas, productos_ingresos: copia });
                                  }}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  className="form-control form-control-sm"
                                  placeholder="0.00"
                                  value={fila.precio_venta}
                                  onChange={(e) => {
                                    const copia = [...canvas.productos_ingresos];
                                    copia[idx].precio_venta = e.target.value;
                                    setCanvas({ ...canvas, productos_ingresos: copia });
                                  }}
                                />
                              </td>
                              <td className="align-middle font-weight-bold text-center">
                                <span className={utilidad >= 0 ? 'text-success' : 'text-danger'}>
                                  ${utilidad.toFixed(2)}
                                </span>
                              </td>
                              <td className="text-center align-middle">
                                {canvas.productos_ingresos.length > 1 && (
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => {
                                      const copia = canvas.productos_ingresos.filter(
                                        (_, i) => i !== idx
                                      );
                                      setCanvas({ ...canvas, productos_ingresos: copia });
                                    }}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm font-weight-bold mb-4"
                    style={{
                      border: '1.5px solid var(--color-primary)',
                      color: 'var(--color-primary)',
                      borderRadius: '20px',
                    }}
                    onClick={() =>
                      setCanvas({
                        ...canvas,
                        productos_ingresos: [
                          ...canvas.productos_ingresos,
                          { producto: '', costo: '', precio_venta: '' },
                        ],
                      })
                    }
                  >
                    <i className="fa fa-plus mr-1"></i>Agregar otro producto o servicio
                  </button>

                  {/* Proyección Mensual */}
                  <h6 className="font-weight-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                    Estimación de Ventas por Mes:
                  </h6>
                  <div className="row align-items-end p-3 rounded" style={{ backgroundColor: 'rgba(188, 149, 92, 0.1)' }}>
                    <div className="col-md-4 mb-2 mb-md-0">
                      <label className="small font-weight-bold">Precio de venta promedio ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-control"
                        placeholder="Ej. 150.00"
                        value={canvas.proyeccion_mensual.precio_promedio}
                        onChange={(e) =>
                          setCanvas({
                            ...canvas,
                            proyeccion_mensual: {
                              ...canvas.proyeccion_mensual,
                              precio_promedio: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="col-md-4 mb-2 mb-md-0">
                      <label className="small font-weight-bold">
                        Unidades vendidas estimadas por mes
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="Ej. 100"
                        value={canvas.proyeccion_mensual.unidades_mes}
                        onChange={(e) =>
                          setCanvas({
                            ...canvas,
                            proyeccion_mensual: {
                              ...canvas.proyeccion_mensual,
                              unidades_mes: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <div
                        className="p-2 rounded text-center font-weight-bold"
                        style={{
                          backgroundColor: 'var(--color-primary)',
                          color: '#fff',
                        }}
                      >
                        <div className="small text-white-50">Total vendido por mes ($)</div>
                        <div style={{ fontSize: '1.2rem' }}>
                          ${totalVendidoMesCanvas.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. ACTIVIDADES CLAVES Y 7. RECURSOS CLAVES */}
              <div className="row mb-4">
                {/* 6. ACTIVIDADES CLAVES */}
                <div className="col-lg-6 mb-4">
                  <div className="card h-100 shadow-sm custom-border-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                        <h5 className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                          6.- Actividades claves *
                        </h5>
                        <EjemploFlotante
                          titulo="6.- Actividades Claves"
                          consejo="Enumera los pasos desde que compras los insumos hasta que entregas el producto al cliente."
                          ejemplos={[
                            {
                              categoria: 'Ejemplo Paso a Paso',
                              texto:
                                '1.- Compra y selección de insumos frescos con proveedores locales. 2.- Preparación, horneado y control de calidad. 3.- Empaquetado y etiquetado. 4.- Promoción en redes sociales, toma de pedidos y entrega al cliente.',
                            },
                          ]}
                        />
                      </div>
                      <p className="small text-muted mb-3">
                        Describe de manera general el proceso que realizarás desde la compra de insumos, producción, ventas y relación con los clientes:
                      </p>

                      {canvas.actividades_claves.map((act, idx) => (
                        <div className="input-group mb-2" key={idx}>
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text font-weight-bold"
                              style={{ color: 'var(--color-primary)' }}
                            >
                              {idx + 1}.-
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`Actividad clave #${idx + 1}`}
                            value={act}
                            onChange={(e) => {
                              const copia = [...canvas.actividades_claves];
                              copia[idx] = e.target.value;
                              setCanvas({ ...canvas, actividades_claves: copia });
                            }}
                            required={idx === 0}
                          />
                        </div>
                      ))}

                      <button
                        type="button"
                        className="btn btn-sm font-weight-bold mt-2"
                        style={{
                          border: '1.5px solid var(--color-secondary)',
                          color: 'var(--color-primary)',
                          borderRadius: '20px',
                        }}
                        onClick={() =>
                          setCanvas({
                            ...canvas,
                            actividades_claves: [...canvas.actividades_claves, ''],
                          })
                        }
                      >
                        <i className="fa fa-plus mr-1"></i>Agregar otra actividad
                      </button>
                    </div>
                  </div>
                </div>

                {/* 7. RECURSOS CLAVES */}
                <div className="col-lg-6 mb-4">
                  <div className="card h-100 shadow-sm custom-border-card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                        <h5 className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                          7.- Recursos claves *
                        </h5>
                        <EjemploFlotante
                          titulo="7.- Recursos Claves"
                          consejo="Detalla qué elementos necesitas en cada rubro para que tu negocio funcione."
                          ejemplos={[
                            {
                              categoria: '1.- Recurso humano',
                              texto: '1 repostero(a) encargado de producción y 1 ayudante de atención y entregas.',
                            },
                            {
                              categoria: '2.- Mobiliario y 3.- Equipo',
                              texto: 'Mobiliario: 2 mesas de trabajo de acero inoxidable y 1 vitrina exhibidora. Equipo: 1 horno industrial, 1 batidora de 20L y 1 refrigerador.',
                            },
                            {
                              categoria: '4.- Insumos',
                              texto: 'Harina, huevo, mantequilla, vainilla, cajas biodegradables y etiquetas.',
                            },
                          ]}
                        />
                      </div>
                      <p className="small text-muted mb-2">
                        ¿Qué recursos necesitas para llevar a cabo la actividad de tu negocio?
                      </p>

                      {[
                        { key: 'recurso_humano', label: '1.- Recurso humano', ph: 'Ej. 1 cocinero, 1 vendedor...' },
                        { key: 'mobiliario', label: '2.- Mobiliario', ph: 'Ej. Mesas de trabajo, mostrador, estantes...' },
                        { key: 'equipo', label: '3.- Equipo y maquinaria', ph: 'Ej. Horno, computadora, refrigerador...' },
                        { key: 'insumos', label: '4.- Insumos', ph: 'Ej. Materia prima, envases, etiquetas...' },
                        { key: 'otros', label: '5.- Otros (intelectuales, experiencia, etc.)', ph: 'Ej. Receta propia, marca registrada...' },
                      ].map((item) => (
                        <div className="form-group mb-2" key={item.key}>
                          <label className="small font-weight-bold mb-1">{item.label}</label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder={item.ph}
                            value={canvas.recursos_claves[item.key]}
                            onChange={(e) =>
                              setCanvas({
                                ...canvas,
                                recursos_claves: {
                                  ...canvas.recursos_claves,
                                  [item.key]: e.target.value,
                                },
                              })
                            }
                            required={item.key !== 'otros'}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. RED DE ALIANZAS */}
              <div className="card shadow-sm custom-border-card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                    <h5 className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                      8.- Red de alianzas *
                    </h5>
                    <EjemploFlotante
                      titulo="8.- Red de Alianzas (Proveedores y Aliados)"
                      consejo="Identifica quiénes te surtirán insumos de calidad y qué negocios pueden ayudarte a vender más."
                      ejemplos={[
                        {
                          categoria: 'Proveedores',
                          texto:
                            'Productores locales de limón y coco en Tecomán y Armería, distribuidora de envases de vidrio en Guadalajara.',
                        },
                        {
                          categoria: 'Aliados estratégicos',
                          texto:
                            'Restaurantes y cafeterías de Comala y Colima para vender nuestro producto en sus mesas, organizadores de eventos y SEDECO (Hecho en Colima).',
                        },
                      ]}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label className="font-weight-bold small">
                        Proveedores: ¿A quiénes les comprarás la materia prima que requieres para elaborar tu producto? *
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Menciona tus principales proveedores de insumos o mercancía..."
                        value={canvas.red_alianzas.proveedores}
                        onChange={(e) =>
                          setCanvas({
                            ...canvas,
                            red_alianzas: { ...canvas.red_alianzas, proveedores: e.target.value },
                          })
                        }
                        required
                      ></textarea>
                    </div>
                    <div className="col-md-6">
                      <label className="font-weight-bold small">
                        Aliados: ¿Con quién podrás crear alianzas para que te ayuden a vender? *
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Menciona comercios, instituciones, cámaras o distribuidores aliados..."
                        value={canvas.red_alianzas.aliados}
                        onChange={(e) =>
                          setCanvas({
                            ...canvas,
                            red_alianzas: { ...canvas.red_alianzas, aliados: e.target.value },
                          })
                        }
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* 9. ESTRUCTURA DE COSTOS */}
              <div className="card shadow-sm custom-border-card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                    <h5 className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                      9.- Estructura de Costos (Estimados por mes)
                    </h5>
                    <EjemploFlotante
                      titulo="9.- Costos Fijos vs. Costos Variables"
                      consejo="Los costos fijos se pagan mes con mes vendas o no; los costos variables dependen de cuánto produzcas."
                      ejemplos={[
                        {
                          categoria: 'Costos Fijos (Ejemplo)',
                          texto:
                            'Renta de local: $3,500 | Luz: $600 | Agua: $180 | Teléfono-Internet: $450 | Salarios: $6,000.',
                        },
                        {
                          categoria: 'Costos Variables (Ejemplo)',
                          texto:
                            'Materia prima (insumos del mes): $4,500 | Empaques, bolsas y etiquetas: $800.',
                        },
                      ]}
                    />
                  </div>
                  <p className="small text-muted mb-3">
                    ¿En qué se gasta para vender su producto/servicio? Ingresa tus estimados mensuales y el total se calculará automáticamente.
                  </p>

                  <div className="row">
                    {/* Costos Fijos */}
                    <div className="col-lg-6 mb-4 mb-lg-0">
                      <h6
                        className="font-weight-bold p-2 text-white rounded-top mb-0"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      >
                        Costos Fijos (Mensuales)
                      </h6>
                      <div className="p-3 border rounded-bottom">
                        {[
                          { key: 'renta_local', label: 'Renta de local ($)' },
                          { key: 'luz', label: 'Luz ($)' },
                          { key: 'agua', label: 'Agua ($)' },
                          { key: 'telefono_internet', label: 'Teléfono - Internet ($)' },
                          {
                            key: 'salarios',
                            label: 'Salarios de acuerdo al número de empleados ($)',
                          },
                        ].map((cf) => (
                          <div className="form-group row mb-2 align-items-center" key={cf.key}>
                            <label className="col-7 small font-weight-bold mb-0">{cf.label}</label>
                            <div className="col-5">
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                className="form-control form-control-sm"
                                placeholder="0.00"
                                value={canvas.costos_fijos[cf.key]}
                                onChange={(e) =>
                                  setCanvas({
                                    ...canvas,
                                    costos_fijos: {
                                      ...canvas.costos_fijos,
                                      [cf.key]: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                        ))}

                        <div className="form-group row mb-2 align-items-center">
                          <div className="col-7">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Otro costo fijo (Especificar)"
                              value={canvas.costos_fijos.otro_concepto}
                              onChange={(e) =>
                                setCanvas({
                                  ...canvas,
                                  costos_fijos: {
                                    ...canvas.costos_fijos,
                                    otro_concepto: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="col-5">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              className="form-control form-control-sm"
                              placeholder="0.00"
                              value={canvas.costos_fijos.otro_monto}
                              onChange={(e) =>
                                setCanvas({
                                  ...canvas,
                                  costos_fijos: {
                                    ...canvas.costos_fijos,
                                    otro_monto: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                        </div>

                        <div
                          className="d-flex justify-content-between align-items-center p-2 mt-3 rounded font-weight-bold"
                          style={{ backgroundColor: 'rgba(127, 40, 65, 0.1)', color: 'var(--color-primary)' }}
                        >
                          <span>TOTAL COSTOS FIJOS:</span>
                          <span>${totalCostosFijos.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                    </div>

                    {/* Costos Variables */}
                    <div className="col-lg-6">
                      <h6
                        className="font-weight-bold p-2 text-white rounded-top mb-0"
                        style={{ backgroundColor: 'var(--color-secondary)' }}
                      >
                        Costos Variables (Mensuales)
                      </h6>
                      <div className="p-3 border rounded-bottom d-flex flex-column justify-content-between">
                        <div>
                          {canvas.costos_variables.map((cv, idx) => (
                            <div className="form-group row mb-2 align-items-center" key={idx}>
                              <div className="col-7">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Concepto variable"
                                  value={cv.concepto}
                                  onChange={(e) => {
                                    const copia = [...canvas.costos_variables];
                                    copia[idx].concepto = e.target.value;
                                    setCanvas({ ...canvas, costos_variables: copia });
                                  }}
                                />
                              </div>
                              <div className="col-5">
                                <input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  className="form-control form-control-sm"
                                  placeholder="0.00"
                                  value={cv.monto}
                                  onChange={(e) => {
                                    const copia = [...canvas.costos_variables];
                                    copia[idx].monto = e.target.value;
                                    setCanvas({ ...canvas, costos_variables: copia });
                                  }}
                                />
                              </div>
                            </div>
                          ))}

                          <button
                            type="button"
                            className="btn btn-sm font-weight-bold mt-1 mb-3"
                            style={{
                              border: '1px solid var(--color-secondary)',
                              color: 'var(--color-primary)',
                              borderRadius: '20px',
                            }}
                            onClick={() =>
                              setCanvas({
                                ...canvas,
                                costos_variables: [
                                  ...canvas.costos_variables,
                                  { concepto: '', monto: '' },
                                ],
                              })
                            }
                          >
                            <i className="fa fa-plus mr-1"></i>Añadir otro costo variable
                          </button>
                        </div>

                        <div
                          className="d-flex justify-content-between align-items-center p-2 mt-3 rounded font-weight-bold"
                          style={{ backgroundColor: 'rgba(188, 149, 92, 0.2)', color: 'var(--color-primary)' }}
                        >
                          <span>TOTAL COSTOS VARIABLES:</span>
                          <span>${totalCostosVariables.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 10. VALOR TOTAL DEL PROYECTO E INVERSIÓN REQUERIDA */}
              <div className="card shadow-sm custom-border-card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                    <h5 className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                      10.- Valor Total del Proyecto e Inversión Requerida
                    </h5>
                    <EjemploFlotante
                      titulo="10.- Valor Total del Proyecto"
                      consejo="Enlista qué equipo, herramienta, mobiliario o insumos necesitas comprar para arrancar y quién te lo cotizó."
                      ejemplos={[
                        {
                          categoria: 'Ejemplo de Requisitos y Cotización',
                          texto:
                            '1. Horno de convección ($14,500 - Proveedor Equipos Gastronómicos Colima). 2. Mesa de trabajo inoxidable ($3,200 - Mercado Libre). 3. Insumos iniciales ($2,300 - Central de Abastos). Total = $20,000.',
                        },
                        {
                          categoria: 'Ejemplo de Inversión Requerida',
                          texto:
                            'Aportación propia: $8,000 | Recurso externo requerido: $12,000 | Recurso total para iniciar: $20,000.',
                        },
                      ]}
                    />
                  </div>
                  <p className="small text-muted mb-3">
                    ¿Qué necesita comprar para iniciar su negocio (equipo, herramienta, mobiliario, insumos, etc.) y cuál es el costo de cada uno?
                  </p>

                  <div className="table-responsive mb-3">
                    <table className="table table-bordered">
                      <thead style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
                        <tr>
                          <th>Requisitos (Mobiliario, Equipo, Insumos, etc.)</th>
                          <th>Precio ($)</th>
                          <th>Fuente de Cotización (Proveedor / Tienda)</th>
                          <th style={{ width: '60px' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {canvas.requisitos_inversion.map((req, idx) => (
                          <tr key={idx}>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Ej. Mobiliario / Equipo / Insumos"
                                value={req.requisito}
                                onChange={(e) => {
                                  const copia = [...canvas.requisitos_inversion];
                                  copia[idx].requisito = e.target.value;
                                  setCanvas({ ...canvas, requisitos_inversion: copia });
                                }}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                className="form-control form-control-sm"
                                placeholder="0.00"
                                value={req.precio}
                                onChange={(e) => {
                                  const copia = [...canvas.requisitos_inversion];
                                  copia[idx].precio = e.target.value;
                                  setCanvas({ ...canvas, requisitos_inversion: copia });
                                }}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Ej. Cotización Tienda Local / Proveedor"
                                value={req.fuente}
                                onChange={(e) => {
                                  const copia = [...canvas.requisitos_inversion];
                                  copia[idx].fuente = e.target.value;
                                  setCanvas({ ...canvas, requisitos_inversion: copia });
                                }}
                              />
                            </td>
                            <td className="text-center align-middle">
                              {canvas.requisitos_inversion.length > 1 && (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => {
                                    const copia = canvas.requisitos_inversion.filter(
                                      (_, i) => i !== idx
                                    );
                                    setCanvas({ ...canvas, requisitos_inversion: copia });
                                  }}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr style={{ backgroundColor: 'rgba(127, 40, 65, 0.08)' }}>
                          <td className="font-weight-bold text-right" style={{ color: 'var(--color-primary)' }}>
                            COSTO TOTAL DE REQUISITOS:
                          </td>
                          <td className="font-weight-bold" style={{ color: 'var(--color-primary)', fontSize: '1.05rem' }}>
                            ${totalRequisitosProyecto.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                          </td>
                          <td colSpan="2"></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm font-weight-bold mb-4"
                    style={{
                      border: '1.5px solid var(--color-primary)',
                      color: 'var(--color-primary)',
                      borderRadius: '20px',
                    }}
                    onClick={() =>
                      setCanvas({
                        ...canvas,
                        requisitos_inversion: [
                          ...canvas.requisitos_inversion,
                          { requisito: '', precio: '', fuente: '' },
                        ],
                      })
                    }
                  >
                    <i className="fa fa-plus mr-1"></i>Agregar otro requisito de inversión
                  </button>

                  {/* Tabla de Inversión Requerida */}
                  <h6 className="font-weight-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                    Inversión Requerida:
                  </h6>
                  <div className="row align-items-end p-3 rounded" style={{ backgroundColor: 'rgba(188, 149, 92, 0.12)' }}>
                    <div className="col-md-4 mb-2 mb-md-0">
                      <label className="small font-weight-bold">Aportación propia ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-control"
                        placeholder="0.00"
                        value={canvas.inversion_requerida.aportacion_propia}
                        onChange={(e) =>
                          setCanvas({
                            ...canvas,
                            inversion_requerida: {
                              ...canvas.inversion_requerida,
                              aportacion_propia: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="col-md-4 mb-2 mb-md-0">
                      <label className="small font-weight-bold">Recurso externo requerido ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-control"
                        placeholder="0.00"
                        value={canvas.inversion_requerida.recurso_externo}
                        onChange={(e) =>
                          setCanvas({
                            ...canvas,
                            inversion_requerida: {
                              ...canvas.inversion_requerida,
                              recurso_externo: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="col-md-4">
                      <div
                        className="p-2 rounded text-center font-weight-bold"
                        style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}
                      >
                        <div className="small text-white-50">
                          Recurso total para iniciar el proyecto ($)
                        </div>
                        <div style={{ fontSize: '1.2rem' }}>
                          ${totalRecursoIniciar.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={guardando}
                className="btn btn-lg btn-block text-white font-weight-bold shadow mt-4"
                style={{ backgroundColor: 'var(--color-secondary)', borderRadius: '30px' }}
              >
                {guardando ? (
                  <span>
                    <i className="fa fa-spinner fa-spin mr-2"></i>Guardando Modelo CANVAS...
                  </span>
                ) : (
                  <span>
                    <i className="fa fa-check-circle mr-2"></i>Guardar y Enviar Modelo de Negocios CANVAS
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </main>
  );
};

export default Encuestas;

