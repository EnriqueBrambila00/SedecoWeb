import React, { useState } from 'react';
import {
  actualizarComentarioSedeco,
  eliminarRespuestaEncuesta,
} from '../services/encuestasService';

const PanelEncuestasAdmin = ({ respuestas, onRefresh }) => {
  const [filtroTipo, setFiltroTipo] = useState('todas'); // 'todas' | 'diagnostico' | 'canvas'
  const [busqueda, setBusqueda] = useState('');
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [comentarioStaff, setComentarioStaff] = useState('');
  const [atendioStaff, setAtendioStaff] = useState('');
  const [guardandoStaff, setGuardandoStaff] = useState(false);

  const respuestasFiltradas = respuestas.filter((r) => {
    const coincideTipo =
      filtroTipo === 'todas' || r.tipo_encuesta === filtroTipo;
    const textoBusqueda = busqueda.toLowerCase().trim();
    const coincideTexto =
      !textoBusqueda ||
      (r.nombre_solicitante || '').toLowerCase().includes(textoBusqueda) ||
      (r.folio || '').toLowerCase().includes(textoBusqueda) ||
      (r.municipio || '').toLowerCase().includes(textoBusqueda) ||
      (r.correo_solicitante || '').toLowerCase().includes(textoBusqueda);
    return coincideTipo && coincideTexto;
  });

  const totalDiagnostico = respuestas.filter(
    (r) => r.tipo_encuesta === 'diagnostico'
  ).length;
  const totalCanvas = respuestas.filter(
    (r) => r.tipo_encuesta === 'canvas'
  ).length;

  const abrirDetalle = (resp) => {
    setRespuestaSeleccionada(resp);
    setComentarioStaff(
      resp.comentarios_sedeco || resp.datos?.comentarios_sedeco || ''
    );
    setAtendioStaff(resp.datos?.atendio || '');
  };

  const guardarRevisionSedeco = async (e) => {
    e.preventDefault();
    if (!respuestaSeleccionada) return;
    setGuardandoStaff(true);
    try {
      await actualizarComentarioSedeco(respuestaSeleccionada.id_respuesta, {
        comentarios_sedeco: comentarioStaff,
        atendio: atendioStaff,
      });
      await onRefresh();
      setRespuestaSeleccionada((prev) => ({
        ...prev,
        comentarios_sedeco: comentarioStaff,
        datos: {
          ...prev.datos,
          comentarios_sedeco: comentarioStaff,
          atendio: atendioStaff,
        },
      }));
      alert('Observaciones de personal SEDECO guardadas correctamente.');
    } finally {
      setGuardandoStaff(false);
    }
  };

  const handleEliminar = async (id_respuesta) => {
    if (!window.confirm('¿Estás seguro de eliminar este registro de encuesta?'))
      return;
    await eliminarRespuestaEncuesta(id_respuesta);
    if (
      respuestaSeleccionada &&
      respuestaSeleccionada.id_respuesta === id_respuesta
    ) {
      setRespuestaSeleccionada(null);
    }
    await onRefresh();
  };

  const exportarCSV = () => {
    if (respuestasFiltradas.length === 0) {
      alert('No hay registros para exportar.');
      return;
    }

    const encabezados = [
      'Folio',
      'Tipo de Encuesta',
      'Fecha',
      'Nombre Solicitante',
      'Correo',
      'Telefono',
      'Municipio',
      'Atendio SEDECO',
      'Comentarios SEDECO',
      'Resumen / Descripcion',
    ];

    const filas = respuestasFiltradas.map((r) => {
      const d = r.datos || {};
      const resumen =
        r.tipo_encuesta === 'diagnostico'
          ? d.descripcion_emprendimiento || ''
          : d.descripcion_negocio || '';
      return [
        r.folio || '',
        r.titulo_encuesta || r.tipo_encuesta,
        new Date(r.fecha_registro).toLocaleDateString('es-MX'),
        r.nombre_solicitante || '',
        r.correo_solicitante || '',
        r.telefono_solicitante || '',
        r.municipio || '',
        d.atendio || '',
        r.comentarios_sedeco || d.comentarios_sedeco || '',
        resumen.replace(/\r?\n/g, ' '),
      ]
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(',');
    });

    const contenido = '\uFEFF' + [encabezados.join(','), ...filas].join('\n');
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `encuestas_sedeco_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Tarjetas resumen */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div
            className="card shadow-sm border-0 h-100"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              borderLeft: '4px solid var(--color-primary)',
            }}
          >
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted mb-1">Total Respuestas</h6>
                <h3 className="font-weight-bold mb-0">{respuestas.length}</h3>
              </div>
              <i
                className="fa fa-folder-open fa-2x"
                style={{ color: 'var(--color-primary)' }}
              ></i>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div
            className="card shadow-sm border-0 h-100"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              borderLeft: '4px solid var(--color-secondary)',
            }}
          >
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted mb-1">Diagnóstico Emprendedor</h6>
                <h3 className="font-weight-bold mb-0">{totalDiagnostico}</h3>
              </div>
              <i
                className="fa fa-clipboard fa-2x"
                style={{ color: 'var(--color-secondary)' }}
              ></i>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div
            className="card shadow-sm border-0 h-100"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              borderLeft: '4px solid #28a745',
            }}
          >
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted mb-1">Modelos CANVAS</h6>
                <h3 className="font-weight-bold mb-0">{totalCanvas}</h3>
              </div>
              <i className="fa fa-th-large fa-2x text-success"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de filtros y exportación */}
      <div
        className="card shadow-sm border-0 mb-4"
        style={{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
        }}
      >
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-3 mb-lg-0">
              <div className="btn-group w-100" role="group">
                {[
                  { id: 'todas', label: `Todas (${respuestas.length})` },
                  {
                    id: 'diagnostico',
                    label: `Diagnóstico (${totalDiagnostico})`,
                  },
                  { id: 'canvas', label: `CANVAS (${totalCanvas})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFiltroTipo(tab.id)}
                    className="btn btn-sm font-weight-bold"
                    style={{
                      backgroundColor:
                        filtroTipo === tab.id
                          ? 'var(--color-primary)'
                          : 'transparent',
                      color:
                        filtroTipo === tab.id ? '#fff' : 'var(--color-text)',
                      border: '1px solid var(--color-primary)',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-lg-4 mb-3 mb-lg-0">
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre, folio o municipio..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-3 text-lg-right">
              <button
                type="button"
                onClick={exportarCSV}
                className="btn btn-sm text-white font-weight-bold px-3 w-100"
                style={{
                  backgroundColor: 'var(--color-secondary)',
                  borderRadius: '20px',
                }}
              >
                <i className="fa fa-download mr-1"></i> Exportar Excel (CSV)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de respuestas registradas */}
      <div
        className="card shadow-sm border-0"
        style={{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
        }}
      >
        <div className="card-body">
          {respuestasFiltradas.length === 0 ? (
            <div className="text-center py-5">
              <i
                className="fa fa-inbox fa-3x mb-3"
                style={{ color: 'var(--color-secondary)' }}
              ></i>
              <h5>No hay respuestas de encuestas registradas aún</h5>
              <p className="text-muted small">
                Cuando un usuario complete la Cédula de Diagnóstico o el Modelo CANVAS en la sección de Encuestas, aparecerá aquí automáticamente.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                  }}
                >
                  <tr>
                    <th>Folio</th>
                    <th>Encuesta</th>
                    <th>Solicitante</th>
                    <th>Contacto / Municipio</th>
                    <th>Fecha</th>
                    <th>Revisión SEDECO</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody style={{ color: 'var(--color-text)' }}>
                  {respuestasFiltradas.map((r) => {
                    const tieneComentario = Boolean(
                      (
                        r.comentarios_sedeco ||
                        r.datos?.comentarios_sedeco ||
                        ''
                      ).trim()
                    );
                    return (
                      <tr key={r.id_respuesta}>
                        <td className="font-weight-bold">{r.folio}</td>
                        <td>
                          <span
                            className="badge px-2 py-1 text-white"
                            style={{
                              backgroundColor:
                                r.tipo_encuesta === 'diagnostico'
                                  ? 'var(--color-primary)'
                                  : 'var(--color-secondary)',
                            }}
                          >
                            {r.tipo_encuesta === 'diagnostico'
                              ? 'Diagnóstico CDE'
                              : 'Modelo CANVAS'}
                          </span>
                        </td>
                        <td>{r.nombre_solicitante}</td>
                        <td className="small">
                          <div>{r.correo_solicitante || 'Sin correo'}</div>
                          <div className="text-muted">
                            {r.telefono_solicitante
                              ? `${r.telefono_solicitante} · `
                              : ''}
                            {r.municipio || ''}
                          </div>
                        </td>
                        <td className="small">
                          {new Date(r.fecha_registro).toLocaleDateString(
                            'es-MX',
                            {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            }
                          )}
                        </td>
                        <td>
                          {tieneComentario ? (
                            <span className="badge badge-success">
                              <i className="fa fa-check mr-1"></i>Atendido
                            </span>
                          ) : (
                            <span className="badge badge-warning">
                              Pendiente
                            </span>
                          )}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-info mr-2"
                            onClick={() => abrirDetalle(r)}
                            title="Ver respuestas completas y agregar comentarios SEDECO"
                          >
                            <i className="fa fa-eye mr-1"></i>Ver
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            onClick={() => handleEliminar(r.id_respuesta)}
                            title="Eliminar respuesta"
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Visor Completo de Encuesta + Comentarios exclusivos SEDECO */}
      {respuestaSeleccionada && (
        <div
          className="modal d-block"
          style={{
            backgroundColor: 'rgba(0,0,0,0.65)',
            zIndex: 1060,
            overflowY: 'auto',
          }}
        >
          <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div
              className="modal-content"
              style={{
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                borderRadius: '14px',
              }}
            >
              <div
                className="modal-header text-white"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <div>
                  <span
                    className="badge mb-1"
                    style={{
                      backgroundColor: 'var(--color-secondary)',
                      color: '#fff',
                    }}
                  >
                    Folio: {respuestaSeleccionada.folio}
                  </span>
                  <h5 className="modal-title font-weight-bold mb-0">
                    {respuestaSeleccionada.titulo_encuesta}
                  </h5>
                </div>
                <button
                  type="button"
                  className="close text-white"
                  onClick={() => setRespuestaSeleccionada(null)}
                >
                  &times;
                </button>
              </div>

              <div className="modal-body p-4">
                {/* DETALLE SI ES ENCUESTA 1: DIAGNÓSTICO */}
                {respuestaSeleccionada.tipo_encuesta === 'diagnostico' && (
                  <div>
                    <div className="row mb-3">
                      <div className="col-md-4 mb-2">
                        <strong>Fecha:</strong>{' '}
                        {respuestaSeleccionada.datos?.fecha}
                      </div>
                      <div className="col-md-4 mb-2">
                        <strong>Lugar de atención:</strong>{' '}
                        {respuestaSeleccionada.datos?.lugar_atencion}
                      </div>
                      <div className="col-md-4 mb-2">
                        <strong>Solicitante:</strong>{' '}
                        {respuestaSeleccionada.datos?.nombre} (
                        {respuestaSeleccionada.datos?.edad} años,{' '}
                        {respuestaSeleccionada.datos?.genero})
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6 mb-2">
                        <strong>Nivel educativo:</strong>{' '}
                        {respuestaSeleccionada.datos?.nivel_educativo}{' '}
                        {respuestaSeleccionada.datos?.nivel_educativo_otro
                          ? `(${respuestaSeleccionada.datos.nivel_educativo_otro})`
                          : ''}
                      </div>
                      <div className="col-md-6 mb-2">
                        <strong>Ocupación actual:</strong>{' '}
                        {respuestaSeleccionada.datos?.ocupacion_actual}{' '}
                        {respuestaSeleccionada.datos?.ocupacion_otro
                          ? `(${respuestaSeleccionada.datos.ocupacion_otro})`
                          : ''}
                      </div>
                    </div>

                    <div
                      className="p-3 rounded mb-3"
                      style={{
                        backgroundColor: 'rgba(127, 40, 65, 0.06)',
                        borderLeft: '4px solid var(--color-primary)',
                      }}
                    >
                      <p className="mb-1">
                        <strong>Situación actual de emprendimiento:</strong>{' '}
                        {respuestaSeleccionada.datos?.situacion_emprendimiento}{' '}
                        {respuestaSeleccionada.datos?.estado_sat
                          ? `[${respuestaSeleccionada.datos.estado_sat}]`
                          : ''}
                      </p>
                      <p className="mb-0">
                        <strong>¿En qué consiste el emprendimiento?:</strong>{' '}
                        {respuestaSeleccionada.datos?.descripcion_emprendimiento}
                      </p>
                    </div>

                    <div className="mb-3">
                      <p className="mb-1">
                        <strong>
                          1.- Necesidades en orden de prioridad:
                        </strong>{' '}
                        {(
                          respuestaSeleccionada.datos?.necesidades_prioridad ||
                          []
                        )
                          .map((n, i) => `${i + 1}°. ${n}`)
                          .join(' | ')}
                        {respuestaSeleccionada.datos?.necesidades_otro
                          ? ` (Otro: ${respuestaSeleccionada.datos.necesidades_otro})`
                          : ''}
                      </p>
                      <p className="mb-1">
                        <strong>
                          2.- ¿Ha realizado un proyecto o plan de negocios?:
                        </strong>{' '}
                        {respuestaSeleccionada.datos?.tiene_proyecto_negocios}
                      </p>
                      <p className="mb-1">
                        <strong>
                          3.- Temas de capacitación en orden de prioridad:
                        </strong>{' '}
                        {(
                          respuestaSeleccionada.datos
                            ?.temas_capacitacion_prioridad || []
                        )
                          .map((t, i) => `${i + 1}°. ${t}`)
                          .join(' | ')}
                        {respuestaSeleccionada.datos?.temas_capacitacion_otro
                          ? ` (Otro: ${respuestaSeleccionada.datos.temas_capacitacion_otro})`
                          : ''}
                      </p>
                      <p className="mb-1">
                        <strong>
                          4.- ¿Desea participar en programa SEDECO?:
                        </strong>{' '}
                        {
                          respuestaSeleccionada.datos
                            ?.participar_programa_sedeco
                        }
                      </p>
                    </div>

                    {respuestaSeleccionada.datos?.participar_programa_sedeco ===
                      'Sí' && (
                      <div
                        className="p-3 rounded mb-4"
                        style={{
                          backgroundColor: 'rgba(188, 149, 92, 0.14)',
                        }}
                      >
                        <h6
                          className="font-weight-bold"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          Datos de Contacto para Programa SEDECO
                        </h6>
                        <div className="row small">
                          <div className="col-md-4 mb-1">
                            <strong>Firma / Nombre:</strong>{' '}
                            {respuestaSeleccionada.datos?.nombre_firma}
                          </div>
                          <div className="col-md-4 mb-1">
                            <strong>Teléfono:</strong>{' '}
                            {respuestaSeleccionada.datos?.telefono}
                          </div>
                          <div className="col-md-4 mb-1">
                            <strong>WhatsApp:</strong>{' '}
                            {respuestaSeleccionada.datos?.whatsapp || 'N/A'}
                          </div>
                          <div className="col-md-4 mb-1">
                            <strong>Correo:</strong>{' '}
                            {respuestaSeleccionada.datos?.correo}
                          </div>
                          <div className="col-md-4 mb-1">
                            <strong>Municipio:</strong>{' '}
                            {respuestaSeleccionada.datos?.municipio}
                          </div>
                          <div className="col-md-4 mb-1">
                            <strong>Domicilio:</strong>{' '}
                            {respuestaSeleccionada.datos?.domicilio}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* DETALLE SI ES ENCUESTA 2: MODELO CANVAS */}
                {respuestaSeleccionada.tipo_encuesta === 'canvas' && (
                  <div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <strong>Emprendedor(a):</strong>{' '}
                        {respuestaSeleccionada.datos?.nombre_emprendedor}
                      </div>
                      <div className="col-md-4">
                        <strong>Correo:</strong>{' '}
                        {respuestaSeleccionada.datos?.correo_emprendedor}
                      </div>
                      <div className="col-md-4">
                        <strong>Teléfono:</strong>{' '}
                        {respuestaSeleccionada.datos?.telefono_emprendedor}
                      </div>
                    </div>

                    <div
                      className="p-3 rounded mb-3"
                      style={{
                        backgroundColor: 'rgba(127, 40, 65, 0.06)',
                        borderLeft: '4px solid var(--color-primary)',
                      }}
                    >
                      <strong>Descripción del negocio:</strong>{' '}
                      {respuestaSeleccionada.datos?.descripcion_negocio}
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6 mb-2">
                        <strong>1.- Segmento de clientes:</strong>
                        <p className="small mb-0">
                          {respuestaSeleccionada.datos?.segmento_clientes}
                        </p>
                      </div>
                      <div className="col-md-6 mb-2">
                        <strong>2.- Propuesta de valor:</strong>
                        <p className="small mb-0">
                          {respuestaSeleccionada.datos?.propuesta_valor}
                        </p>
                      </div>
                      <div className="col-md-6 mb-2">
                        <strong>
                          3.- Canales ({respuestaSeleccionada.datos?.canales_tipo}):
                        </strong>
                        <p className="small mb-0">
                          {respuestaSeleccionada.datos?.canales_distribucion}
                        </p>
                      </div>
                      <div className="col-md-6 mb-2">
                        <strong>4.- Relación con el cliente y Publicidad:</strong>
                        <p className="small mb-0">
                          Relación: {respuestaSeleccionada.datos?.relacion_cliente}
                          <br />
                          Publicidad: {respuestaSeleccionada.datos?.publicidad}
                        </p>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-6 mb-2">
                        <strong>6.- Actividades claves:</strong>
                        <ol className="small mb-0 pl-3">
                          {(
                            respuestaSeleccionada.datos?.actividades_claves ||
                            []
                          )
                            .filter(Boolean)
                            .map((act, i) => (
                              <li key={i}>{act}</li>
                            ))}
                        </ol>
                      </div>
                      <div className="col-md-6 mb-2">
                        <strong>7.- Recursos claves:</strong>
                        <ul className="small mb-0 pl-3">
                          <li>
                            Humano:{' '}
                            {
                              respuestaSeleccionada.datos?.recursos_claves
                                ?.recurso_humano
                            }
                          </li>
                          <li>
                            Mobiliario:{' '}
                            {
                              respuestaSeleccionada.datos?.recursos_claves
                                ?.mobiliario
                            }
                          </li>
                          <li>
                            Equipo:{' '}
                            {
                              respuestaSeleccionada.datos?.recursos_claves
                                ?.equipo
                            }
                          </li>
                          <li>
                            Insumos:{' '}
                            {
                              respuestaSeleccionada.datos?.recursos_claves
                                ?.insumos
                            }
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="mb-3">
                      <strong>8.- Red de alianzas:</strong>
                      <p className="small mb-0">
                        Proveedores:{' '}
                        {respuestaSeleccionada.datos?.red_alianzas?.proveedores}{' '}
                        | Aliados:{' '}
                        {respuestaSeleccionada.datos?.red_alianzas?.aliados}
                      </p>
                    </div>

                    <div
                      className="p-3 rounded mb-3"
                      style={{ backgroundColor: 'rgba(188, 149, 92, 0.14)' }}
                    >
                      <h6
                        className="font-weight-bold mb-2"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        Resumen Financiero del Modelo CANVAS
                      </h6>
                      <div className="row small">
                        <div className="col-md-3">
                          <strong>Ventas estimadas/mes:</strong>
                          <div>
                            $
                            {Number(
                              respuestaSeleccionada.datos?.totales_calculados
                                ?.total_vendido_mes || 0
                            ).toLocaleString('es-MX', {
                              minimumFractionDigits: 2,
                            })}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <strong>Costos Fijos/mes:</strong>
                          <div>
                            $
                            {Number(
                              respuestaSeleccionada.datos?.totales_calculados
                                ?.total_costos_fijos || 0
                            ).toLocaleString('es-MX', {
                              minimumFractionDigits: 2,
                            })}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <strong>Costos Variables/mes:</strong>
                          <div>
                            $
                            {Number(
                              respuestaSeleccionada.datos?.totales_calculados
                                ?.total_costos_variables || 0
                            ).toLocaleString('es-MX', {
                              minimumFractionDigits: 2,
                            })}
                          </div>
                        </div>
                        <div className="col-md-3">
                          <strong>Valor Total Proyecto:</strong>
                          <div>
                            $
                            {Number(
                              respuestaSeleccionada.datos?.totales_calculados
                                ?.total_requisitos_proyecto || 0
                            ).toLocaleString('es-MX', {
                              minimumFractionDigits: 2,
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SECCIÓN PARA LLENADO EXCLUSIVO DEL PERSONAL DE SEDECO */}
                <form
                  onSubmit={guardarRevisionSedeco}
                  className="p-3 rounded border"
                  style={{
                    backgroundColor: 'rgba(127, 40, 65, 0.05)',
                  }}
                >
                  <h6
                    className="font-weight-bold mb-3"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    <i className="fa fa-lock mr-2"></i>
                    PARA LLENADO EXCLUSIVO DE PERSONAL DE LA SEDECO
                  </h6>
                  <div className="row">
                    <div className="col-md-4 mb-2">
                      <label className="small font-weight-bold">
                        Atendió (Nombre del asesor SEDECO):
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Nombre del personal que atendió"
                        value={atendioStaff}
                        onChange={(e) => setAtendioStaff(e.target.value)}
                      />
                    </div>
                    <div className="col-md-8 mb-2">
                      <label className="small font-weight-bold">
                        Comentarios / Dictamen de Seguimiento:
                      </label>
                      <textarea
                        className="form-control form-control-sm"
                        rows="2"
                        placeholder="Escribe las observaciones internas del asesor de SEDECO..."
                        value={comentarioStaff}
                        onChange={(e) => setComentarioStaff(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="text-right mt-2">
                    <button
                      type="submit"
                      disabled={guardandoStaff}
                      className="btn btn-sm text-white font-weight-bold px-4"
                      style={{
                        backgroundColor: 'var(--color-secondary)',
                        borderRadius: '20px',
                      }}
                    >
                      <i className="fa fa-save mr-1"></i>
                      {guardandoStaff
                        ? 'Guardando...'
                        : 'Guardar Observaciones SEDECO'}
                    </button>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setRespuestaSeleccionada(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelEncuestasAdmin;

