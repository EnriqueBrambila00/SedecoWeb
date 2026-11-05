import React, { useEffect } from "react";
import AOS from "aos";

const ContactoSedeco = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: false, easing: "ease-out-cubic" });
  }, []);

  const canalesContacto = [
    {
      titulo: "Teléfono Principal",
      icono: "fa-phone",
      detalle: "312 316 2000",
      subdetalle: "Extensiones: 24101 o 24004",
      accionTexto: "Llamar ahora",
      accionIcono: "fa-volume-control-phone",
      href: "tel:3123162000",
      externo: false,
    },
    {
      titulo: "Correo Electrónico",
      icono: "fa-envelope-o",
      detalle: "desarrolloeconomico.colima@gmail.com",
      subdetalle: "Atención a dudas, trámites y asesorías",
      accionTexto: "Enviar correo",
      accionIcono: "fa-paper-plane-o",
      href: "mailto:desarrolloeconomico.colima@gmail.com",
      externo: false,
    },
    {
      titulo: "Página Web Oficial",
      icono: "fa-globe",
      detalle: "www.col.gob.mx/economico",
      subdetalle: "Portal oficial de la Secretaría de Desarrollo Económico",
      accionTexto: "Visitar sitio web",
      accionIcono: "fa-external-link",
      href: "https://www.col.gob.mx/economico",
      externo: true,
    },
    {
      titulo: "Horario de Atención",
      icono: "fa-clock-o",
      detalle: "Lunes a Viernes",
      subdetalle: "8:30 a 16:30 hrs.",
      accionTexto: "Directorio Integral",
      accionIcono: "fa-address-book-o",
      href: "https://directoriointegral.col.gob.mx/v3/",
      externo: true,
    },
  ];

  return (
    <main className="main-content container py-5 overflow-hidden" style={{ minHeight: "80vh" }}>
      {/* Encabezado */}
      <div className="row mb-5" data-aos="fade-down">
        <div className="col-12 text-center">
          <span
            className="badge px-3 py-2 mb-3 text-white shadow-sm"
            style={{
              backgroundColor: "var(--color-secondary)",
              borderRadius: "20px",
              fontSize: "0.85rem",
              letterSpacing: "0.5px",
            }}
          >
            <i className="fa fa-building-o mr-2"></i>ATENCIÓN CIUDADANA Y EMPRESARIAL
          </span>
          <h1 className="display-4 font-weight-bold mb-3" style={{ color: "var(--color-primary)" }}>
            Contacto SEDECO
          </h1>
          <p className="lead mx-auto" style={{ color: "var(--color-text)", maxWidth: "700px" }}>
            Estamos para escucharte y brindarte acompañamiento en los programas, trámites y servicios de la{" "}
            <strong>Secretaría de Desarrollo Económico del Estado de Colima</strong>.
          </p>
          <div
            className="mx-auto mt-3"
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "var(--color-secondary)",
              borderRadius: "2px",
            }}
          ></div>
        </div>
      </div>

      {/* Tarjetas de Canales de Contacto */}
      <div className="row mb-5">
        {canalesContacto.map((item, idx) => (
          <div
            className="col-md-6 col-lg-3 mb-4"
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            <div className="card h-100 shadow-sm border-0 custom-border-card text-center p-3">
              <div className="card-body d-flex flex-column align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center mb-3 shadow-sm"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(127, 40, 65, 0.1)",
                    border: "2px solid var(--color-secondary)",
                  }}
                >
                  <i
                    className={`fa ${item.icono} fa-2x`}
                    style={{ color: "var(--color-primary)" }}
                    aria-hidden="true"
                  ></i>
                </div>

                <h5 className="font-weight-bold mb-2" style={{ color: "var(--color-primary)" }}>
                  {item.titulo}
                </h5>

                <p
                  className="font-weight-bold mb-1"
                  style={{
                    color: "var(--color-text)",
                    fontSize: "0.95rem",
                    wordBreak: "break-word",
                  }}
                >
                  {item.detalle}
                </p>

                <p className="text-muted small mb-4 flex-grow-1">{item.subdetalle}</p>

                <a
                  href={item.href}
                  target={item.externo ? "_blank" : undefined}
                  rel={item.externo ? "noreferrer" : undefined}
                  className="btn btn-sm text-white font-weight-bold px-3 py-2 w-100 shadow-sm mt-auto"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    borderRadius: "25px",
                  }}
                >
                  <i className={`fa ${item.accionIcono} mr-2`} aria-hidden="true"></i>
                  {item.accionTexto}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de Ubicación y Mapa */}
      <div className="row" data-aos="fade-up" data-aos-delay="200">
        <div className="col-12">
          <div
            className="card shadow-lg border-0 overflow-hidden"
            style={{ borderRadius: "16px", backgroundColor: "var(--color-surface)" }}
          >
            <div
              className=" py-3 px-4 text-white d-flex align-items-center justify-content-between flex-wrap"
              style={{
                backgroundColor: "var(--color-primary)",
                borderBottom: "4px solid var(--color-secondary)",
              }}
            >
              <h4 className="mb-0 font-weight-bold">
                <i className="fa fa-map-marker mr-2" style={{ color: "var(--color-secondary)" }}></i>
                Ubicación e Instalaciones
              </h4>
              <span className="small text-white-50">Complejo Administrativo del Gobierno del Estado</span>
            </div>

            <div className="card-body p-4 p-md-5">
              <div className="row align-items-center">
                <div className="col-lg-5 mb-4 mb-lg-0">
                  <h5 className="font-weight-bold mb-3" style={{ color: "var(--color-primary)" }}>
                    Dirección Oficial
                  </h5>
                  <p className="mb-4" style={{ color: "var(--color-text)", lineHeight: "1.7", fontSize: "1.05rem" }}>
                    <i
                      className="fa fa-location-arrow mr-2"
                      style={{ color: "var(--color-secondary)" }}
                    ></i>
                    3er. Anillo Periférico esq. con Ejército Mexicano s/n, Col. El Diezmo,{" "}
                    <strong>Edificio &quot;A&quot;</strong>, Colima, Colima (C.P. 28010).
                  </p>

                  <div
                    className="p-3 rounded mb-4"
                    style={{
                      backgroundColor: "rgba(188, 149, 92, 0.12)",
                      borderLeft: "4px solid var(--color-secondary)",
                    }}
                  >
                    <p className="mb-1 font-weight-bold" style={{ color: "var(--color-primary)" }}>
                      <i className="fa fa-info-circle mr-2"></i>Horario de atención presencial
                    </p>
                    <p className="mb-0 small" style={{ color: "var(--color-text)" }}>
                      Lunes a viernes de <strong>8:30 a 16:30 hrs.</strong>
                    </p>
                  </div>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Complejo+Administrativo+del+Gobierno+del+Estado+de+Colima"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-lg text-white font-weight-bold shadow-sm w-100"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      borderRadius: "30px",
                      fontSize: "0.95rem",
                    }}
                  >
                    <i className="fa fa-map-o mr-2"></i>Cómo llegar en Google Maps
                  </a>
                </div>

                <div className="col-lg-7">
                  <div
                    className="rounded overflow-hidden shadow-sm"
                    style={{
                      border: "2px solid var(--color-border)",
                      height: "320px",
                    }}
                  >
                    <iframe
                      title="Ubicación SEDECO Colima"
                      src="https://www.google.com/maps?q=Complejo+Administrativo+del+Gobierno+del+Estado+de+Colima&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactoSedeco;
