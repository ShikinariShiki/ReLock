import { Outlet } from "react-router-dom";
import RecruiterNavbar from "../components/recruiter/RecruiterNavbar.jsx";

export default function RecruiterLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNavbar />
      <Outlet />
    </div>
  );
}
