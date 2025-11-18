import { Outlet } from "react-router-dom";
import RecruiterNavbar from "../components/recruiter/RecruiterNavbar.jsx";

export default function RecruiterLayout() {
  return (
    <div>
      <RecruiterNavbar />
      <Outlet />
    </div>
  );
}
