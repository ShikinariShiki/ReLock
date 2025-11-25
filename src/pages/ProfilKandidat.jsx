import React from 'react';
import { Link } from 'react-router-dom';

const ProfilKandidat = () => {
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
                <Link to="/dashboard" className="text-gray-500 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium transition">Dashboard</Link>
                <Link to="#" className="text-gray-500 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium transition">My List</Link>
                <Link to="/profil-kandidat" className="text-blue-600 bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium transition">Profile</Link>
            </div>
        </nav>

        {/* KONTEN UTAMA */}
        <main className="bg-white py-8 px-8">
            <div className="grid grid-cols-12 gap-8">

                {/* SIDEBAR KIRI (FOTO & INFO) */}
                <div className="col-span-4">
                    <div className="p-6 rounded-2xl border border-gray-200 bg-white">
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mb-4">
                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                            <p className="text-sm text-gray-500">Junior UI/UX Designer</p>
                            
                            <button className="mt-5 w-full flex justify-center items-center px-4 py-2 rounded-lg bg-[#155DFC] text-white font-medium text-sm hover:bg-blue-700 transition">
                                Edit Profile
                            </button>
                        </div>

                        <hr className="my-6 border-gray-100" />

                        <div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">About</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Passionate designer with 1+ years of experience creating intuitive and beautiful user experiences.
                            </p>
                        </div>

                        <hr className="my-6 border-gray-100" />

                        <div>
                            <h3 className="text-base font-semibold text-gray-900 mb-3">Contact Information</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center text-sm text-gray-600">
                                    <span className="mr-3 text-gray-400">✉️</span> john.doe@email.com
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <span className="mr-3 text-gray-400">📞</span> +62 812-3456-7890
                                </li>
                                <li className="flex items-center text-sm text-gray-600">
                                    <span className="mr-3 text-gray-400">📍</span> Malang, Indonesia
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* KONTEN KANAN (DETAIL) */}
                <div className="col-span-8 space-y-6">

                    {/* SKILLS */}
                    <div className="p-6 rounded-2xl border border-gray-200 bg-white">
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
                        <div className="flex flex-wrap gap-2">
                            {['UI Design', 'UX Research', 'Figma', 'Prototyping', 'User Testing', 'Adobe XD'].map((skill) => (
                                <span key={skill} className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* EXPERIENCE */}
                    <div className="p-6 rounded-2xl border border-gray-200 bg-white">
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Work Experience</h3>
                        <div className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">💼</div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900">Junior UI/UX Designer</h4>
                                <div className="flex items-center text-xs text-gray-500 mt-1 gap-2">
                                    <span>Tech Startup Inc.</span>
                                    <span className="text-gray-300">•</span>
                                    <span>2024 - Present</span>
                                </div>
                                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                                    Staff design initiatives for mobile and web applications.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* EDUCATION */}
                    <div className="p-6 rounded-2xl border border-gray-200 bg-white">
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Education</h3>
                        <div className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">🎓</div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900">Majoring in Computer Science</h4>
                                <div className="flex items-center text-xs text-gray-500 mt-1 gap-2">
                                    <span>Universitas Brawijaya</span>
                                    <span className="text-gray-300">•</span>
                                    <span>2024 - Present</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>

      </div>
    </div>
  );
};

export default ProfilKandidat;