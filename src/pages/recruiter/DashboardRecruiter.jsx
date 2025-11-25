import React, { useState } from 'react';
import { 
  Briefcase, Users, Clock, Search, Plus, 
  ChevronDown, FileText 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Komponen
import DashboardJobCard from '../../components/recruiter/DashboardJobCard';
import EditJobForm from '../../components/recruiter/EditJobForm'; // Import yang benar

export default function DashboardRecruiter() {
  // State Statistik
  const stats = [
    { title: "Total Postings", value: "3", icon: Briefcase, color: "bg-blue-50 text-blue-600" },
    { title: "Active Opportunities", value: "3", icon: FileText, color: "bg-green-50 text-green-600" },
    { title: "Total Applicants", value: "25", icon: Users, color: "bg-purple-50 text-purple-600" },
    { title: "Pending Reviews", value: "0", icon: Clock, color: "bg-orange-50 text-orange-600" },
  ];

  // State Jobs (Data Dummy disesuaikan dengan field di EditForm)
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
      deadline: "2026-01-31", // Dianggap sebagai Tanggal Selesai
      posted: "15/10/2025",
      lokasi: "Jakarta",
      // Data Tambahan untuk Edit Form
      jumlahPosisi: 2,
      tanggalMulai: "2025-11-01",
      tanggalSelesai: "2026-01-31",
      deskripsi: "Mencari UI/UX enthusiast untuk membantu tim produk.",
      tanggungJawab: "- Membuat wireframe & mockup\n- Melakukan user research",
      persyaratan: "- Mahasiswa tingkat akhir\n- Menguasai Figma",
      benefit: "- Uang saku\n- Sertifikat",
      contactName: "Sarah Wijaya",
      contactEmail: "recruitment@techvision.id",
      contactPhone: "+62 812-3456-7890"
    },
    {
      id: 2,
      judul: "Frontend Developer Internship",
      perusahaan: "TechVision Indonesia",
      status: "Active",
      mode: "On-site",
      tipe: "Internship",
      durasi: "6 months",
      applicants: 8,
      deadline: "2026-05-10",
      posted: "18/10/2025",
      lokasi: "Jakarta",
      jumlahPosisi: 1,
      tanggalMulai: "2025-12-01",
      tanggalSelesai: "2026-05-10",
      deskripsi: "Mengembangkan antarmuka web yang responsif.",
      tanggungJawab: "- Implementasi desain ke code\n- Bug fixing",
      persyaratan: "- React.js\n- Tailwind CSS",
      benefit: "- Makan siang\n- Transport",
      contactName: "Budi Santoso",
      contactEmail: "tech@techvision.id",
      contactPhone: "+62 811-9876-5432"
    },
    {
      id: 3,
      judul: "Community Management Volunteer",
      perusahaan: "TechVision Indonesia",
      status: "Active",
      mode: "Remote",
      tipe: "Volunteer",
      durasi: "3 months",
      applicants: 5,
      deadline: "2026-01-20",
      posted: "10/10/2025",
      lokasi: "Bandung",
      jumlahPosisi: 5,
      tanggalMulai: "2025-11-15",
      tanggalSelesai: "2026-01-20",
      deskripsi: "Mengelola komunitas developer di Discord.",
      tanggungJawab: "- Moderasi chat\n- Membuat event online",
      persyaratan: "- Komunikatif\n- Paham teknis dasar",
      benefit: "- Merchandise\n- Akses event gratis",
      contactName: "Dina",
      contactEmail: "community@techvision.id",
      contactPhone: "+62 813-1111-2222"
    }
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

  // 1. Buka Modal dan Set Data
  const handleEditClick = (job) => {
    setSelectedJob(job);
    setIsEditModalOpen(true);
  };

  // 2. Simpan Perubahan (Update State Lokal)
  const handleSaveUpdate = (updatedData) => {
    setJobs(prevJobs => prevJobs.map(job => 
      job.id === selectedJob.id ? { ...job, ...updatedData } : job
    ));
    setIsEditModalOpen(false);
    setSelectedJob(null);
    console.log("Updated Job Data:", updatedData);
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

          {/* Job List */}
          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <DashboardJobCard 
                  key={job.id} 
                  job={job} 
                  onDelete={() => handleDelete(job.id)}
                  onEdit={() => handleEditClick(job)} // Pass handler edit
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

      {/* --- FORM EDIT (PANGGIL KOMPONEN YANG BENAR) --- */}
      <EditJobForm 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        jobData={selectedJob}
        onSave={handleSaveUpdate}
      />

    </div>
  );
}