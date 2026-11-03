import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-backgroundcolor-pu">
      <div className="footer-back-dark"></div>
      <div className="container py-4">
        <div className="row align-items-center">
          
          {/* Lado Izquierdo: Logotipo, Dirección y Enlaces Legales */}
          <div className="col-md-6 col-12 mb-4 mb-md-0">
            <div className="footer-left-content">
              <div className="mb-3">
                <img 
                  className="img-fluid" 
                  src="https://openapis.col.gob.mx/API_PU/img/logo-colima-2021.png" 
                  alt="Gobierno del Estado de Colima" 
                  style={{ maxWidth: '260px' }}
                />
              </div>
              <p className="footer-texto-pu mb-3">
                Complejo Administrativo del Gobierno del Estado 3er. Anillo Periférico, Esq. Ejército Mexicano S/N. Colonia el Diezmo. C.P. 28010, Colima, Colima, México. Tel. (312) 316 2000
              </p>
              <div className="footer-legal-links">
                <a className="linksfooter d-inline-block mr-3" href="http://www.col.gob.mx/Portal/mapa_sitio" target="_self">
                  Mapa del sitio
                </a>
                <a className="linksfooter d-inline-block" target="_blank" rel="noreferrer" href="http://www.col.gob.mx/Portal/contenido/MTA3MzI=">
                  Políticas de uso y privacidad
                </a>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Redes Sociales y Accesos Rápidos (Perfectamente centrados y alineados) */}
          <div className="col-md-6 col-12">
            <div className="footer-right-content">
              
              {/* Redes Sociales */}
              <div className="footer-social-wrapper mb-4">
                <ul className="footer-social-list">
                  <li>
                    <a 
                      href="https://www.facebook.com/gobiernocolima/" 
                      target="_blank" 
                      rel="noreferrer" 
                      title="Facebook"
                      className="footer-social-link"
                      aria-label="Facebook Gobierno de Colima"
                    >
                      <i className="fa fa-facebook-official" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://twitter.com/gobiernocolima" 
                      target="_blank" 
                      rel="noreferrer" 
                      title="Twitter / X"
                      className="footer-social-link"
                      aria-label="Twitter / X Gobierno de Colima"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.youtube.com/user/GobiernoColima" 
                      target="_blank" 
                      rel="noreferrer" 
                      title="Youtube"
                      className="footer-social-link"
                      aria-label="YouTube Gobierno de Colima"
                    >
                      <i className="fa fa-youtube-play" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Accesos rápidos: Intranet, Directorio, Validación */}
              <div className="footer-services-grid">
                <a 
                  href="http://www.col.gob.mx/Portal/intranet" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Intranet" 
                  className="footer-service-item linksfooter"
                >
                  <div className="footer-service-icon">
                    <i className="fa fa-download fa-2x" aria-hidden="true"></i>
                  </div>
                  <span className="footer-service-label">Intranet</span>
                </a>

                <a 
                  href="https://directoriointegral.col.gob.mx/v3/" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Directorio integral" 
                  className="footer-service-item linksfooter"
                >
                  <div className="footer-service-icon">
                    <i className="fa fa-user fa-2x" aria-hidden="true"></i>
                  </div>
                  <span className="footer-service-label">Directorio<br />integral</span>
                </a>

                <a 
                  href="http://www.firel.col.gob.mx/" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="Validación de documentos con firma electrónica" 
                  className="footer-service-item linksfooter"
                >
                  <div className="footer-service-icon">
                    <i className="fa fa-check-circle-o fa-2x" aria-hidden="true"></i>
                  </div>
                  <span className="footer-service-label">Validación<br />de documentos</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
