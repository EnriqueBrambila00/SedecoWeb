import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/Navbar'
import SedecoNavbar from './components/SedecoNavbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Programas from './pages/Programas'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

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
        <Navbar />
        <SedecoNavbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programas" element={<Programas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
