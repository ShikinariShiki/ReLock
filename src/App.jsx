import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Layouts ---
import CandidateLayout from './layouts/CandidateLayout.jsx';
import RecruiterLayout from './layouts/RecruiterLayout.jsx';

// --- Halaman Kandidat ---
import MyList from './pages/candidate/MyJobList.jsx';
import JobDetail from './pages/candidate/JobDetail.jsx'; // <-- (BARU) Tambahkan ini
// import Profile from './pages/candidate/Profile.jsx';
// import Dashboard from './pages/candidate/Dashboard.jsx';

// --- Halaman Rekruter ---
import CreateJob from './pages/recruiter/CreateJob.jsx';
// import RecruiterDashboard from './pages/recruiter/Dashboard.jsx';

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
          
          {/* (BARU) Rute Detail Lowongan */}
          {/* :id artinya dinamis, bisa /job/1, /job/123, dll */}
          <Route path="job/:id" element={<JobDetail />} /> 
          
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