import React from 'react';

const SedecoNavbar = () => {
  return (
    <nav className="navbar navbar-expand-md shadow-sm py-2" style={{ borderBottom: '3px solid var(--color-secondary)', backgroundColor: 'var(--color-surface)' }}>
      <div className="container">
        <a className="navbar-brand font-weight-bold" style={{ color: 'var(--color-primary)' }} href="/">
          SEDECO Colima
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sedecoNavbar" aria-controls="sedecoNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="sedecoNavbar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link font-weight-bold" href="/" style={{ color: 'var(--color-primary)' }}>Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#tramites" style={{ color: 'var(--color-text)' }}>Gestión de Trámites</a>
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
              <a className="nav-link font-weight-bold" href="#login" style={{ color: 'var(--color-secondary)' }}>
                <i className="fa fa-user-circle mr-1"></i> Iniciar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default SedecoNavbar;
