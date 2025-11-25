import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterRekruter = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F3F4F6] font-sans">
      <div className="w-[1039px] h-[873px] bg-white shadow-2xl rounded-3xl overflow-hidden flex">
        
        {/* KOLOM KIRI (BIRU - Versi Rekruter) */}
        <div className="w-1/2 h-full bg-[#155DFC] text-white p-12 relative overflow-hidden flex flex-col">
             {/* === DEKORASI BUBBLE PUTIH (BARU) === */}
             <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-[256px] h-[256px] bg-white opacity-10 rounded-full -top-[128px] -left-[128px]"></div>
                <div className="absolute w-[500px] h-[500px] bg-white opacity-10 rounded-full -bottom-[200px] -right-[100px]"></div>
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-32">
                    <img src="/images/icon.png" alt="Logo" className="w-10 h-10 object-contain brightness-0 invert" /> 
                    <span className="text-3xl font-bold tracking-wide">RELOCK</span>
                </div>
                
                <h1 className="text-[36px] font-bold leading-tight mb-6">Hire Top Talent!</h1>
                <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-sm">
                    Create your company account and start connecting with the best candidates in Indonesia.
                </p>
                
                {/* Checklist Khusus Rekruter */}
                <ul className="space-y-6">
                    {[
                        'Post unlimited job vacancies', 
                        'Access to premium candidate pool', 
                        'Smart AI-powered matching'
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <span className="text-lg font-medium">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
        {/* KOLOM KANAN (FORM) */}
        <div className="w-1/2 h-full p-16 relative flex flex-col justify-center">
            {/* Navigasi Atas */}
            <div className="absolute top-8 right-12 flex gap-3">
                <Link to="/login-rekruter" className="px-6 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Login</Link>
                <button className="px-6 py-2 text-sm font-semibold text-white bg-[#155DFC] rounded-lg shadow-md">Sign Up</button>
            </div>
            
            <div className="mt-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-500 mb-8">Get started with your company account</p>
                
                {/* Toggle (Company Aktif) */}
                <div className="bg-gray-100 p-1.5 rounded-xl flex mb-8">
                    <Link to="/register-kandidat" className="flex-1 py-2.5 text-center rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        Candidate
                    </Link>
                    <button className="flex-1 py-2.5 text-center rounded-lg text-sm font-semibold text-gray-900 bg-white shadow-sm transition-all flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        Company
                    </button>
                </div>
                
                <form className="space-y-5">
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                            <input type="text" placeholder="John" className="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                            <input type="text" placeholder="Doe" className="block w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Email</label>
                        <div className="relative">
                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <input type="email" placeholder="hr@company.com" className="block w-full pl-10 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <div className="relative">
                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <input type={showPassword ? "text" : "password"} placeholder="Create a password" className="block w-full pl-10 pr-10 px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex items-start pt-2">
                        <input id="terms" type="checkbox" className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                            I agree to the <a href="#" className="text-blue-600 hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>
                        </label>
                    </div>
                    
                    <Link to="/profil-rekruter" className="block w-full py-3.5 px-4 bg-[#155DFC] hover:bg-blue-700 text-white font-semibold rounded-xl text-center shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 mt-6">
                        Create Company Account
                    </Link>
                </form>
                
                <p className="mt-8 text-center text-gray-500 text-sm">
                    Already have an account? <Link to="/login-rekruter" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterRekruter;