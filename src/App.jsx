import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/Navbar'
import SedecoNavbar from './components/SedecoNavbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Programas from './pages/Programas'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardSuperAdmin from './pages/DashboardSuperAdmin'
import DashboardAdmin from './pages/DashboardAdmin'
import './App.css'

// Componente para proteger las rutas
const ProtectedRoute = ({ children, allowedRoles }) => {
  const usuarioInfo = localStorage.getItem('usuario');
  if (!usuarioInfo) {
    return <Navigate to="/login" replace />;
  }
  
  const usuario = JSON.parse(usuarioInfo);
  if (allowedRoles && !allowedRoles.includes(usuario.id_rol)) {
    return <Navigate to="/" replace />; // Redirigir al inicio si no tiene el rol
  }
  
  return children;
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-out-cubic',
    })
  }, [])

  return (
    <Router>
      <div className="app-container">
        {/* El Navbar no debe verse si estamos en un dashboard (opcional, pero sugerido para paneles administrativos limpios) */}
        <Routes>
          <Route path="/dashboard-superadmin" element={null} />
          <Route path="/dashboard-admin" element={null} />
          <Route path="*" element={<><Navbar /><SedecoNavbar /></>} />
        </Routes>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programas" element={<Programas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/dashboard-superadmin" 
            element={
              <ProtectedRoute allowedRoles={[1]}>
                <DashboardSuperAdmin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard-admin" 
            element={
              <ProtectedRoute allowedRoles={[1, 2]}>
                <DashboardAdmin />
              </ProtectedRoute>
            } 
          />
        </Routes>

        <Routes>
          <Route path="/dashboard-superadmin" element={null} />
          <Route path="/dashboard-admin" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
