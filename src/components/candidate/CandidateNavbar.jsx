import { LayoutDashboard, Briefcase, User, LogIn } from "lucide-react";
import { NavLink, Link } from "react-router-dom"; 

export default function CandidateNavbar() {
  
  // --- SIMULASI STATUS LOGIN ---
  // Ubah menjadi 'true' untuk melihat tampilan saat sudah login
  // Ubah menjadi 'false' untuk melihat tampilan tamu (Guest)
  const isLoggedIn = true; 

  // --- Style Helper ---
  const baseStyle = "flex items-center gap-2 font-medium transition-colors";
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
        <span className="font-sans font-bold text-xl text-slate-900 tracking-tight">RELOCK</span>
      </div>

      {/* 2. MENU TENGAH */}
      <div className="flex items-center gap-8">
        {/* Homepage selalu muncul untuk semua */}
        <NavLink 
          to="/homepage-candidate" 
          className={getNavLinkClass}
        >
          <LayoutDashboard size={20} strokeWidth={2} />
          <span>Homepage</span>
        </NavLink>

        {/* Menu Khusus User yang Sudah Login */}
        {isLoggedIn && (
          <>
            <NavLink 
              to="/my-list" 
              className={getNavLinkClass}
            >
              <Briefcase size={20} strokeWidth={2} />
              <span>My List</span>
            </NavLink>

            <NavLink 
              to="/profile-candidate" 
              className={getNavLinkClass}
            >
              <User size={20} strokeWidth={2} />
              <span>Profile</span>
            </NavLink>
          </>
        )}
      </div>

      {/* 3. MENU KANAN (AUTH BUTTONS) */}
      <div className="flex-1 flex justify-end gap-3">
        {isLoggedIn ? (
          // Tampilan Kanan jika SUDAH Login (Opsional: Logout Button / Avatar Kecil)
          <div className="flex items-center gap-3">
             <span className="text-sm text-gray-500">Hi, User</span>
             <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                U
             </div>
          </div>
        ) : (
          // Tampilan Kanan jika BELUM Login (Guest)
          <>
            <Link 
              to="/login-candidate"
              className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-blue-600 transition"
            >
              Masuk
            </Link>
            <Link 
              to="/register-candidate"
              className="px-5 py-2 text-sm font-bold text-white bg-[#155DFC] rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              Daftar
            </Link>
          </>
        )}
      </div>

    </nav>
  );
}