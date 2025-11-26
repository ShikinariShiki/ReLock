import React from 'react';
import { 
  Building2, MapPin, Globe, Phone, Mail, 
  Edit, Monitor, Target, Award 
} from 'lucide-react';

export default function RecruiterProfile() {
  // Data Dummy (Bisa diganti nanti dengan data dari Backend)
  const company = {
    name: "TechVision Indonesia",
    industry: "Technology",
    tagline: "Building the future of digital innovation in Southeast Asia through cutting-edge software solutions.",
    email: "hr@techvision.co.id",
    website: "www.techvision.co.id",
    phone: "+62 21-1234-5678",
    location: "Jakarta Selatan, Indonesia",
    description: "TechVision Indonesia is a leading technology company specializing in digital transformation. We help businesses across Southeast Asia leverage cutting-edge technology to achieve their goals. Founded in 2010, we have grown into a team of 500+ passionate innovators.",
    vision: "To become the most trusted technology partner in Southeast Asia, empowering businesses to thrive in the digital era.",
    mission: "We are committed to delivering excellence through innovation, collaboration, and continuous learning. We strive to create impactful solutions that solve real-world problems."
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-8">
      <div className="max-w-5xl mx-auto px-6 space-y-6">

        {/* --- HEADER CARD --- */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm relative">
          {/* Tombol Edit Header */}
          <button className="absolute top-8 right-8 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
            <Edit size={20} />
          </button>

          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Logo Perusahaan */}
            <div className="w-32 h-32 bg-white border border-gray-200 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm p-4">
              {/* Placeholder Logo (Ganti src dengan URL logo asli nanti) */}
              <img 
                src="https://ui-avatars.com/api/?name=Tech+Vision&background=0D8ABC&color=fff&size=128" 
                alt="Company Logo" 
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                  {company.industry}
                </span>
              </div>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {company.tagline}
              </p>

              {/* Kontak Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail size={18} className="text-blue-600 shrink-0" />
                  <span className="truncate">{company.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Globe size={18} className="text-blue-600 shrink-0" />
                  <span className="truncate">{company.website}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone size={18} className="text-blue-600 shrink-0" />
                  <span>{company.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin size={18} className="text-blue-600 shrink-0" />
                  <span>{company.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- COMPANY DESCRIPTION --- */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm relative">
          {/* Tombol Edit Deskripsi (Baru) */}
          <button className="absolute top-8 right-8 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
            <Edit size={20} />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <Building2 className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">About Company</h3>
          </div>
          <p className="text-gray-600 leading-relaxed text-base">
            {company.description}
          </p>
        </div>

        {/* --- VISION & MISSION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col relative">
            {/* Tombol Edit Vision (Baru) */}
            <button className="absolute top-6 right-6 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
              <Edit size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <Target size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Our Vision</h4>
            </div>
            <p className="text-gray-600 leading-relaxed flex-1">
              {company.vision}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col relative">
            {/* Tombol Edit Mission (Baru) */}
            <button className="absolute top-6 right-6 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
              <Edit size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                <Award size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Our Mission</h4>
            </div>
            <p className="text-gray-600 leading-relaxed flex-1">
              {company.mission}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}