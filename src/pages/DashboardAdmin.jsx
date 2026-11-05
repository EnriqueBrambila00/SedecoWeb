import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import PanelEncuestasAdmin from '../components/PanelEncuestasAdmin';
import { obtenerRespuestasEncuestas } from '../services/encuestasService';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inicio');
  const [stats, setStats] = useState({
    usuarios: 0,
    noticias: 0,
    encuestas: 2,
    respuestas: 0,
    mensajes: 0,
  });
  const [respuestasEncuestas, setRespuestasEncuestas] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || 'https://sedecobackend.onrender.com';
      const token = localStorage.getItem('token');

      const [resEncuestas] = await Promise.all([
        obtenerRespuestasEncuestas(),
        fetch(`${apiUrl}/api/dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(async (response) => {
            if (response.ok) {
              const data = await response.json();
              setStats(data);
            }
          })
          .catch(() => {}),
      ]);

      setRespuestasEncuestas(resEncuestas);
    } catch (error) {
      console.error('Error al obtener datos del dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const totalEncuestasActivas = Math.max(2, Number(stats.encuestas) || 2);
  const totalRespuestas = Math.max(
    respuestasEncuestas.length,
    Number(stats.respuestas) || 0
  );

  return (
    <div
      className="d-flex"
      style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}
    >
      {/* Sidebar (Menú Lateral) */}
      <div
        className="text-white p-3"
        style={{ width: '250px', backgroundColor: 'var(--color-primary)' }}
      >
        <h4 className="text-center mb-4 border-bottom pb-2">Admin</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button
              className={`nav-link text-white text-left w-100 btn ${
                activeTab === 'inicio' ? 'bg-dark rounded' : ''
              }`}
              onClick={() => setActiveTab('inicio')}
            >
              <i className="fa fa-home mr-2"></i> Inicio
            </button>
          </li>
          <li className="nav-item mb-2">
            <button
              className={`nav-link text-white text-left w-100 btn ${
                activeTab === 'encuestas' ? 'bg-dark rounded' : ''
              }`}
              onClick={() => setActiveTab('encuestas')}
            >
              <i className="fa fa-list-alt mr-2"></i> Encuestas
            </button>
          </li>
        </ul>

        <div className="mt-5 text-center">
          <ThemeToggle variant="sidebar" className="mb-2" />
          <button
            className="btn btn-outline-light w-100 mb-2"
            onClick={() => navigate('/encuestas')}
          >
            <i className="fa fa-external-link mr-2"></i> Ver Encuestas
          </button>
          <button
            className="btn btn-outline-light w-100 mb-2"
            onClick={() => navigate('/')}
          >
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
            {activeTab === 'inicio'
              ? 'Panel de Administración'
              : 'Gestión de Encuestas y Diagnósticos'}
          </h2>
          <span
            className="badge badge-primary p-2"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            Nivel: Intermedio
          </span>
        </div>

        {activeTab === 'inicio' && (
          <>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div
                  className="card shadow-sm border-0 h-100"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setActiveTab('encuestas')}
                >
                  <div className="card-body text-center">
                    <h1 style={{ color: 'var(--color-secondary)' }}>
                      <i className="fa fa-list-alt"></i>
                    </h1>
                    <h5 className="card-title text-muted">Encuestas Activas</h5>
                    <h2>{loading ? '...' : totalEncuestasActivas}</h2>
                    <span className="small text-muted">
                      Diagnóstico CDE y Modelo CANVAS
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div
                  className="card shadow-sm border-0 h-100"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setActiveTab('encuestas')}
                >
                  <div className="card-body text-center">
                    <h1 style={{ color: 'var(--color-secondary)' }}>
                      <i className="fa fa-check-square-o"></i>
                    </h1>
                    <h5 className="card-title text-muted">
                      Respuestas Recibidas
                    </h5>
                    <h2>{loading ? '...' : totalRespuestas}</h2>
                    <span className="small text-muted">
                      Clic para revisar expedientes
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div
                  className="card shadow-sm border-0 h-100"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text)',
                  }}
                >
                  <div className="card-body text-center">
                    <h1 style={{ color: 'var(--color-secondary)' }}>
                      <i className="fa fa-download"></i>
                    </h1>
                    <h5 className="card-title text-muted">
                      Exportación Disponible
                    </h5>
                    <h2>CSV / Excel</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <PanelEncuestasAdmin
                respuestas={respuestasEncuestas}
                onRefresh={cargarDatos}
              />
            </div>
          </>
        )}

        {activeTab === 'encuestas' && (
          <PanelEncuestasAdmin
            respuestas={respuestasEncuestas}
            onRefresh={cargarDatos}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
