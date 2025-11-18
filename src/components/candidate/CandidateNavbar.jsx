import {LayoutDashboard, Briefcase, User } from "lucide-react";
export default function CandidateNavbar() {
    return (
        <nav className="w-full flex items-center px-24 py-4 bg-white shadow">

            {/*kiri: Logo Relock*/}
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <img src="/logo.png" className="w-10 h-10" alt="logo relock"></img>
                    <span className="font-inter font-bold text-[20px]">RELOCK</span>
                </div>
            </div>

            {/*Tengah: menu */}
            <div className="flex-1 flex justify-center items-center gap-10 text-gray-700 text-[16px]">

                {/* Dashboard */}
                <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition">
                    <LayoutDashboard size={18}/>
                    <span>Dashboard</span>
                </a>

                {/* My List */}
                <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition">
                    <Briefcase size={18}/>
                    <span>My List</span>
                </a>

                {/* Profile */}
                <a href="#" className="flex items-center gap-2 hover:text-blue-600 transition">
                    <User size={18}/>
                    <span>Profile</span>
                </a>
            </div>
            <div className="flex-1"></div>

        </nav>
    )
}