import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import SuccessNotification from '../../components/common/SuccessNotification.jsx';

export default function LoginRecruiter() {
  const navigate = useNavigate();

  // --- 1. STATE ---
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- 2. HANDLER ---
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData(prev => ({ ...prev, [id]: val }));

    // Hapus error saat mengetik
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: null }));
  };

  // --- 3. VALIDASI ---
  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- 4. SUBMIT ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulasi API Call
    setTimeout(() => {
      console.log("Login Recruiter Data:", formData);
      setIsLoading(false);
      setShowSuccess(true);
      
      // Redirect ke Dashboard Recruiter
      setTimeout(() => {
        navigate('/dashboard-recruiter'); 
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#EFF6FF] via-white to-[#EFF6FF]">
      
      {/* Notifikasi Sukses */}
      {showSuccess && (
        <SuccessNotification 
          message="Login successful! Redirecting to Dashboard..." 
          onClose={() => setShowSuccess(false)} 
        />
      )}

      {/* Wrapper Utama Kartu */}
      <div className="w-[1039px] h-[732px] bg-white shadow-2xl rounded-2xl overflow-hidden flex">
        
        {/* --- KOLOM KIRI (BIRU) --- */}
        <div className="w-1/2 h-full bg-gradient-to-br from-[#155DFC] to-[#1447E6] text-white p-12 relative overflow-hidden flex flex-col justify-center gap-8">
          
          {/* Dekorasi Lingkaran */}
          <div className="absolute opacity-10 pointer-events-none">
            <div className="absolute w-[256px] h-[256px] bg-white rounded-full -top-[128px] -left-[128px]"></div>
            <div className="absolute w-[384px] h-[384px] bg-white rounded-full top-[476px] left-[263px]"></div>
          </div>

          {/* Logo & Brand */}
          <div className="relative z-10 flex items-center gap-2">
            <img src="/logoPutih.png" className="w-12 h-12" alt="logo relock" />
            <span className="text-[32px] font-bold leading-[54px]">RELOCK</span>
          </div>

          {/* Teks Selamat Datang (Khusus Recruiter) */}
          <div className="relative z-10">
            <h1 className="text-[30px] font-normal leading-[36px]">Welcome Back!</h1>
            <p className="text-[#DBEAFE] text-[18px] font-normal leading-[28px] mt-6 max-w-[404px]">
              Log in to post jobs, manage applications, and find the perfect talent for your company.
            </p>
          </div>
        </div>

        {/* --- KOLOM KANAN (FORMULIR) --- */}
        <div className="w-1/2 h-full p-12 relative flex flex-col justify-center">
          
          {/* Navigasi Atas */}
          <div className="absolute top-8 right-12 flex gap-2">
            <button className="px-3 py-2 text-[14px] font-medium text-white bg-[#2563EB] rounded-lg shadow-sm hover:bg-blue-700 transition">
              Login
            </button>
            <Link to="/register-recruiter" className="px-3 py-2 text-[14px] font-medium text-[#1A1A1A] bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition">
              Sign Up
            </Link>
          </div>

          <div className="max-w-md mx-auto w-full">
            {/* Judul Form */}
            <h2 className="text-[30px] font-normal text-[#101828] leading-[36px]">Sign In</h2>
            <p className="text-[#4A5565] text-[16px] font-normal leading-[24px] mt-2">
              Access your company dashboard
            </p>

            {/* Toggle Role (Company Aktif) */}
            <div className="bg-gray-100 p-1 rounded-full flex mt-8 h-[40px]">
              <Link to="/login-candidate" className="w-1/2 py-1 text-center rounded-full text-[14px] font-medium text-[#64748B] hover:text-[#1A1A1A] transition">
                Candidate
              </Link>
              <button className="w-1/2 py-1 text-center rounded-full text-[14px] font-medium text-[#1A1A1A] bg-white shadow transition">
                Company
              </button>
            </div>

            {/* Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              
              {/* Email */}
              <div>
                <label className="block text-[14px] font-medium text-[#1A1A1A] mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    id="email"
                    placeholder="company@example.com" 
                    value={formData.email}
                    onChange={handleChange}
                    className={`h-[40px] block w-full pl-10 pr-3 py-2 bg-[#F8FAFC] border rounded-lg text-[14px] focus:outline-none focus:ring-2 transition ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-transparent focus:ring-blue-500 focus:bg-white'}`} 
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-[14px] font-medium text-[#1A1A1A] mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    id="password"
                    placeholder="Enter your password" 
                    value={formData.password}
                    onChange={handleChange}
                    className={`h-[40px] block w-full pl-10 pr-10 py-2 bg-[#F8FAFC] border rounded-lg text-[14px] focus:outline-none focus:ring-2 transition ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-transparent focus:ring-blue-500 focus:bg-white'}`} 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    id="rememberMe" 
                    type="checkbox" 
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-[14px] font-medium text-[#364153]">Remember me</label>
                </div>
                <Link to="/forgot-password" className="text-[14px] font-medium text-[#155DFC] hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-[40px] flex justify-center items-center py-2 px-4 rounded-lg shadow-sm text-[14px] font-medium text-white bg-[#155DFC] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Signing In...
                  </>
                ) : (
                  'Sign In as Company'
                )}
              </button>
            </form>

            {/* Footer Link */}
            <div className="text-center mt-8">
              <p className="text-[16px] font-normal text-[#4A5565]">
                Don't have an account? <Link to="/register-recruiter" className="font-medium text-[#155DFC] hover:underline">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}