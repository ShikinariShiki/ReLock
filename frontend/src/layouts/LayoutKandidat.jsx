import { Outlet } from 'react-router-dom';
import NavbarKandidat from '../components/kandidat/NavbarKandidat.jsx';

// Layout ini akan membungkus semua halaman Kandidat
export default function LayoutKandidat() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarKandidat />
      <Outlet />
    </div>
  );
}