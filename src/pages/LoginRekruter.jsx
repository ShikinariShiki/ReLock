import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginRekruter = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F3F4F6] font-sans">
      <div className="w-[1039px] h-[732px] bg-white shadow-2xl rounded-3xl overflow-hidden flex">
        
        {/* KOLOM KIRI (BIRU) */}
        {/* Perbaikan: Hapus 'justify-between', gunakan flex biasa */}
        <div className="w-1/2 h-full bg-[#155DFC] text-white p-12 relative overflow-hidden flex flex-col">
            {/* Dekorasi Bubble */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-[256px] h-[256px] bg-white opacity-10 rounded-full -top-[128px] -left-[128px]"></div>
                <div className="absolute w-[500px] h-[500px] bg-white opacity-10 rounded-full -bottom-[200px] -right-[100px]"></div>
            </div>

            {/* 1. Logo (Tetap di atas) */}
            <div className="relative z-10 flex-none">
                <div className="flex items-center gap-3">
                    <img src="/images/icon.png" alt="Logo" className="w-10 h-10 object-contain brightness-0 invert" /> 
                    <span className="text-3xl font-bold tracking-wide">RELOCK</span>
                </div>
            </div>

            {/* 2. Teks Welcome Back (Tengah Vertikal) */}
            {/* Perbaikan: Gunakan 'flex-1' untuk mengisi ruang kosong & 'justify-center' untuk ke tengah */}
            <div className="relative z-10 flex-1 flex flex-col justify-center">
                <h1 className="text-[40px] font-bold leading-tight">Welcome Back!</h1>
                <p className="text-blue-100 text-lg mt-6 max-w-md leading-relaxed">
                    Log in to access thousands of job opportunities and connect with top companies in Indonesia.
                </p>
            </div>
        </div>
        
        {/* KOLOM KANAN (FORM) */}
        <div className="w-1/2 h-full p-16 flex flex-col justify-center relative">
            <div className="absolute top-8 right-12 flex gap-3">
                <button className="px-6 py-2 text-sm font-semibold text-white bg-[#155DFC] rounded-lg shadow-md">Login</button>
                <Link to="/register-rekruter" className="px-6 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">Sign Up</Link>
            </div>
            
            <div className="mt-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                <p className="text-gray-500 mb-8">Enter your credentials to access your account</p>
                
                {/* Toggle Switch */}
                <div className="bg-gray-100 p-1.5 rounded-xl flex mb-8">
                    <Link to="/login-kandidat" className="flex-1 py-2.5 text-center rounded-lg text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2 transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        Candidate
                    </Link>
                    <button className="flex-1 py-2.5 text-center rounded-lg text-sm font-semibold text-gray-900 bg-white shadow-sm flex items-center justify-center gap-2 transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        Company
                    </button>
                </div>
                
                <form className="space-y-5">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <input type="email" className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" placeholder="company@example.com" />
                        </div>
                    </div>
                    
                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <input type={showPassword ? "text" : "password"} className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" placeholder="Enter password" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                                {showPassword ? (
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                ) : (
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <span className="ml-2 text-sm font-medium text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">Forgot password?</a>
                    </div>
                    
                    <Link to="/profil-rekruter" className="block w-full py-3.5 px-4 bg-[#155DFC] hover:bg-blue-700 text-white font-semibold rounded-xl text-center shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5">
                        Sign In as Company
                    </Link>
                </form>

                <p className="mt-8 text-center text-gray-500 text-sm">
                    Don't have an account? <a href="#" className="text-blue-600 font-semibold hover:underline">Sign up</a>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRekruter;