import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Semua Halaman
import LoginKandidat from './pages/LoginKandidat';
import LoginRekruter from './pages/LoginRekruter';
import RegisterKandidat from './pages/RegisterKandidat';
import DashboardKandidat from './pages/DashboardKandidat';
import ProfilKandidat from './pages/ProfilKandidat'; 
import ProfilRekruter from './pages/ProfilRekruter'
import RegisterRekruter from './pages/RegisterRekruter'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login-kandidat" replace />} />
        
        {/* Auth */}
        <Route path="/login-kandidat" element={<LoginKandidat />} />
        <Route path="/login-rekruter" element={<LoginRekruter />} />
        <Route path="/register-kandidat" element={<RegisterKandidat />} />
        <Route path="/register-rekruter" element={<RegisterRekruter />} />
        
        {/* Fitur */}
        <Route path="/dashboard" element={<DashboardKandidat />} />
        <Route path="/profil-kandidat" element={<ProfilKandidat />} />
        <Route path="/profil-rekruter" element={<ProfilRekruter />} />
        
      </Routes>
    </Router>
  );
}

export default App;