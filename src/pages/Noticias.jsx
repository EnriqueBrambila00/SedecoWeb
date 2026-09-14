import React, { useEffect, useState } from 'react';
import AOS from 'aos';

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
    const fetchNoticias = async () => {
      try {
        // Al no pasar ?all=true, el backend solo regresa las de estatus "Activo"
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/noticias`);
        if (response.ok) {
          const data = await response.json();
          setNoticias(data);
        }
      } catch (error) {
        console.error("Error al cargar las noticias", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNoticias();
  }, []);

  return (
    <main className="main-content container py-5" style={{ minHeight: '80vh' }}>
      <div className="text-center mb-5" data-aos="fade-down">
        <h1 className="display-4 font-weight-bold" style={{ color: 'var(--color-primary)' }}>Noticias y Novedades</h1>
        <p className="lead" style={{ color: 'var(--color-text)' }}>Entérate de lo último que está pasando en SEDECO.</p>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" style={{ color: 'var(--color-secondary)' }} role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      ) : noticias.length === 0 ? (
        <div className="text-center" data-aos="fade-in">
          <h4 style={{ color: 'var(--color-text)' }}>Por el momento no hay noticias disponibles.</h4>
        </div>
      ) : (
        <div className="row">
          {noticias.map((noticia, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={noticia.id_noticia} data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="card h-100 shadow-sm border-0 custom-border-card" style={{ backgroundColor: 'var(--color-surface)', overflow: 'hidden' }}>
                {noticia.url_imagen && (
                  <img 
                    src={noticia.url_imagen} 
                    className="card-img-top" 
                    alt={noticia.titulo} 
                    style={{ height: '200px', objectFit: 'cover' }} 
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title font-weight-bold" style={{ color: 'var(--color-primary)' }}>{noticia.titulo}</h5>
                  <p className="text-muted small mb-3">
                    <i className="fa fa-calendar mr-2"></i>
                    {new Date(noticia.fecha_publicacion).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="card-text flex-grow-1" style={{ color: 'var(--color-text)', whiteSpace: 'pre-wrap' }}>
                    {noticia.contenido}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Noticias;
