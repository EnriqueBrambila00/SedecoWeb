import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SedecoNavbar from './components/SedecoNavbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Programas from './pages/Programas'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <SedecoNavbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programas" element={<Programas />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
