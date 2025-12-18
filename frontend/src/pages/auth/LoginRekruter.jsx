import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import SuccessNotification from '../../components/common/SuccessNotification.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function LoginRecruiter() {
  const navigate = useNavigate();
  const { login } = useAuth();

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
  const [apiError, setApiError] = useState('');

  // --- 2. HANDLER ---
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setFormData(prev => ({ ...prev, [id]: val }));

    // Hapus error saat mengetik
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: null }));
    if (apiError) setApiError('');
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      // Check if user is recruiter
      if (result.user.role !== 'recruiter') {
        setApiError('Please use candidate login for job seeker accounts');
        setIsLoading(false);
        return;
      }
      
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/recruiter/dashboard');
      }, 1500);
    } else {
      setApiError(result.error || 'Invalid credentials');
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
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
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-1/2 h-full bg-gradient-to-br from-[#155DFC] to-[#1447E6] text-white p-12 relative overflow-hidden flex flex-col justify-center gap-8"
        >
          
          {/* Dekorasi Lingkaran */}
          <div className="absolute opacity-10 pointer-events-none">
            <div className="absolute w-[256px] h-[256px] bg-white rounded-full -top-[128px] -left-[128px]"></div>
            <div className="absolute w-[384px] h-[384px] bg-white rounded-full top-[476px] left-[263px]"></div>
          </div>

          {/* Logo & Brand */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10 flex items-center gap-2"
          >
            <img src="/logoPutih.png" className="w-12 h-12" alt="logo relock" />
            <span className="text-[32px] font-bold leading-[54px]">RELOCK</span>
          </motion.div>

          {/* Teks Selamat Datang (Khusus Recruiter) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative z-10"
          >
            <h1 className="text-[30px] font-normal leading-[36px]">Welcome Back!</h1>
            <p className="text-[#DBEAFE] text-[18px] font-normal leading-[28px] mt-6 max-w-[404px]">
              Log in to post jobs, manage applications, and find the perfect talent for your company.
            </p>
          </motion.div>
        </motion.div>

        {/* --- KOLOM KANAN (FORMULIR) --- */}
        <div className="w-1/2 h-full p-12 relative flex flex-col justify-center">
          
          {/* Navigasi Atas */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute top-8 right-12 flex gap-2"
          >
            <button className="px-3 py-2 text-[14px] font-medium text-white bg-[#2563EB] rounded-lg shadow-sm hover:bg-blue-700 transition">
              Login
            </button>
            <Link to="/register-recruiter" className="px-3 py-2 text-[14px] font-medium text-[#1A1A1A] bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition">
              Sign Up
            </Link>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-md mx-auto w-full"
          >
            {/* Judul Form */}
            <motion.h2 variants={itemVariants} className="text-[30px] font-normal text-[#101828] leading-[36px]">Sign In</motion.h2>
            <motion.p variants={itemVariants} className="text-[#4A5565] text-[16px] font-normal leading-[24px] mt-2">
              Access your company dashboard
            </motion.p>

            {/* Toggle Role (Company Aktif) */}
            <motion.div variants={itemVariants} className="bg-gray-100 p-1 rounded-full flex mt-8 h-[40px]">
              <Link to="/login-candidate" className="w-1/2 py-1 text-center rounded-full text-[14px] font-medium text-[#64748B] hover:text-[#1A1A1A] transition flex items-center justify-center">
                Candidate
              </Link>
              <button className="w-1/2 py-1 text-center rounded-full text-[14px] font-medium text-[#1A1A1A] bg-white shadow transition">
                Company
              </button>
            </motion.div>

            {/* Form */}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              
              {/* API Error */}
              {apiError && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-600 text-sm">{apiError}</p>
                </motion.div>
              )}

              {/* Email */}
              <motion.div variants={itemVariants}>
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
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVariants}>
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
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div variants={itemVariants} className="flex items-center justify-between">
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
              </motion.div>

              {/* Submit Button */}
              <motion.button 
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
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
              </motion.button>

            </form>

            {/* Footer Link */}
            <motion.div variants={itemVariants} className="text-center mt-8">
              <p className="text-[16px] font-normal text-[#4A5565]">
                Don't have an account? <Link to="/register-recruiter" className="font-medium text-[#155DFC] hover:underline">Sign up</Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}