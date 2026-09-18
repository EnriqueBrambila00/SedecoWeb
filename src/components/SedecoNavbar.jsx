import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SedecoNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const usuario = localStorage.getItem('usuario');
    if (token && usuario) {
      setIsLoggedIn(true);
      try {
        setUserName(JSON.parse(usuario).nombre);
      } catch (e) {
        setUserName('');
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  };

  useEffect(() => {
    checkAuth();
    // Listen for custom storage event from Login/Logout
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-md shadow-sm py-2" style={{ borderBottom: '3px solid var(--color-secondary)', backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <Link className="navbar-brand font-weight-bold" style={{ color: 'var(--color-primary)' }} to="/">
          SEDECO Colima
        </Link>
        <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#sedecoNavbar" aria-controls="sedecoNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa fa-bars fa-lg" style={{ color: 'var(--color-primary)' }}></i>
        </button>

        <div className="collapse navbar-collapse" id="sedecoNavbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link font-weight-bold" to="/" style={{ color: 'var(--color-primary)' }}>Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/programas" style={{ color: 'var(--color-text)' }}>Programas y Servicios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/noticias" style={{ color: 'var(--color-text)' }}>Noticias</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="masOpcionesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'var(--color-text)' }}>
                Más opciones
              </a>
              <div className="dropdown-menu" aria-labelledby="masOpcionesDropdown" style={{ backgroundColor: 'var(--color-surface)' }}>
                <a className="dropdown-item" href="#directorio" style={{ color: 'var(--color-text)' }}>Directorio</a>
                <a className="dropdown-item" href="#contacto" style={{ color: 'var(--color-text)' }}>Contacto SEDECO</a>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link font-weight-bold" to="/login" style={{ color: 'var(--color-secondary)' }}>
                  <i className="fa fa-user-circle mr-1"></i> Iniciar Sesión
                </Link>
              </li>
            ) : (
              <>
                {JSON.parse(localStorage.getItem('usuario'))?.id_rol === 1 && (
                  <li className="nav-item">
                    <Link 
                      className="nav-link text-white px-3 font-weight-bold mr-2" 
                      to="/dashboard-superadmin" 
                      style={{ backgroundColor: 'var(--color-secondary)', borderRadius: '20px' }}
                    >
                      <i className="fa fa-tachometer mr-1"></i> Panel de Control
                    </Link>
                  </li>
                )}
                {JSON.parse(localStorage.getItem('usuario'))?.id_rol === 2 && (
                  <li className="nav-item">
                    <Link 
                      className="nav-link text-white px-3 font-weight-bold mr-2" 
                      to="/dashboard-admin" 
                      style={{ backgroundColor: 'var(--color-secondary)', borderRadius: '20px' }}
                    >
                      <i className="fa fa-tachometer mr-1"></i> Panel de Control
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <span 
                    className="nav-link text-white px-3 font-weight-bold" 
                    style={{ backgroundColor: 'var(--color-primary)', borderRadius: '20px' }}
                  >
                    <i className="fa fa-user-circle mr-1"></i> {userName}
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-outline-light nav-link px-3 ml-2 text-danger font-weight-bold" 
                    style={{ borderRadius: '20px', backgroundColor: 'transparent', border: 'none' }}
                  >
                    <i className="fa fa-sign-out mr-1"></i> Salir
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SedecoNavbar;
