import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      // Guardar el token y la info del usuario en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      // Redirigir al inicio o a un panel de control
      window.dispatchEvent(new Event('storage')); // Para que el Navbar se actualice
      navigate('/');
      
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
                <h3 className="mb-0 font-weight-bold">Iniciar Sesión</h3>
                <p className="mb-0 text-white-50" style={{ fontSize: '0.9rem' }}>Portal de SEDECO Colima</p>
              </div>
              <div className="card-body p-4 p-md-5" style={{ backgroundColor: 'var(--color-surface)' }}>
                
                {error && (
                  <div className="alert alert-danger text-center" role="alert">
                    <i className="fa fa-exclamation-circle mr-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
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
                    disabled={loading}
                    style={{ backgroundColor: 'var(--color-secondary)', borderRadius: '30px' }}
                  >
                    {loading ? (
                      <span><i className="fa fa-spinner fa-spin mr-2"></i> Cargando...</span>
                    ) : (
                      <span>Entrar al Sistema <i className="fa fa-arrow-right ml-2"></i></span>
                    )}
                  </button>
                </form>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
