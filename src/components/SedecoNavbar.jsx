import React from 'react';
import { Link } from 'react-router-dom';

const SedecoNavbar = () => {
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
            <li className="nav-item">
              <Link className="nav-link font-weight-bold" to="/login" style={{ color: 'var(--color-secondary)' }}>
                <i className="fa fa-user-circle mr-1"></i> Iniciar Sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SedecoNavbar;
