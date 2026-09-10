import React from 'react';

const Footer = () => {
  return (
    <div className="container-fluid footer-backgroundcolor-pu">
      <div className="container-fluid footer-back-dark">&nbsp;</div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-12 container-img-footer">
            <div className="row">
              <div className="col-md-12 col-12 pt-3">
                <img className="img-fluid" src="https://openapis.col.gob.mx/API_PU/img/logo-colima-2021.png" alt="Colima" />
              </div>
              <div className="col-md-12 col-12 hidden-sm-down">
                <p className="footer-texto-pu">Complejo Administrativo del Gobierno del Estado 3er. Anillo Periférico, Esq. Ejército Mexicano S/N. Colonia el Diezmo. C.P. 28010, Colima, Colima, México. Tel. (312) 316 2000</p>
              </div>
              <div className="col-12 footer-link-left footer-links-color-pu">
                <a className="linksfooter" href="http://www.col.gob.mx/Portal/mapa_sitio" target="_self" title="">Mapa del sitio</a> <br />
                <a target="_blank" rel="noreferrer" className="linksfooter" href="http://www.col.gob.mx/Portal/contenido/MTA3MzI=" title="Políticas de uso">Políticas de uso y privacidad</a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row footer-social-separador-pu">
              <div className="col-12 text-center footer-social-separador-pu">
                <ul className="list-inline">
                  <li className="list-inline-item"><span className="footer-icon-separador-pu"></span><a href="https://www.facebook.com/gobiernocolima/" target="_blank" rel="noreferrer" title="Facebook"><i className="fa fa-facebook-official footer-facebook fa-3x" style={{color: 'var(--color-primary)'}} aria-hidden="true"></i></a></li>
                  <li className="list-inline-item "><span className="footer-icon-separador-pu"></span><a href="https://twitter.com/gobiernocolima" target="_blank" rel="noreferrer" title="Twitter"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="var(--color-primary)" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg></a></li>
                  <li className="list-inline-item "><span className="footer-icon-separador-pu"></span><a href="https://www.youtube.com/user/GobiernoColima" target="_blank" rel="noreferrer" title="Youtube"><i className="fa fa-youtube-play footer-youtube fa-3x" style={{color: 'var(--color-primary)'}} aria-hidden="true"></i></a></li>
                </ul>
              </div>
              <div className="col-12">
                <div className="row padding-left-30">
                  <div className="col text-center">
                    <i className="fa fa-download fa-2x" style={{color: 'var(--color-primary)'}}></i><br />
                    <a href="http://www.col.gob.mx/Portal/intranet" target="_blank" rel="noreferrer" title="Intranet" className="linksfooter">Intranet</a>
                  </div>
                  <div className="col text-center">
                    <i className="fa fa-user fa-2x" style={{color: 'var(--color-primary)'}} aria-hidden="true"></i><br />
                    <a href="http://directoriointegral.col.gob.mx/" target="_blank" rel="noreferrer" title="Directorio integral" className="linksfooter">Directorio <br /> integral</a>
                  </div>
                  <div className="col text-center">
                    <i className="fa fa-check-circle-o fa-2x" style={{color: 'var(--color-primary)'}} aria-hidden="true"></i><br />
                    <a href="http://www.firel.col.gob.mx/" target="_blank" rel="noreferrer" title="Validación de documentos con firma electrónica" className="linksfooter">Validación &nbsp; <br /> de documentos</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
