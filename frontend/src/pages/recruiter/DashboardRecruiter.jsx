import React, { useState } from 'react';
import { 
  Briefcase, Users, Clock, Search, Plus, 
  ChevronDown, FileText 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Import Komponen
import DashboardJobCard from '../../components/recruiter/DashboardJobCard';
import EditJobForm from '../../components/recruiter/EditJobForm'; 

export default function DashboardRecruiter() {
  const navigate = useNavigate(); // Hook navigasi

  // ... (Bagian stats dan data jobs sama seperti sebelumnya) ...
  const stats = [
    { title: "Total Postings", value: "3", icon: Briefcase, color: "bg-blue-50 text-blue-600" },
    { title: "Active Opportunities", value: "3", icon: FileText, color: "bg-green-50 text-green-600" },
    { title: "Total Applicants", value: "25", icon: Users, color: "bg-purple-50 text-purple-600" },
    { title: "Pending Reviews", value: "0", icon: Clock, color: "bg-orange-50 text-orange-600" },
  ];

  const [jobs, setJobs] = useState([
    {
      id: 1,
      judul: "UI/UX Internship",
      perusahaan: "TechVision Indonesia",
      status: "Active",
      mode: "Remote",
      tipe: "Internship",
      durasi: "3 months",
      applicants: 12,
      deadline: "2026-01-31",
      posted: "15/10/2025",
      lokasi: "Jakarta",
      // ... data lengkap lainnya
    },
    // ... data job lainnya
  ]);

  // --- STATE MODAL EDIT ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // --- HANDLERS ---
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus lowongan ini?")) {
      setJobs(prev => prev.filter(job => job.id !== id));
    }
  };

  // Handler Buka Modal Edit
  const handleEditClick = (job) => {
    setSelectedJob(job);
    setIsEditModalOpen(true);
  };

  // Handler Simpan Update
  const handleSaveUpdate = (updatedData) => {
    setJobs(prevJobs => prevJobs.map(job => 
      job.id === selectedJob.id ? { ...job, ...updatedData } : job
    ));
    setIsEditModalOpen(false);
    setSelectedJob(null);
  };

  // 1. Handler Baru: Navigasi ke Halaman Pelamar (JobApplicants)
  const handleViewApplicants = (jobId) => {
    navigate(`/recruiter/job-applicants/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 min-h-[600px]">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Kelola Lowongan</h2>
              <p className="text-gray-500 text-sm mt-1">Manage your job postings and track applications</p>
            </div>
            <Link 
              to="/recruiter/create-job" 
              className="bg-[#155DFC] hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition"
            >
              <Plus size={18} />
              Buat Lowongan Baru
            </Link>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Cari lowongan..." 
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm"
              />
            </div>
            <div className="relative">
              <select className="appearance-none bg-gray-50 border border-transparent rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 cursor-pointer focus:bg-white focus:border-blue-500 outline-none transition">
                <option>Semua Status</option>
                <option>Active</option>
                <option>Closed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* 2. Pass handler ke komponen kartu */}
          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <DashboardJobCard 
                  key={job.id} 
                  job={job} 
                  onDelete={() => handleDelete(job.id)}
                  onEdit={() => handleEditClick(job)}
                  onViewApplicants={() => handleViewApplicants(job.id)} // PASS DISINI
                />
              ))
            ) : (
              <div className="text-center py-20 text-gray-400">
                Belum ada lowongan yang dibuat.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Form Edit Modal */}
      <EditJobForm 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        jobData={selectedJob}
        onSave={handleSaveUpdate}
      />

    </div>
  );
}