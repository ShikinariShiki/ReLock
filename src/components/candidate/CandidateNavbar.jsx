import { LayoutDashboard, Briefcase, User } from "lucide-react";
import { NavLink } from "react-router-dom"; // <-- 1. Import NavLink

export default function CandidateNavbar() {
  
  // --- 2. style agar rapih ---
  const baseStyle = "flex items-center gap-2 font-medium transition-colors";
  const activeStyle = "text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg";
  const inactiveStyle = "text-gray-500 hover:text-blue-600";

  // Fungsi untuk menggabungkan style
  const getNavLinkClass = ({ isActive }) => {
    return `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`;
  };

  return (
    <nav className="w-full flex items-center justify-between px-10 py-4 bg-white shadow border-b border-gray-100">
      {/* ... logo ... */}
      <div className="flex-1 flex items-center justify-start gap-2">
        <img src="logo.png" className="w-6 h-6" alt="logo relock"></img>
        <span className="font-sans font-bold text-xl text-slate-900 tracking-tight">RELOCK</span>
      </div>

      
      <div className="flex items-center gap-10">
        <NavLink 
          to="/Homepage" 
          className={getNavLinkClass}
        >
          <LayoutDashboard size={20} strokeWidth={2} />
          <span>Homepage</span>
        </NavLink>

        <NavLink 
          to="/my-list" // (Sesuai App.jsx)
          className={getNavLinkClass}
        >
          <Briefcase size={20} strokeWidth={2} />
          <span>My List</span>
        </NavLink>

        <NavLink 
          to="/profile" // (Sesuai App.jsx)
          className={getNavLinkClass}
        >
          <User size={20} strokeWidth={2} />
          <span>Profile</span>
        </NavLink>
      </div>

    
      <div className="flex-1 flex justify-end"></div>
    </nav>
  );
}