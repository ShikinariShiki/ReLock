import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Layouts ---
// (Pastikan Anda sudah punya kedua file ini di src/layouts/)
import CandidateLayout from './layouts/CandidateLayout.jsx';
import RecruiterLayout from './layouts/RecruiterLayout.jsx';

// --- Halaman Kandidat ---
// (Pastikan file ini ada di src/pages/candidate/)
import MyList from './pages/candidate/MyJobList.jsx';
// import Profile from './pages/candidate/Profile.jsx'; // (Nanti bisa ditambah)
// import Dashboard from './pages/candidate/Dashboard.jsx'; // (Nanti bisa ditambah)

// --- Halaman Rekruter ---
// (Pastikan file ini ada di src/pages/recruiter/)
import CreateJob from './pages/recruiter/CreateJob.jsx';
// import RecruiterDashboard from './pages/recruiter/Dashboard.jsx'; // (Nanti bisa ditambah)

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* === RUTE KANDIDAT === */}
        {/* Semua rute di dalam sini akan punya Navbar Kandidat */}
        <Route path="/" element={<CandidateLayout />}>
          {/* Alamat '/' akan otomatis redirect ke '/my-list' */}
          <Route index element={<Navigate to="/my-list" replace />} /> 
          <Route path="my-list" element={<MyList />} />
          {/* <Route path="profile" element={<Profile />} /> */}
        </Route>

        {/* === RUTE REKRUTER === */}
        {/* Semua rute di dalam sini akan punya Navbar Rekruter */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          {/* Alamat '/recruiter' akan otomatis redirect ke '/recruiter/create-job' */}
          <Route index element={<Navigate to="create-job" replace />} /> 
          <Route path="create-job" element={<CreateJob />} />
          {/* <Route path="dashboard" element={<RecruiterDashboard />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}