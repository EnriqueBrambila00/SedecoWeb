import React from 'react'

const Home = () => {
  return (
    <main className="main-content container py-5">
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h1 className="display-4 font-weight-bold" style={{ color: 'var(--color-primary)' }}>Secretaría de Desarrollo Económico del Estado de Colima</h1>
          <h2 className="text-muted">Dirección de Desarrollo Empresarial y Emprendimiento</h2>
        </div>
      </div>

      <div className="row align-items-center mb-5 p-5 rounded shadow-sm" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="col-md-6 text-center text-md-left">
          <h3 className="font-italic text-secondary" style={{ color: 'var(--color-primary)' }}>"En Colima creemos en el poder de las ideas, en la fuerza de nuestras MiPyMEs y en el talento de su gente."</h3>
          <p className="lead mt-4 font-weight-bold" style={{ color: 'var(--color-text)' }}>Si tienes una idea, nosotros te ayudamos a convertirla en oportunidad.</p>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm mt-4 mt-md-0">
            <div className="card-body">
              <h4 className="card-title" style={{ color: 'var(--color-primary)' }}><i className="fa fa-bullseye mr-2"></i> Nuestro Objetivo</h4>
              <p className="card-text text-justify">
                Impulsar el crecimiento, la innovación y la competitividad de los emprendimientos y micro, pequeña y mediana empresa (mipymes) colimenses mediante programas de asesoría, capacitación, vinculación y promoción, que fortalezcan sus capacidades empresariales y contribuyan para el desarrollo económico en el estado.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12 text-center mb-4">
          <h3 className="border-bottom d-inline-block pb-2" style={{ color: 'var(--color-primary)' }}>Áreas y servicios principales</h3>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm custom-border-card">
            <div className="card-body">
              <h5 className="card-title font-weight-bold"><i className="fa fa-lightbulb-o mr-2 fa-lg" style={{ color: 'var(--color-secondary)' }}></i> Centro de Desarrollo Emprendedor</h5>
              <ul className="list-unstyled mt-3">
                <li className="mb-2"><i className="fa fa-check mr-2" style={{ color: 'var(--color-primary)' }}></i> <strong>Charlas, talleres y conferencias</strong> de temas de emprendimiento.</li>
                <li className="mb-2"><i className="fa fa-check mr-2" style={{ color: 'var(--color-primary)' }}></i> <strong>Diagnóstico de necesidades</strong> empresariales.</li>
                <li className="mb-2"><i className="fa fa-check mr-2" style={{ color: 'var(--color-primary)' }}></i> <strong>Asesoría y acompañamiento</strong> para el desarrollo de proyectos y puesta en marcha de negocios.</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm custom-border-card">
            <div className="card-body">
              <h5 className="card-title font-weight-bold"><i className="fa fa-laptop mr-2 fa-lg" style={{ color: 'var(--color-secondary)' }}></i> Capacitación y Digitalización Empresarial</h5>
              <ul className="list-unstyled mt-3">
                <li className="mb-2"><i className="fa fa-check mr-2" style={{ color: 'var(--color-primary)' }}></i> <strong>Emprende en Mercado Libre:</strong> programa que impulsa la venta en línea con capacitación práctica y acompañamiento digital.</li>
                <li className="mb-2"><i className="fa fa-check mr-2" style={{ color: 'var(--color-primary)' }}></i> <strong>Capacitaciones</strong> en temas empresariales, ejemplo: contabilidad, administración, marketing, entre otros.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm custom-border-card">
            <div className="card-body">
              <h5 className="card-title font-weight-bold"><i className="fa fa-bullhorn mr-2 fa-lg" style={{ color: 'var(--color-secondary)' }}></i> Promoción y Comercialización</h5>
              <ul className="list-unstyled mt-3">
                <li className="mb-2"><i className="fa fa-check mr-2" style={{ color: 'var(--color-primary)' }}></i> <strong>Espacios de promoción y venta:</strong> ferias, exposiciones y mercados regionales "Hecho en Colima".</li>
                <li className="mb-2"><i className="fa fa-check mr-2" style={{ color: 'var(--color-primary)' }}></i> <strong>Conexiones comerciales:</strong> vinculación con compradores, cadenas y distribuidores.</li>
                <li className="mb-2"><i className="fa fa-check mr-2" style={{ color: 'var(--color-primary)' }}></i> <strong>Misiones comerciales y networking:</strong> oportunidades de expansión regional y nacional.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow-sm custom-border-card">
            <div className="card-body">
              <h5 className="card-title font-weight-bold"><i className="fa fa-briefcase mr-2 fa-lg" style={{ color: 'var(--color-secondary)' }}></i> Programas y Proyectos MIPYMES</h5>
              <ul className="list-unstyled mt-3">
                <li className="mb-2"><i className="fa fa-check mr-2" style={{ color: 'var(--color-primary)' }}></i> <strong>Asesoría en registro de marca:</strong> orientación gratuita para proteger la identidad de tu negocio ante el IMPI.</li>
                <li className="mb-2"><i className="fa fa-check mr-2" style={{ color: 'var(--color-primary)' }}></i> <strong>Integración a programas</strong> estatales y federales de apoyo, según disponibilidad.</li>
                <li className="mb-2"><i className="fa fa-check mr-2" style={{ color: 'var(--color-primary)' }}></i> <strong>Acompañamiento</strong> para financiamiento y formalización.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 mb-5">
        <div className="col-12 text-center text-md-left">
          <h4 className="font-italic" style={{ color: 'var(--color-primary)' }}>
            <i className="fa fa-quote-left mr-2 text-muted"></i>
            Cuando una idea encuentra acompañamiento, se convierte en empresa. Cuando una empresa encuentra apoyo, se convierte en motor del desarrollo.
            <i className="fa fa-quote-right ml-2 text-muted"></i>
          </h4>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="alert shadow-sm text-center" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
            <h4 className="alert-heading mb-3"><i className="fa fa-phone"></i> Datos de Contacto</h4>
            <hr style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
            <p className="mb-2"><i className="fa fa-volume-control-phone mr-2"></i> <strong>Teléfono:</strong> (312) 31 6 20 00 ext. 24014, 24134, 24141 y 24137</p>
            <p className="mb-2"><i className="fa fa-envelope-o mr-2"></i> <strong>Correo:</strong> mercadointerno.sedeco@gobiernocolima.gob.mx</p>
            <p className="mb-2"><i className="fa fa-map-marker mr-2"></i> <strong>Ubicación:</strong> Complejo Administrativo del Gobierno del Estado de Colima</p>
            <p className="mb-0"><i className="fa fa-globe mr-2"></i> <strong>Web:</strong> https://www.col.gob.mx/economico</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
