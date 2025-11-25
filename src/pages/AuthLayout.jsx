import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AuthLayout = ({ title, subtitle, children, type = "login" }) => {
  const location = useLocation();
  const isCompany = location.pathname.includes('rekruter') || location.pathname.includes('company');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] p-4 font-sans">
      {/* Container Utama: Hapus hardcoded pixel, gunakan max-w dan aspect ratio */}
      <div className="w-full max-w-[1100px] bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[700px]">
        
        {/* KOLOM KIRI (BRANDING) */}
        <div className="w-full md:w-1/2 bg-[#155DFC] text-white p-12 relative flex flex-col justify-between overflow-hidden">
            {/* Dekorasi Background */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Logo */}
            <div className="relative z-10 flex items-center gap-3">
               {/* Ganti src sesuai path icon Anda */}
               <img src="/images/icon.png" alt="Logo" className="w-10 h-10 object-contain brightness-0 invert" /> 
               <span className="text-3xl font-bold tracking-wide">RELOCK</span>
            </div>

            {/* Text Content */}
            <div className="relative z-10 my-auto">
                <h1 className="text-[40px] font-bold leading-tight mb-4">
                  {type === 'register' ? 'Join Relock Today!' : 'Welcome Back!'}
                </h1>
                <p className="text-blue-100 text-lg leading-relaxed max-w-md">
                  {type === 'register' 
                    ? 'Create your account and start your journey to finding the perfect job or hiring top talent.'
                    : 'Log in to access thousands of job opportunities and connect with top companies.'}
                </p>
                
                {/* List Features (Khusus Register) */}
                {type === 'register' && (
                  <ul className="mt-8 space-y-4">
                      {['Free account with unlimited access', 'Connect with top companies', 'Personalized job recommendations'].map((item, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                              </div>
                              <span className="text-sm font-medium">{item}</span>
                          </li>
                      ))}
                  </ul>
                )}
            </div>
        </div>

        {/* KOLOM KANAN (FORM) */}
        <div className="w-full md:w-1/2 p-12 md:p-16 relative flex flex-col justify-center bg-white">
            {/* Tombol Login/Register di Pojok Kanan Atas */}
            <div className="absolute top-8 right-8 md:right-12 flex gap-3">
                {type === 'login' ? (
                   <>
                     <span className="text-sm text-gray-500 py-2">Don't have an account?</span>
                     <Link to={isCompany ? "/register-rekruter" : "/register-kandidat"} className="px-5 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">Sign Up</Link>
                   </>
                ) : (
                   <>
                     <span className="text-sm text-gray-500 py-2">Already have an account?</span>
                     <Link to={isCompany ? "/login-rekruter" : "/login-kandidat"} className="px-5 py-2 text-sm font-semibold text-white bg-[#155DFC] rounded-lg shadow-md hover:bg-blue-700 transition">Login</Link>
                   </>
                )}
            </div>

            <div className="mt-8 w-full max-w-md mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-500 mb-8">{subtitle}</p>

                {/* TOGGLE CANDIDATE / COMPANY */}
                <div className="bg-gray-100 p-1.5 rounded-xl flex mb-8 w-full">
                    <Link 
                      to={type === 'register' ? "/register-kandidat" : "/login-kandidat"}
                      className={`flex-1 py-2.5 text-center rounded-lg text-sm font-semibold transition-all duration-200 ${!isCompany ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Candidate
                    </Link>
                    <Link 
                      to={type === 'register' ? "/register-rekruter" : "/login-rekruter"}
                      className={`flex-1 py-2.5 text-center rounded-lg text-sm font-semibold transition-all duration-200 ${isCompany ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Company
                    </Link>
                </div>

                {children}

            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;