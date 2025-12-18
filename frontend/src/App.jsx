import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//-- auth --
import DaftarRekruter from "./pages/auth/DaftarRekruter.jsx";
import DaftarKandidat from "./pages/auth/DaftarKandidat.jsx";
import LoginRekruter from "./pages/auth/LoginRekruter.jsx";
import LoginKandidat from "./pages/auth/LoginKandidat.jsx";
// --- Layouts ---
import LayoutKandidat from "./layouts/LayoutKandidat.jsx";
import LayoutRekruter from "./layouts/LayoutRekruter.jsx";

// --- Halaman Kandidat ---
import DaftarLamaranSaya from "./pages/kandidat/DaftarLamaranSaya.jsx";
import DetailLowongan from "./pages/kandidat/DetailLowongan.jsx";
import Beranda from "./pages/kandidat/Beranda.jsx";
import ProfilKandidat from "./pages/kandidat/ProfilKandidat.jsx";

// --- Halaman Rekruter ---
import BuatLowongan from "./pages/rekruter/BuatLowongan.jsx";
import ProfilRekruter from "./pages/rekruter/ProfilRekruter.jsx";
import DashboardRekruter from "./pages/rekruter/DashboardRekruter.jsx";
import PelamarLowongan from "./pages/rekruter/PelamarLowongan.jsx";

// --- Protected Routes ---
import { ProtectedRoute, GuestRoute } from "./components/common/ProtectedRoute.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* === RUTE AUTH (Guest Only) === */}
      <Route path="/register-recruiter" element={<GuestRoute><DaftarRekruter /></GuestRoute>} />
      <Route path="/register-candidate" element={<GuestRoute><DaftarKandidat /></GuestRoute>} />
      <Route path="/login-candidate" element={<GuestRoute><LoginKandidat /></GuestRoute>} />
      <Route path="/login-recruiter" element={<GuestRoute><LoginRekruter /></GuestRoute>} />

      {/*  RUTE KANDIDAT (Protected) */}
      <Route path="/" element={<ProtectedRoute allowedRoles={['kandidat']}><LayoutKandidat /></ProtectedRoute>}>
        <Route index element={<Navigate to="/homepage-candidate" replace />} />
        <Route path="my-list" element={<DaftarLamaranSaya />} />
        <Route path="profile-candidate" element={<ProfilKandidat />} />
        <Route path="job/:id" element={<DetailLowongan />} />
        <Route path="homepage-candidate" element={<Beranda />} />
      </Route>

      {/* === RUTE REKRUTER (Protected) === */}
      <Route path="/recruiter" element={<ProtectedRoute allowedRoles={['rekruter']}><LayoutRekruter /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardRekruter />} />
        <Route path="create-job" element={<BuatLowongan />} />
        <Route path="profile-recruiter" element={<ProfilRekruter />} />
        <Route path="job-applicants/:jobId" element={<PelamarLowongan />} />
      </Route>

      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/login-candidate" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
