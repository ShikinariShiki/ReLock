import React from 'react';
import { Link } from 'react-router-dom';

const DashboardKandidat = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F3F4F6] py-10 px-4">
      <div className="w-full max-w-[1280px] bg-white shadow-2xl overflow-hidden rounded-3xl min-h-screen relative flex flex-col">
        
        {/* ================================== */}
        {/* NAVBAR (DIPERBAIKI: Menu Center)   */}
        {/* ================================== */}
        <nav className="bg-white border-b border-gray-100 h-20 sticky top-0 z-50 relative flex items-center justify-center px-10">
            
            {/* Logo (Posisi Absolute di Kiri) */}
            <div className="absolute left-10 flex items-center gap-3">
                <img src="/images/icon.png" alt="Logo" className="w-8 h-8" />
                <span className="text-2xl font-bold text-gray-900 tracking-tight">RELOCK</span>
            </div>
            
            {/* Menu (Tengah) */}
            <div className="flex items-center gap-2">
                <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-sm font-semibold transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    Homepage
                </Link>
                <Link to="#" className="flex items-center gap-2 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-xl text-sm font-medium transition-colors">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    My List
                </Link>
                <Link to="/profil-kandidat" className="flex items-center gap-2 px-4 py-2.5 text-gray-500 hover:bg-gray-50 rounded-xl text-sm font-medium transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Profile
                </Link>
            </div>

        </nav>

        {/* HERO SECTION */}
        <div className="bg-[#155DFC] px-10 py-16 text-center text-white relative overflow-hidden">
             <div className="relative z-10">
                <h1 className="text-xl font-medium mb-3 opacity-90 tracking-wide">Unlock Your First Opportunity</h1>
                <h2 className="text-4xl font-bold mb-10">Find internships and entry-level positions tailored for students</h2>
                
                <div className="flex justify-center gap-4 flex-wrap">
                    {['No Experience Needed', 'Fresh Graduate', 'Remote Work', '3-6 Months'].map((tag) => (
                        <button key={tag} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-2.5 rounded-full text-sm font-medium transition backdrop-blur-md">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="px-10 py-10 bg-white flex-1">
            
            {/* Search Bar */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <input type="text" className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm" placeholder="Search for job title, company, or keywords..." />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 shadow-sm text-sm font-semibold rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                    Filters
                </button>
            </div>

            {/* Dropdown Row */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                {['Level', 'Work type', 'Durations', 'Locations'].map((filter) => (
                    <div key={filter} className="relative">
                        <select className="block w-full pl-4 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer hover:border-gray-300 transition-colors">
                            <option>{filter}</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* Categories */}
            <div className="flex space-x-3 overflow-x-auto pb-6 mb-2 scrollbar-hide">
                <button className="bg-[#155DFC] text-white px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap shadow-md shadow-blue-200">Semua Pekerjaan</button>
                {['Data & Product', 'BusDev & Sales', 'Design & Creative', 'Marketing & SocMed', 'Finance'].map((cat) => (
                    <button key={cat} className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 px-5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all">{cat}</button>
                ))}
            </div>

            <div className="mb-6 text-sm text-gray-500 font-medium">
                Found <span className="font-bold text-gray-900">124</span> jobs based on your preference
            </div>

            {/* JOB CARDS GRID */}
            <div className="grid grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-xs text-gray-400">Logo</div>
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">Marketing Intern</h3>
                        <p className="text-sm text-gray-500 mb-5 font-medium">Tech Startup Indonesia</p>
                        
                        <div className="space-y-2.5 mb-6">
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                Jakarta, Indonesia
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Full-time • On-site
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                IDR 2.000.000 - 4.000.000
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-md">Marketing</span>
                            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-md">Social Media</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* FOOTER */}
        <footer className="bg-[#0F172A] text-white py-8 px-10 mt-auto text-center text-sm text-gray-500">
            &copy; 2025 Relock. All rights reserved.
        </footer>

      </div>
    </div>
  );
};

export default DashboardKandidat;