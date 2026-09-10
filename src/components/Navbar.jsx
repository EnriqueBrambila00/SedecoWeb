import React from 'react';

const Navbar = () => {
  return (
    <nav id="mainNavbar" className="navbar navbar-expand-md navbar-dark shadow-sm" style={{ backgroundColor: 'var(--color-primary)' }}>
      <button className="navbar-toggler navbar-toggler-right custom-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand text-center" href="https://www.col.gob.mx/">
        <img src="https://openapis.col.gob.mx/API_PU/img/logomin.png" style={{ maxWidth: '50%' }} className="img-fluid" title="Ir al portal" alt="colima estado" />
      </a>
      <div className="collapse navbar-collapse justify-content-md-center" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link cursor denuncia-menu" target="_blank" rel="noreferrer" href="https://www.col.gob.mx/coronavirus">CORONAVIRUS</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://www.col.gob.mx/Portal/Tramites">Trámites</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://www.col.gob.mx/Portal">Gobierno</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://www.col.gob.mx/Portal/#sec_atencion">Contáctanos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link cursor" target="_blank" rel="noreferrer" href="https://www.col.gob.mx/DatosAbiertos">Datos</a>
          </li>
          <li className="nav-item">
            <a href="https://www.col.gob.mx/Portal/contenido/NDYzMDY=" className="nav-link cursor" target="_blank" rel="noreferrer">Transparencia</a>
          </li>
          <li className="nav-item">
            <a className="nav-link cursor denuncia-menu" href="https://www.col.gob.mx/index.php/Portal/denuncia">DENUNCIA</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="navbar-search-li-first" href="https://www.col.gob.mx/Portal/busqueda"><i alt="Buscar" title="Buscar" className="fa fa-search" aria-hidden="true"></i></a>
          </li>
          <form id="formBusqueda" method="GET" action="https://www.col.gob.mx/Portal/detalle_busqueda" className="nav-item display-none">
            <div className="input-group" id="navbar-input-search">
              <input type="text" name="q" className="form-control" />
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="submit">
                  <i alt="Buscar" title="Buscar" className="fa fa-search" aria-hidden="true"></i>
                </button>
              </span>
            </div>
          </form>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
