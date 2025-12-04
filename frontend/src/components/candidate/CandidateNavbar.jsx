import { LayoutDashboard, Briefcase, User, LogOut } from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";

export default function CandidateNavbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login-candidate');
  };

  // --- Style Helper ---
  const baseStyle = "flex items-center gap-2 font-medium transition-all duration-200";
  const activeStyle = "text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg";
  const inactiveStyle = "text-gray-500 hover:text-blue-600";

  const getNavLinkClass = ({ isActive }) => {
    return `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`;
  };

  return (
    <nav className="w-full flex items-center justify-between px-10 py-4 bg-white shadow border-b border-gray-100 sticky top-0 z-50">
      {/* 1. LOGO */}
      <div className="flex-1 flex items-center justify-start gap-2">
        <img src="/logo.png" className="w-6 h-6" alt="logo relock" />
        <span className="font-sans font-bold text-xl text-slate-900 tracking-tight">
          RELOCK
        </span>
      </div>

      {/* 2. MENU TENGAH */}
      <div className="flex items-center gap-8">
        {/* Homepage selalu muncul untuk semua */}
        <NavLink to="/homepage-candidate" className={getNavLinkClass}>
          <LayoutDashboard size={20} strokeWidth={2} />
          <span>Homepage</span>
        </NavLink>

        {/* Menu Khusus User yang Sudah Login */}
        {isAuthenticated && (
          <>
            <NavLink to="/my-list" className={getNavLinkClass}>
              <Briefcase size={20} strokeWidth={2} />
              <span>My List</span>
            </NavLink>

            <NavLink to="/profile-candidate" className={getNavLinkClass}>
              <User size={20} strokeWidth={2} />
              <span>Profile</span>
            </NavLink>
          </>
        )}
      </div>

      {/* 3. MENU KANAN (AUTH BUTTONS) */}
      <div className="flex-1 flex justify-end items-center gap-3">
        {isAuthenticated ? (
          // Tampilan Kanan jika SUDAH Login
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-all duration-200"
            >
              <span className="text-sm text-gray-600">Hi, {user?.name?.split(' ')[0] || 'User'}</span>
              {user?.photo_url ? (
                <img 
                  src={user.photo_url} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
                />
              ) : (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
            </button>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fade-in">
                <Link 
                  to="/profile-candidate" 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <User size={16} />
                  My Profile
                </Link>
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
        ) : (
          // Tampilan Kanan jika BELUM Login (Guest)
          <>
            <Link
              to="/login-candidate"
              className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-blue-600 transition"
            >
              Log In
            </Link>
            <Link
              to="/register-candidate"
              className="px-5 py-2 text-sm font-bold text-white bg-[#155DFC] rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
