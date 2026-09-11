import React from 'react'

const Programas = () => {
  const programas = [
    {
      titulo: "Centro de Desarrollo Emprendedor",
      icon: "fa-lightbulb-o",
      descripcion: "Brinda charlas, talleres y conferencias en temas de emprendimiento; realiza diagnóstico de necesidades empresariales y proporciona asesoría y acompañamiento para el desarrollo de proyectos y puesta en marcha de negocios."
    },
    {
      titulo: "Capacitación empresarial",
      icon: "fa-graduation-cap",
      descripcion: "Se imparten capacitaciones en temas como contabilidad, administración, marketing, emprendimiento y otras materias orientadas al fortalecimiento de las capacidades empresariales."
    },
    {
      titulo: "Promoción y comercialización",
      icon: "fa-bullhorn",
      descripcion: "Se generan espacios de promoción y venta mediante ferias, exposiciones y mercados regionales vinculados con Hecho en Colima."
    },
    {
      titulo: "Conexiones comerciales",
      icon: "fa-handshake-o",
      descripcion: "Vinculación de MIPYMES con compradores, cadenas comerciales y distribuidores para generar oportunidades de comercialización."
    },
    {
      titulo: "Misiones y networking",
      icon: "fa-globe",
      descripcion: "Acciones de vinculación orientadas a facilitar oportunidades de expansión regional y nacional."
    },
    {
      titulo: "Programas y proyectos MIPYMES",
      icon: "fa-briefcase",
      descripcion: "De acuerdo con la disponibilidad presupuestal, se diseñan estrategias y convocatorias que contribuyen al fortalecimiento de la operación y financiamiento de las micro, pequeñas y medianas empresas."
    },
    {
      titulo: "Registro de marca e IMPI",
      icon: "fa-registered",
      descripcion: "Se brinda orientación gratuita para la protección de la identidad comercial ante el IMPI y se promueve la incorporación de empresas a esquemas de descuento de hasta 90%."
    },
    {
      titulo: "Acompañamiento financiero",
      icon: "fa-line-chart",
      descripcion: "Se orienta y vincula a las empresas con programas estatales y federales disponibles y con instituciones de financiamiento."
    },
    {
      titulo: "Vinculación con aliados",
      icon: "fa-users",
      descripcion: "Alianzas estratégicas con instituciones educativas, cámaras empresariales, comercio electrónico e instituciones tecnológicas."
    }
  ];

  return (
    <main className="main-content container py-5 overflow-hidden">
      
      <div className="row mb-5" data-aos="fade-down">
        <div className="col-12 text-center">
          <h1 className="display-4 font-weight-bold" style={{ color: 'var(--color-primary)' }}>Programas y Servicios</h1>
          <p className="lead" style={{ color: 'var(--color-text)' }}>Descubre las herramientas y apoyos que tenemos para llevar tu empresa al siguiente nivel.</p>
        </div>
      </div>

      {/* Programas Destacados - Banners */}
      <div className="row mb-5">
        
        {/* Mercado Libre Banner */}
        <div className="col-lg-6 mb-4" data-aos="fade-right" data-aos-delay="100">
          <div className="featured-banner h-100 d-flex flex-column" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img src="/img/ml-colima.png" alt="Emprende en Mercado Libre" className="img-fluid w-100" style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-4 d-flex flex-column flex-grow-1" style={{ borderTop: '5px solid #FFE600' }}>
              <h3 className="font-weight-bold mb-3" style={{ color: '#2d3277' }}>Tienda Oficial Hecho en Colima</h3>
              <p className="mb-4" style={{ color: 'var(--color-text)' }}>Forma parte del ecosistema de Mercado Libre. Capacitación práctica, identidad comercial y acceso a Mercado Pago y Mercado Envíos.</p>
              <div className="mt-auto">
                <a href="https://tienda.mercadolibre.com.mx/hecho-en-colima" target="_blank" rel="noreferrer" className="btn font-weight-bold shadow-sm w-100" style={{ backgroundColor: '#FFE600', color: '#2d3277', borderRadius: '30px' }}>
                  Ir a la Tienda Oficial <i className="fa fa-external-link ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* DHL Banner */}
        <div className="col-lg-6 mb-4" data-aos="fade-left" data-aos-delay="200">
          <div className="featured-banner h-100 d-flex flex-column" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img src="/img/dhl-pymes.png" alt="DHL PyMES Program" className="img-fluid w-100" style={{ objectFit: 'cover', borderBottom: '1px solid #eee' }} />
            </div>
            <div className="p-4 d-flex flex-column flex-grow-1" style={{ borderTop: '5px solid #d40511' }}>
              <h3 className="font-weight-bold mb-3" style={{ color: '#d40511' }}>DHL PyMES Program</h3>
              <p className="mb-4" style={{ color: 'var(--color-text)' }}>Internacionaliza tu negocio con increíbles beneficios: <strong>Hasta 60%</strong> de descuento nacional y <strong>Hasta 80%</strong> en envíos internacionales.</p>
              <div className="mt-auto">
                <a href="https://www.dhl.com/discover/es-mx/PYMES/page-pymes-program" target="_blank" rel="noreferrer" className="btn font-weight-bold text-white shadow-sm w-100" style={{ backgroundColor: '#d40511', borderRadius: '30px' }}>
                  Abrir cuenta PyME <i className="fa fa-external-link ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="row mb-4 mt-5">
        <div className="col-12 text-center" data-aos="zoom-in">
          <h2 className="font-weight-bold border-bottom d-inline-block pb-2" style={{ color: 'var(--color-primary)' }}>Más Servicios SEDECO</h2>
        </div>
      </div>

      {/* Grid de Tarjetas Interactivas */}
      <div className="row">
        {programas.map((programa, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
            <div className="interactive-program-card shadow-sm">
              <div className="card-content">
                <div className="icon-wrapper">
                  <i className={`fa ${programa.icon} fa-2x`} style={{ color: 'var(--color-primary)' }}></i>
                </div>
                <h4 className="font-weight-bold mb-0" style={{ color: 'var(--color-primary)' }}>
                  {programa.titulo}
                </h4>
                
                <div className="hover-reveal">
                  <p className="mt-3 text-muted" style={{ fontSize: '0.95rem' }}>
                    {programa.descripcion}
                  </p>
                  <button className="btn btn-sm text-white mt-2" style={{ backgroundColor: 'var(--color-secondary)', borderRadius: '20px' }}>
                    Solicitar Info <i className="fa fa-arrow-right ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </main>
  )
}

export default Programas
