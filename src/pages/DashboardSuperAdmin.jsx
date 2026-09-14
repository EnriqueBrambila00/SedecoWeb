import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardSuperAdmin = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    usuarios: 0,
    noticias: 0,
    encuestas: 0,
    respuestas: 0,
    mensajes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Función básica de logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    // Forzamos un evento storage para que el Navbar se actualice si está escuchando
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
      {/* Sidebar (Menú Lateral) */}
      <div className="text-white p-3" style={{ width: '250px', backgroundColor: 'var(--color-primary)' }}>
        <h4 className="text-center mb-4 border-bottom pb-2">Super Admin</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white bg-dark rounded">
              <i className="fa fa-home mr-2"></i> Inicio
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              <i className="fa fa-users mr-2"></i> Usuarios
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              <i className="fa fa-file-text mr-2"></i> Páginas
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              <i className="fa fa-newspaper-o mr-2"></i> Noticias
            </a>
          </li>
        </ul>
        
        <div className="mt-5 text-center">
          <button className="btn btn-outline-light w-100" onClick={handleLogout}>
            <i className="fa fa-sign-out mr-2"></i> Salir
          </button>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: 'var(--color-primary)' }}>Panel de Control Principal</h2>
          <span className="badge badge-primary p-2" style={{ backgroundColor: 'var(--color-secondary)' }}>Nivel: Superadmin</span>
        </div>

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
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <h1 style={{ color: 'var(--color-secondary)' }}><i className="fa fa-envelope"></i></h1>
                <h5 className="card-title text-muted">Mensajes</h5>
                <h2>{loading ? '...' : stats.mensajes}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0 mt-4">
          <div className="card-header bg-white font-weight-bold" style={{ color: 'var(--color-primary)' }}>
            Bienvenido al Sistema Central
          </div>
          <div className="card-body">
            <p>Desde aquí tienes control total sobre la plataforma SEDECO. Puedes añadir, modificar o eliminar cualquier registro.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSuperAdmin;
