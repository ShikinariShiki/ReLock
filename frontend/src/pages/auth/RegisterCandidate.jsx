import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, User, Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import SuccessNotification from '../../components/common/SuccessNotification.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function RegisterCandidate() {
  const navigate = useNavigate();
  const { registerCandidate } = useAuth();

  // --- 1. STATE UNTUK MENYIMPAN DATA FORM ---
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  // --- 2. STATE UNTUK UI FEEDBACK ---
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiError, setApiError] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- 3. HANDLE PERUBAHAN INPUT ---
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [id]: val }));
    
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: null }));
    if (apiError) setApiError('');
  };

  // --- 4. FUNGSI VALIDASI (BAHASA INGGRIS) ---
  const validateForm = () => {
    let newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must agree to the terms";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- 5. HANDLE SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setApiError('');

    const result = await registerCandidate(formData);
    
    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => navigate('/homepage-candidate'), 1500);
    } else {
      // Handle validation errors from API
      if (result.errors) {
        const apiErrors = {};
        Object.keys(result.errors).forEach(key => {
          // Map snake_case to camelCase
          const camelKey = key.replace(/_([a-z])/g, (m, p1) => p1.toUpperCase());
          apiErrors[camelKey] = result.errors[key][0];
        });
        setErrors(prev => ({ ...prev, ...apiErrors }));
      }
      setApiError(result.error || 'Registration failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#EFF6FF] via-white to-[#EFF6FF]">
      
      {showSuccess && (
        <SuccessNotification 
          message="Account created successfully! Redirecting..." 
          onClose={() => setShowSuccess(false)} 
        />
      )}

      {/* Wrapper Utama Kartu */}
      <div className="w-[1039px] h-[873px] bg-white shadow-2xl rounded-2xl overflow-hidden flex">
        
        {/* --- KOLOM KIRI (BIRU) --- */}
        <div className="w-1/2 h-full bg-gradient-to-br from-[#155DFC] to-[#1447E6] text-white p-12 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute opacity-10 pointer-events-none">
            <div className="absolute w-[256px] h-[256px] bg-white rounded-full -top-[128px] left-[391px]"></div>
            <div className="absolute w-[384px] h-[384px] bg-white rounded-full -left-[128px] top-[507px]"></div>
          </div>

          <div className="absolute top-12 left-12 z-10 flex items-center gap-2">
            <img src="/logoPutih.png" className="w-12 h-12" alt="logo relock" />
            <span className="text-[32px] font-bold leading-[54px]">RELOCK</span>
          </div>

          <div className="relative z-10">
            <h1 className="text-[30px] font-normal leading-[36px]">Join Relock Today!</h1>
            <p className="text-[#DBEAFE] text-[18px] font-normal leading-[28px] mt-6 max-w-[388px]">
              Create your account and start your journey to finding the perfect job or hiring top talent.
            </p>
            <ul className="space-y-5 mt-10">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-[16px]">✓</span>
                <span className="text-[16px]">Free account with unlimited access</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-[16px]">✓</span>
                <span className="text-[16px]">Connect with top companies</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-[16px]">✓</span>
                <span className="text-[16px]">Personalized job recommendations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- KOLOM KANAN (FORMULIR) --- */}
        <div className="w-1/2 h-full p-12 relative flex flex-col justify-center">
          
          <div className="absolute top-8 right-12 flex gap-2">
            <Link to="/login-candidate" className="px-3 py-2 text-[14px] font-medium text-[#1A1A1A] bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition">
              Login
            </Link>
            <button className="px-3 py-2 text-[14px] font-medium text-white bg-[#2563EB] rounded-lg shadow-sm hover:bg-blue-700 transition">
              Sign Up
            </button>
          </div>

          <div className="max-w-md mx-auto w-full mt-10">
            <h2 className="text-[30px] font-normal text-[#101828] leading-[36px]">Create Account</h2>
            <p className="text-[#4A5565] text-[16px] font-normal leading-[24px] mt-2">
              Get started with your free account
            </p>

            {/* Toggle Role */}
            <div className="bg-gray-100 p-1 rounded-full flex mt-8 h-[40px]">
              <button className="w-1/2 py-1 text-center rounded-full text-[14px] font-medium text-[#1A1A1A] bg-white shadow transition flex items-center justify-center gap-2">
                <User size={16} /> Candidate
              </button>
              <Link to="/register-recruiter" className="w-1/2 py-1 text-center rounded-full text-[14px] font-medium text-[#64748B] hover:text-[#1A1A1A] transition flex items-center justify-center gap-2">
                <Building2 size={16} /> Company
              </Link>
            </div>

            {/* Form */}
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              
              {/* Nama Depan & Belakang */}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-[14px] font-medium text-[#1A1A1A] mb-2">First Name</label>
                  <input 
                    type="text" id="firstName" placeholder="John" 
                    value={formData.firstName} onChange={handleChange}
                    className={`h-[40px] block w-full px-3 py-2 bg-[#F8FAFC] border rounded-lg text-[14px] focus:outline-none focus:ring-2 transition ${errors.firstName ? 'border-red-500 focus:ring-red-200' : 'border-transparent focus:ring-blue-500 focus:bg-white'}`} 
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div className="w-1/2">
                  <label className="block text-[14px] font-medium text-[#1A1A1A] mb-2">Last Name</label>
                  <input 
                    type="text" id="lastName" placeholder="Doe" 
                    value={formData.lastName} onChange={handleChange}
                    className={`h-[40px] block w-full px-3 py-2 bg-[#F8FAFC] border rounded-lg text-[14px] focus:outline-none focus:ring-2 transition ${errors.lastName ? 'border-red-500 focus:ring-red-200' : 'border-transparent focus:ring-blue-500 focus:bg-white'}`} 
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[14px] font-medium text-[#1A1A1A] mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="email" id="email" placeholder="company@example.com" 
                    value={formData.email} onChange={handleChange}
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
                    type={showPassword ? "text" : "password"} id="password" placeholder="Create a password" 
                    value={formData.password} onChange={handleChange}
                    className={`h-[40px] block w-full pl-10 pr-10 py-2 bg-[#F8FAFC] border rounded-lg text-[14px] focus:outline-none focus:ring-2 transition ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-transparent focus:ring-blue-500 focus:bg-white'}`} 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[14px] font-medium text-[#1A1A1A] mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type={showConfirmPassword ? "text" : "password"} id="confirmPassword" placeholder="Confirm your password" 
                    value={formData.confirmPassword} onChange={handleChange}
                    className={`h-[40px] block w-full pl-10 pr-10 py-2 bg-[#F8FAFC] border rounded-lg text-[14px] focus:outline-none focus:ring-2 transition ${errors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-transparent focus:ring-blue-500 focus:bg-white'}`} 
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Terms */}
              <div>
                <div className="flex items-center pt-2">
                  <input 
                    id="termsAccepted" type="checkbox" 
                    checked={formData.termsAccepted} onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                  />
                  <label htmlFor="termsAccepted" className="ml-3 block text-[16px] font-medium text-[#364153]">
                    I agree to the <a href="#" className="text-[#155DFC] hover:underline">Terms of Service</a> and <a href="#" className="text-[#155DFC] hover:underline">Privacy Policy</a>
                  </label>
                </div>
                {errors.termsAccepted && <p className="text-red-500 text-xs mt-1 ml-7">{errors.termsAccepted}</p>}
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
                    Creating Account...
                  </>
                ) : (
                  'Create Candidate Account'
                )}
              </button>
            </form>

            <div className="text-center mt-4 pb-4">
              <p className="text-[16px] font-normal text-[#4A5565]">
                Already have an account? <Link to="/login-candidate" className="font-medium text-[#155DFC] hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}