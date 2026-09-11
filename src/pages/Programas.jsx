import React from 'react'

const Programas = () => {
  const programas = [
    {
      titulo: "Centro de Desarrollo Emprendedor",
      descripcion: "Brinda charlas, talleres y conferencias en temas de emprendimiento; realiza diagnóstico de necesidades empresariales y proporciona asesoría y acompañamiento para el desarrollo de proyectos y puesta en marcha de negocios."
    },
    {
      titulo: "Capacitación empresarial",
      descripcion: "Se imparten capacitaciones en temas como contabilidad, administración, marketing, emprendimiento y otras materias orientadas al fortalecimiento de las capacidades empresariales."
    },
    {
      titulo: "Digitalización empresarial",
      descripcion: "Se desarrollan programas como Emprende en Mercado Libre, orientados a impulsar la venta en línea mediante capacitación práctica y acompañamiento digital."
    },
    {
      titulo: "Promoción y comercialización",
      descripcion: "Se generan espacios de promoción y venta mediante ferias, exposiciones y mercados regionales vinculados con Hecho en Colima."
    },
    {
      titulo: "Conexiones comerciales",
      descripcion: "Vinculación de MIPYMES con compradores, cadenas comerciales y distribuidores para generar oportunidades de comercialización."
    },
    {
      titulo: "Misiones comerciales y networking",
      descripcion: "Acciones de vinculación orientadas a facilitar oportunidades de expansión regional y nacional."
    },
    {
      titulo: "Programas y proyectos MIPYMES",
      descripcion: "De acuerdo con la disponibilidad presupuestal, se diseñan estrategias y convocatorias que contribuyen al fortalecimiento de la operación y financiamiento de las micro, pequeñas y medianas empresas."
    },
    {
      titulo: "Propiedad industrial y registro de marca",
      descripcion: "Se brinda orientación gratuita para la protección de la identidad comercial ante el IMPI y se promueve la incorporación de empresas a programas de apoyo al registro de marcas, como los esquemas de descuento de hasta 90%."
    },
    {
      titulo: "Acompañamiento para financiamiento y formalización",
      descripcion: "Se orienta y vincula a las empresas con programas estatales y federales disponibles y con instituciones de financiamiento."
    },
    {
      titulo: "Vinculación con aliados estratégicos",
      descripcion: "Se generan alianzas con instituciones educativas, cámaras empresariales, asociaciones civiles, plataformas de comercio electrónico, instituciones financieras y de desarrollo tecnológico y ayuntamientos."
    }
  ];

  return (
    <main className="main-content container py-5">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 font-weight-bold" style={{ color: 'var(--color-primary)' }}>Programas y Servicios</h1>
          <p className="lead" style={{ color: 'var(--color-text)' }}>Conoce a detalle todas las acciones vigentes que tenemos para impulsar tu emprendimiento y empresa.</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="accordion shadow-sm" id="accordionProgramas">
            {programas.map((programa, index) => (
              <div className="card mb-2" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'rgba(255,255,255,0.1)' }} key={index}>
                <div className="card-header bg-transparent border-0" id={`heading${index}`}>
                  <h2 className="mb-0">
                    <button 
                      className="btn btn-link btn-block text-left text-decoration-none font-weight-bold" 
                      type="button" 
                      data-toggle="collapse" 
                      data-target={`#collapse${index}`} 
                      aria-expanded={index === 0 ? "true" : "false"} 
                      aria-controls={`collapse${index}`}
                      style={{ color: 'var(--color-primary)' }}
                    >
                      <i className="fa fa-chevron-circle-right mr-2" style={{ color: 'var(--color-secondary)' }}></i>
                      {programa.titulo}
                    </button>
                  </h2>
                </div>

                <div 
                  id={`collapse${index}`} 
                  className={`collapse ${index === 0 ? "show" : ""}`} 
                  aria-labelledby={`heading${index}`} 
                  data-parent="#accordionProgramas"
                >
                  <div className="card-body" style={{ color: 'var(--color-text)', paddingLeft: '3rem' }}>
                    {programa.descripcion}
                    <div className="mt-3">
                      <button className="btn btn-sm text-white" style={{ backgroundColor: 'var(--color-secondary)' }}>
                        Solicitar información <i className="fa fa-arrow-right ml-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Programas
