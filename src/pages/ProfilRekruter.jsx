import React from 'react';
import { Link } from 'react-router-dom';

const ProfilRekruter = () => {
  return (
    <div className="flex items-center justify-center min-h-screen py-8 bg-[#F9FAFB]">
      <div className="w-[1039px] mx-auto overflow-hidden rounded-2xl shadow-xl bg-white min-h-[900px]">

        {/* NAVBAR */}
        <nav className="bg-white border-b border-gray-100 h-16 relative flex items-center justify-center">
            <div className="absolute left-8 flex items-center gap-2">
                <img className="h-8 w-auto" src="/images/Icon1.png" alt="Relock Logo" />
                <span className="text-2xl font-bold text-gray-900">RELOCK</span>
            </div>
            <div className="flex items-center space-x-8">
                <Link to="#" className="text-gray-500 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium transition">Dashboard</Link>
                <Link to="/profil-rekruter" className="text-blue-600 bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition">Profile</Link>
            </div>
        </nav>

        {/* KONTEN UTAMA */}
        <main className="bg-white py-8 px-8 space-y-6">

            {/* HEADER PERUSAHAAN */}
            <div className="p-8 rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-start gap-6">
                    <div className="w-32 h-32 bg-gray-50 border border-gray-200 rounded-2xl flex-shrink-0 flex items-center justify-center">
                        <span className="text-gray-400">Logo</span>
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-gray-900">TechVision Indonesia</h1>
                            <button className="text-gray-400 hover:text-gray-600">✏️</button>
                        </div>

                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
                            Technology
                        </span>

                        <p className="text-gray-600 text-base mb-6 leading-relaxed">
                            Building the future of digital innovation in Southeast Asia through cutting-edge software solutions.
                        </p>

                        <div className="flex items-center gap-8 text-sm text-gray-600">
                            <div className="flex items-center gap-2"><span>✉️</span> hr@techvision.co.id</div>
                            <div className="flex items-center gap-2"><span>🌐</span> www.techvision.co.id</div>
                            <div className="flex items-center gap-2"><span>📞</span> +62 21-1234-5678</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DESKRIPSI */}
            <div className="p-8 rounded-2xl border border-gray-200 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Description</h3>
                <p className="text-gray-600 leading-relaxed text-base">
                    TechVision Indonesia is a leading technology company specializing in digital transformation. We help businesses across Southeast Asia leverage cutting-edge technology to achieve their goals.
                </p>
            </div>

            {/* VISI & MISI */}
            <div className="p-8 rounded-2xl border border-gray-200 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Vision & Mission</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="text-base font-semibold text-gray-900 mb-2">Vision</h4>
                        <p className="text-gray-600 leading-relaxed text-base">
                            To become the most trusted technology partner in Southeast Asia.
                        </p>
                    </div>
                    <hr className="border-gray-100" />
                    <div>
                        <h4 className="text-base font-semibold text-gray-900 mb-2">Mission</h4>
                        <p className="text-gray-600 leading-relaxed text-base">
                            We are committed to delivering excellence through innovation, collaboration, and continuous learning.
                        </p>
                    </div>
                </div>
            </div>

        </main>

      </div>
    </div>
  );
};

export default ProfilRekruter;