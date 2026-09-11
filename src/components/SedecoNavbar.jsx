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
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sedecoNavbar" aria-controls="sedecoNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
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
              <a className="nav-link" href="#directorio" style={{ color: 'var(--color-text)' }}>Directorio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contacto" style={{ color: 'var(--color-text)' }}>Contacto SEDECO</a>
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
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle font-weight-bold" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: 'var(--color-primary)' }}>
                  <i className="fa fa-user mr-1"></i> ¡Hola, {userName}!
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown" style={{ backgroundColor: 'var(--color-surface)' }}>
                  <button className="dropdown-item text-danger font-weight-bold" onClick={handleLogout}>
                    <i className="fa fa-sign-out mr-2"></i> Cerrar Sesión
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SedecoNavbar;
