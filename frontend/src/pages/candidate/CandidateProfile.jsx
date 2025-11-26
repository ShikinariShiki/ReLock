import React from 'react';
import { 
  User, Mail, Phone, MapPin, Linkedin, 
  Edit, Briefcase, Users, GraduationCap, 
  Award, MapPinned, Clock, Link as LinkIcon, 
  FileText 
} from 'lucide-react';

export default function CandidateProfile() {
  // Data Statis (Sesuai Desain Gambar)
  const profile = {
    name: "John Doe",
    role: "Junior UI/UX Designer",
    about: "Passionate designer with 1+ years of experience creating intuitive and beautiful user experiences. I love solving complex problems through simple, elegant design solutions.",
    email: "john.doe@email.com",
    phone: "+62 812-3456-7890",
    linkedin: "linkedin.com/in/johndoe",
    location: "Malang, Indonesia",
    skills: ["UI Design", "UX Research", "Figma", "Prototyping", "User Testing", "Design Systems", "Adobe XD", "Sketch"],
    experiences: [
      {
        role: "Junior UI/UX Designer",
        company: "Tech Startup Inc.",
        date: "2024 - Present",
        desc: "Staff design initiatives for mobile and web applications, managing a 3 designs project for now."
      }
    ],
    organizations: [
      {
        role: "BEM FILKOM UB",
        org: "Universitas Brawijaya",
        date: "2024 - Present",
        desc: "Staff of Ministry Social Equity and Environment"
      }
    ],
    education: [
      {
        major: "Majoring in Computer Science",
        univ: "Universitas Brawijaya",
        date: "2024 - Present",
        desc: "Pursuing a degree in Information Systems"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-8">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* --- LEFT SIDEBAR --- */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              
              {/* Profile Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4 border-2 border-white shadow-sm">
                  <User size={40} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-500 text-sm">{profile.role}</p>
              </div>

              {/* Edit Button */}
              <button className="w-full bg-[#155DFC] text-white py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition mb-8">
                <Edit size={16} />
                Edit Profile
              </button>

              {/* About */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {profile.about}
                </p>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail size={18} className="text-blue-600 shrink-0" />
                    <span className="truncate">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone size={18} className="text-blue-600 shrink-0" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Linkedin size={18} className="text-blue-600 shrink-0" />
                    <span className="truncate">{profile.linkedin}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin size={18} className="text-blue-600 shrink-0" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT CONTENT --- */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              
              {/* 1. SKILLS */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="text-blue-600" size={20} />
                  <h3 className="text-lg font-bold text-gray-900">Skills & Expertise</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, idx) => (
                    <span key={idx} className="px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* 2. WORK EXPERIENCE */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="text-blue-600" size={20} />
                  <h3 className="text-lg font-bold text-gray-900">Work Experience</h3>
                </div>
                {profile.experiences.map((exp, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-4">
                    <h4 className="font-bold text-gray-900 text-base mb-1">{exp.role}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Briefcase size={14} /> {exp.company} 
                      <span className="mx-1">•</span>
                      <Clock size={14} /> {exp.date}
                    </div>
                    <p className="text-gray-600 text-sm">{exp.desc}</p>
                  </div>
                ))}
              </section>

              {/* 3. ORGANIZATIONAL */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="text-blue-600" size={20} />
                  <h3 className="text-lg font-bold text-gray-900">Organizational</h3>
                </div>
                {profile.organizations.map((org, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-4">
                    <h4 className="font-bold text-gray-900 text-base mb-1">{org.role}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Building2Icon size={14} /> {org.org}
                      <span className="mx-1">•</span>
                      <Clock size={14} /> {org.date}
                    </div>
                    <p className="text-gray-600 text-sm">{org.desc}</p>
                  </div>
                ))}
              </section>

              {/* 4. EDUCATION */}
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="text-blue-600" size={20} />
                  <h3 className="text-lg font-bold text-gray-900">Education</h3>
                </div>
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-4">
                    <h4 className="font-bold text-gray-900 text-base mb-1">{edu.major}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <Building2Icon size={14} /> {edu.univ}
                      <span className="mx-1">•</span>
                      <Clock size={14} /> {edu.date}
                    </div>
                    <p className="text-gray-600 text-sm">{edu.desc}</p>
                  </div>
                ))}
              </section>

              {/* 5. JOB PREFERENCES */}
              <section className="mb-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Job Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Preferred Location (Blue) */}
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                      <MapPinned size={18} />
                      Preferred Location
                    </div>
                    <p className="text-blue-600 text-sm">Malang, Indonesia</p>
                  </div>

                  {/* Experience Level (Purple) */}
                  <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
                    <div className="flex items-center gap-2 text-purple-700 font-semibold mb-2">
                      <Briefcase size={18} />
                      Experience Level
                    </div>
                    <p className="text-purple-600 text-sm">1+ years</p>
                  </div>
                </div>
              </section>

              {/* 6. RESUME & PORTFOLIO */}
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="text-blue-600" size={20} />
                  <h3 className="text-lg font-bold text-gray-900">Resume & Portfolio</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Portfolio / CV Link</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        readOnly
                        value="https://www.behance.net/johndoe"
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Add link to your portfolio on Behance, Dribbble, LinkedIn, or personal website
                  </p>
                </div>
              </section>

              {/* Footer Action */}
              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button className="bg-[#155DFC] hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition">
                  Save Changes
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Helper Icon Component
function Building2Icon({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} height={size} 
      viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  )
}