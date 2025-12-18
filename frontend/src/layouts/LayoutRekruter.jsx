import { Outlet } from "react-router-dom";
import NavbarRekruter from "../components/rekruter/NavbarRekruter.jsx";

export default function LayoutRekruter() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarRekruter />
      <Outlet />
    </div>
  );
}
