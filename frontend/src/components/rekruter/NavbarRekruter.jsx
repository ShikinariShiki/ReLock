import { LayoutDashboard, User, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useState } from 'react';

export default function RecruiterNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login-recruiter');
  };

  // --- STYLE HELPER ---
  const baseStyle = "flex items-center gap-2 font-medium transition-all duration-200";
  const activeStyle = "text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg";
  const inactiveStyle = "text-gray-500 hover:text-blue-600";

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
          to="/recruiter/dashboard" 
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
      
      {/* Kanan: User Menu */}
      <div className="flex-1 flex justify-end items-center gap-3">
        {/* User Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-all duration-200"
          >
            <span className="text-sm text-gray-600">
              {user?.recruiter?.company_name || user?.name || 'Company'}
            </span>
            {user?.photo_url ? (
              <img 
                src={user.photo_url} 
                alt="Company Logo" 
                className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
              />
            ) : (
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                {user?.recruiter?.company_name?.charAt(0)?.toUpperCase() || 'C'}
              </div>
            )}
          </button>
          
          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fade-in">
              <NavLink 
                to="/recruiter/profile-recruiter" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <User size={16} />
                Company Profile
              </NavLink>
              <hr className="my-2 border-gray-100" />
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}