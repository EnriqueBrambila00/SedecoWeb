import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
      {/* Sidebar (Menú Lateral) */}
      <div className="text-white p-3" style={{ width: '250px', backgroundColor: 'var(--color-primary)' }}>
        <h4 className="text-center mb-4 border-bottom pb-2">Admin</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white bg-dark rounded">
              <i className="fa fa-home mr-2"></i> Inicio
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              <i className="fa fa-list-alt mr-2"></i> Encuestas
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              <i className="fa fa-download mr-2"></i> Descargas
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
          <h2 style={{ color: 'var(--color-primary)' }}>Panel de Administración</h2>
          <span className="badge badge-primary p-2" style={{ backgroundColor: 'var(--color-secondary)' }}>Nivel: Intermedio</span>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <h1 style={{ color: 'var(--color-secondary)' }}><i className="fa fa-list-alt"></i></h1>
                <h5 className="card-title text-muted">Encuestas Activas</h5>
                <h2>3</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <h1 style={{ color: 'var(--color-secondary)' }}><i className="fa fa-check-square-o"></i></h1>
                <h5 className="card-title text-muted">Respuestas Recibidas</h5>
                <h2>1,024</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                <h1 style={{ color: 'var(--color-secondary)' }}><i className="fa fa-download"></i></h1>
                <h5 className="card-title text-muted">Reportes Generados</h5>
                <h2>15</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0 mt-4">
          <div className="card-header bg-white font-weight-bold" style={{ color: 'var(--color-primary)' }}>
            Gestión de Encuestas
          </div>
          <div className="card-body">
            <p>En este panel puedes visualizar los resultados de las encuestas activas, modificar su configuración y descargar la información en Excel o PDF.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
