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
import Homepage from "./pages/candidate/Homepage.jsx";
import CandidateProfile from "./pages/candidate/CandidateProfile.jsx";

// --- Halaman Rekruter ---
import CreateJob from "./pages/recruiter/CreateJob.jsx";
import RecruiterProfile from "./pages/recruiter/RecruiterProfile.jsx";
import DashboardRecruiter from "./pages/recruiter/DashboardRecruiter.jsx";
import JobApplicants from "./pages/recruiter/JobApplicants.jsx";

// --- Protected Routes ---
import { ProtectedRoute, GuestRoute } from "./components/common/ProtectedRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* === RUTE AUTH (Guest Only) === */}
        <Route path="/register-recruiter" element={<GuestRoute><RegisterRecruiter /></GuestRoute>} />
        <Route path="/register-candidate" element={<GuestRoute><RegisterCandidate /></GuestRoute>} />
        <Route path="/login-candidate" element={<GuestRoute><LoginCandidate /></GuestRoute>} />
        <Route path="/login-recruiter" element={<GuestRoute><LoginRecruiter /></GuestRoute>} />

        {/*  RUTE KANDIDAT (Protected) */}
        <Route path="/" element={<ProtectedRoute allowedRoles={['candidate']}><CandidateLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/homepage-candidate" replace />} />
          <Route path="my-list" element={<MyList />} />
          <Route path="profile-candidate" element={<CandidateProfile />} />
          <Route path="job/:id" element={<JobDetail />} />
          <Route path="homepage-candidate" element={<Homepage />} />
        </Route>

        {/* === RUTE REKRUTER (Protected) === */}
        <Route path="/recruiter" element={<ProtectedRoute allowedRoles={['recruiter']}><RecruiterLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardRecruiter />} />
          <Route path="create-job" element={<CreateJob />} />
          <Route path="profile-recruiter" element={<RecruiterProfile />} />
          <Route path="job-applicants/:jobId" element={<JobApplicants />} />
        </Route>

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/login-candidate" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
