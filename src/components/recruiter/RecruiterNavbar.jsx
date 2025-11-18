import { LayoutDashboard, User } from 'lucide-react';
import React from 'react';

// Navbar ini sesuai dengan yang ada di gambar (hanya Dashboard & Profile)
export default function RecruiterNavbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-10 py-4 flex items-center justify-between">
      {/* Kiri: Logo */}
      <div className="flex-1 flex items-center justify-start gap-2">
        <img src="/logo.png" className="w-6 h-6" alt="logo relock"></img>
        <span className="font-bold text-xl text-slate-900">RELOCK</span>
      </div>
      
      {/* Tengah: Menu */}
      <div className="flex-1 flex justify-center gap-8">
        <a href="#" className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
          <LayoutDashboard size={18} /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900">
          <User size={18} /> Profile
        </a>
      </div>
      
      {/* Kanan: Kosong (Penyeimbang) */}
      <div className="flex-1 justify-end"></div>
    </nav>
  );
}