import { LayoutDashboard, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import RecruiterProfile from '../../pages/recruiter/RecruiterProfile';

export default function RecruiterNavbar() {
  
  // --- STYLE HELPER (Disamakan dengan CandidateNavbar) ---
  const baseStyle = "flex items-center gap-2 font-medium transition-colors";
  const activeStyle = "text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg";
  const inactiveStyle = "text-gray-500 hover:text-blue-600";

  // Fungsi logika NavLink (Active vs Inactive)
  const getNavLinkClass = ({ isActive }) => {
    return `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`;
  };

  return (
    <nav className="w-full flex items-center justify-between px-10 py-4 bg-white shadow border-b border-gray-100 sticky top-0 z-50">
      {/* Kiri: Logo */}
      <div className="flex-1 flex items-center justify-start gap-2">
        <img src="/logo.png" className="w-6 h-6" alt="logo relock" />
        <span className="font-sans font-bold text-xl text-slate-900 tracking-tight">RELOCK</span>
      </div>
      
      {/* Tengah: Menu */}
      <div className="flex items-center gap-10">
        <NavLink 
          to="/recruiter/dashboard-recruiter" 
          className={getNavLinkClass}
        >
          <LayoutDashboard size={20} strokeWidth={2} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/recruiter/profile-recruiter" 
          className={getNavLinkClass}
        >
          <User size={20} strokeWidth={2} />
          <span>Profile</span>
        </NavLink>
      </div>
      
      {/* Kanan: Kosong (Penyeimbang layout flex) */}
      <div className="flex-1 flex justify-end"></div>
    </nav>
  );
}