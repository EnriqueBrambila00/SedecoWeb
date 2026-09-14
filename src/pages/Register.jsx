import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar el usuario');
      }

      setSuccess('¡Usuario creado con éxito! Redirigiendo al login...');
      
      // Esperar 2 segundos antes de redirigir al login
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-content d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="container" data-aos="fade-up">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div className="card-header text-white text-center py-4" style={{ backgroundColor: 'var(--color-primary)' }}>
                <h3 className="mb-0 font-weight-bold">Crear Cuenta</h3>
                <p className="mb-0 text-white-50" style={{ fontSize: '0.9rem' }}>Portal de SEDECO Colima</p>
              </div>
              <div className="card-body p-4 p-md-5" style={{ backgroundColor: 'var(--color-surface)' }}>
                
                {error && (
                  <div className="alert alert-danger text-center" role="alert">
                    <i className="fa fa-exclamation-circle mr-2"></i>
                    {error}
                  </div>
                )}

                {success && (
                  <div className="alert alert-success text-center" role="alert">
                    <i className="fa fa-check-circle mr-2"></i>
                    {success}
                  </div>
                )}

                <form onSubmit={handleRegister}>
                  <div className="form-group mb-4">
                    <label htmlFor="nombre" className="font-weight-bold" style={{ color: 'var(--color-primary)' }}>
                      Nombre Completo
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white" style={{ borderColor: 'var(--color-secondary)' }}>
                          <i className="fa fa-user" style={{ color: 'var(--color-primary)' }}></i>
                        </span>
                      </div>
                      <input 
                        type="text" 
                        className="form-control border-left-0" 
                        id="nombre" 
                        placeholder="Juan Pérez"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        style={{ borderColor: 'var(--color-secondary)' }}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <label htmlFor="correo" className="font-weight-bold" style={{ color: 'var(--color-primary)' }}>
                      Correo Electrónico
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white" style={{ borderColor: 'var(--color-secondary)' }}>
                          <i className="fa fa-envelope" style={{ color: 'var(--color-primary)' }}></i>
                        </span>
                      </div>
                      <input 
                        type="email" 
                        className="form-control border-left-0" 
                        id="correo" 
                        placeholder="tu@correo.com"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                        style={{ borderColor: 'var(--color-secondary)' }}
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <label htmlFor="password" className="font-weight-bold" style={{ color: 'var(--color-primary)' }}>
                      Contraseña
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text bg-white" style={{ borderColor: 'var(--color-secondary)' }}>
                          <i className="fa fa-lock" style={{ color: 'var(--color-primary)' }}></i>
                        </span>
                      </div>
                      <input 
                        type="password" 
                        className="form-control border-left-0" 
                        id="password" 
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ borderColor: 'var(--color-secondary)' }}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-block btn-lg mt-4 font-weight-bold text-white shadow"
                    disabled={loading || success !== ''}
                    style={{ backgroundColor: 'var(--color-secondary)', borderRadius: '30px' }}
                  >
                    {loading ? (
                      <span><i className="fa fa-spinner fa-spin mr-2"></i> Creando...</span>
                    ) : (
                      <span>Registrarse <i className="fa fa-user-plus ml-2"></i></span>
                    )}
                  </button>
                  
                  <div className="text-center mt-4">
                    <Link to="/login" className="font-weight-bold" style={{ color: 'var(--color-primary)' }}>
                      ¿Ya tienes cuenta? Inicia sesión
                    </Link>
                  </div>
                </form>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
