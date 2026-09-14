import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardSuperAdmin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inicio');
  const [stats, setStats] = useState({ usuarios: 0, noticias: 0, encuestas: 0, respuestas: 0, mensajes: 0 });
  const [usuarios, setUsuarios] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para Modal de Nueva Noticia
  const [showModal, setShowModal] = useState(false);
  const [nuevaNoticia, setNuevaNoticia] = useState({ titulo: '', contenido: '', url_imagen: '', estatus: 'Activo' });

  const token = localStorage.getItem('token');
  const usuarioLocal = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    fetchStats();
    fetchUsuarios();
    fetchNoticias();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) { console.error("Error al obtener estadísticas:", error); } 
    finally { setLoading(false); }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      }
    } catch (error) { console.error("Error al obtener usuarios:", error); }
  };

  const fetchNoticias = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/noticias?all=true`);
      if (response.ok) {
        const data = await response.json();
        setNoticias(data);
      }
    } catch (error) { console.error("Error al obtener noticias:", error); }
  };

  // --- Funciones de Usuarios ---
  const cambiarRol = async (id_usuario, nuevoRol) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/${id_usuario}/rol`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id_rol: nuevoRol })
      });
      if (res.ok) {
        alert("Rol actualizado correctamente.");
        fetchUsuarios();
      }
    } catch (error) { console.error("Error al cambiar rol", error); }
  };

  const eliminarUsuario = async (id_usuario) => {
    if(!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/${id_usuario}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert("Usuario eliminado.");
        fetchUsuarios();
      }
    } catch (error) { console.error("Error eliminando usuario", error); }
  };

  // --- Funciones de Noticias ---
  const handleCrearNoticia = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/noticias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...nuevaNoticia,
          id_usuario: usuarioLocal ? usuarioLocal.id_usuario : 1
        })
      });
      if (res.ok) {
        alert("Noticia guardada con éxito");
        setShowModal(false);
        setNuevaNoticia({ titulo: '', contenido: '', url_imagen: '', estatus: 'Activo' });
        fetchNoticias();
      } else {
        const errorData = await res.json();
        alert(`Error al guardar: ${errorData.error || 'Desconocido'}`);
      }
    } catch (error) { 
      console.error("Error creando noticia", error); 
      alert("Error de conexión al intentar guardar la noticia");
    }
  };

  const cambiarEstatusNoticia = async (id_noticia, estatusActual) => {
    const nuevoEstatus = estatusActual === 'Activo' ? 'Inactivo' : 'Activo';
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/noticias/${id_noticia}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estatus: nuevoEstatus })
      });
      if (res.ok) { fetchNoticias(); }
    } catch (error) { console.error("Error cambiando estatus", error); }
  };

  const eliminarNoticia = async (id_noticia) => {
    if(!window.confirm("¿Seguro que deseas eliminar esta noticia permanentemente?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/noticias/${id_noticia}`, {
        method: 'DELETE'
      });
      if (res.ok) { fetchNoticias(); }
    } catch (error) { console.error("Error eliminando", error); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
      {/* Sidebar */}
      <div className="text-white p-3" style={{ width: '250px', backgroundColor: 'var(--color-primary)' }}>
        <h4 className="text-center mb-4 border-bottom pb-2">Super Admin</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button 
              className={`nav-link text-white text-left w-100 btn ${activeTab === 'inicio' ? 'bg-dark rounded' : ''}`}
              onClick={() => setActiveTab('inicio')}
            >
              <i className="fa fa-home mr-2"></i> Inicio
            </button>
          </li>
          <li className="nav-item mb-2">
            <button 
              className={`nav-link text-white text-left w-100 btn ${activeTab === 'usuarios' ? 'bg-dark rounded' : ''}`}
              onClick={() => setActiveTab('usuarios')}
            >
              <i className="fa fa-users mr-2"></i> Usuarios
            </button>
          </li>
          <li className="nav-item mb-2">
            <button 
              className={`nav-link text-white text-left w-100 btn ${activeTab === 'noticias' ? 'bg-dark rounded' : ''}`}
              onClick={() => setActiveTab('noticias')}
            >
              <i className="fa fa-newspaper-o mr-2"></i> Noticias
            </button>
          </li>
        </ul>
        
        
        <div className="mt-5 text-center">
          <button className="btn btn-outline-light w-100 mb-2" onClick={() => navigate('/')}>
            <i className="fa fa-arrow-left mr-2"></i> Volver a la Página
          </button>
          <button className="btn btn-outline-light w-100" onClick={handleLogout}>
            <i className="fa fa-sign-out mr-2"></i> Salir
          </button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: 'var(--color-primary)' }}>
            {activeTab === 'inicio' && 'Panel de Control Principal'}
            {activeTab === 'usuarios' && 'Gestión de Usuarios'}
            {activeTab === 'noticias' && 'Gestión de Noticias'}
          </h2>
          <span className="badge badge-primary p-2" style={{ backgroundColor: 'var(--color-secondary)' }}>Nivel: Superadmin</span>
        </div>

        {/* CONTENIDO INICIO */}
        {activeTab === 'inicio' && (
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center">
                  <h1 style={{ color: 'var(--color-secondary)' }}><i className="fa fa-users"></i></h1>
                  <h5 className="card-title text-muted">Total Usuarios</h5>
                  <h2>{loading ? '...' : stats.usuarios}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center">
                  <h1 style={{ color: 'var(--color-secondary)' }}><i className="fa fa-file-text"></i></h1>
                  <h5 className="card-title text-muted">Encuestas Activas</h5>
                  <h2>{loading ? '...' : stats.encuestas}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center">
                  <h1 style={{ color: 'var(--color-secondary)' }}><i className="fa fa-newspaper-o"></i></h1>
                  <h5 className="card-title text-muted">Noticias</h5>
                  <h2>{loading ? '...' : stats.noticias}</h2>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTENIDO USUARIOS */}
        {activeTab === 'usuarios' && (
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Rol Actual</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: 'var(--color-text)' }}>
                    {usuarios.map(u => (
                      <tr key={u.id_usuario}>
                        <td>{u.id_usuario}</td>
                        <td>{u.nombre} {u.apellido_paterno}</td>
                        <td>{u.correo}</td>
                        <td>
                          <span className={`badge ${u.id_rol === 1 ? 'badge-danger' : u.id_rol === 2 ? 'badge-warning' : 'badge-info'}`}>
                            {u.rol_nombre}
                          </span>
                        </td>
                        <td>
                          <select 
                            className="form-control form-control-sm d-inline-block w-auto mr-2"
                            value={u.id_rol}
                            onChange={(e) => cambiarRol(u.id_usuario, e.target.value)}
                          >
                            <option value="1">Super Admin</option>
                            <option value="2">Admin</option>
                            <option value="3">Usuario</option>
                          </select>
                          <button className="btn btn-sm btn-danger" onClick={() => eliminarUsuario(u.id_usuario)}>
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CONTENIDO NOTICIAS */}
        {activeTab === 'noticias' && (
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Lista de Noticias</h5>
              <button className="btn text-white" style={{ backgroundColor: 'var(--color-secondary)' }} onClick={() => setShowModal(true)}>
                <i className="fa fa-plus mr-1"></i> Nueva Noticia
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                    <tr>
                      <th>ID</th>
                      <th>Título</th>
                      <th>Fecha</th>
                      <th>Estatus</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: 'var(--color-text)' }}>
                    {noticias.map(n => (
                      <tr key={n.id_noticia}>
                        <td>{n.id_noticia}</td>
                        <td>{n.titulo}</td>
                        <td>{new Date(n.fecha_publicacion).toLocaleDateString()}</td>
                        <td>
                          <button 
                            className={`btn btn-sm ${n.estatus === 'Activo' ? 'btn-success' : 'btn-secondary'}`}
                            onClick={() => cambiarEstatusNoticia(n.id_noticia, n.estatus)}
                          >
                            {n.estatus}
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-danger" onClick={() => eliminarNoticia(n.id_noticia)}>
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal Simple Nueva Noticia */}
        {showModal && (
          <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                  <h5 className="modal-title">Agregar Nueva Noticia</h5>
                  <button className="close text-white" onClick={() => setShowModal(false)}>&times;</button>
                </div>
                <div className="modal-body" style={{ color: 'var(--color-text)' }}>
                  <form onSubmit={handleCrearNoticia}>
                    <div className="form-group">
                      <label>Título</label>
                      <input type="text" className="form-control" required value={nuevaNoticia.titulo} onChange={e => setNuevaNoticia({...nuevaNoticia, titulo: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>URL de Imagen</label>
                      <input type="text" className="form-control" value={nuevaNoticia.url_imagen} onChange={e => setNuevaNoticia({...nuevaNoticia, url_imagen: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Contenido</label>
                      <textarea className="form-control" rows="5" required value={nuevaNoticia.contenido} onChange={e => setNuevaNoticia({...nuevaNoticia, contenido: e.target.value})}></textarea>
                    </div>
                    <button type="submit" className="btn btn-block text-white" style={{ backgroundColor: 'var(--color-secondary)' }}>Guardar Noticia</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DashboardSuperAdmin;
