import { Outlet } from 'react-router-dom';
import CandidateNavbar from '../components/candidate/CandidateNavbar.jsx';

// Layout ini akan membungkus semua halaman Kandidat
export default function CandidateLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateNavbar />
      <Outlet />
    </div>
  );
}