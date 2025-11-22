import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//-- auth --
import RegisterRecruiter from "./pages/auth/RegisterRecruiter.jsx";
import RegisterCandidate from "./pages/auth/RegisterCandidate.jsx";
import LoginRecruiter from "./pages/auth/LoginRecruiter.jsx";
import LoginCandidate from "./pages/auth/LoginCandidate.jsx";
// --- Layouts ---
import CandidateLayout from "./layouts/CandidateLayout.jsx";
import RecruiterLayout from "./layouts/RecruiterLayout.jsx";

// --- Halaman Kandidat ---
import MyList from "./pages/candidate/MyJobList.jsx";
import JobDetail from "./pages/candidate/JobDetail.jsx";

// --- Halaman Rekruter ---
import CreateJob from "./pages/recruiter/CreateJob.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* === RUTE AUTH === */}
        {/* Rute Register Rekruter */}
        <Route path="/register-recruiter" element={<RegisterRecruiter />} />
        {/* Rute Register Kandidat */}
        <Route path="/register-candidate" element={<RegisterCandidate />} />

        {/* Rute Login */}
        <Route path="/login-candidate" element={<LoginCandidate />} />
        <Route path="/login-recruiter" element={<LoginRecruiter />} />

        {/*  RUTE KANDIDAT  */}
        <Route path="/" element={<CandidateLayout />}>
          <Route index element={<Navigate to="/my-list" replace />} />
          <Route path="my-list" element={<MyList />} />

          {/* Rute Detail Lowongan */}
          <Route path="job/:id" element={<JobDetail />} />
        </Route>

        {/* === RUTE REKRUTER === */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route index element={<Navigate to="create-job" replace />} />
          <Route path="create-job" element={<CreateJob />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
