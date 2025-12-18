import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Users, Clock, Search, Plus, 
  ChevronDown, FileText, Loader2, AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Import Komponen
import DashboardJobCard from '../../components/recruiter/DashboardJobCard';
import EditJobForm from '../../components/recruiter/EditJobForm';
import { recruiterApi, jobsApi } from '../../services/api.js';

export default function DashboardRecruiter() {
  const navigate = useNavigate();

  // API states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState([
    { title: "Total Postings", value: "0", icon: Briefcase, color: "bg-blue-50 text-blue-600" },
    { title: "Active Opportunities", value: "0", icon: FileText, color: "bg-green-50 text-green-600" },
    { title: "Total Applicants", value: "0", icon: Users, color: "bg-purple-50 text-purple-600" },
    { title: "Pending Reviews", value: "0", icon: Clock, color: "bg-orange-50 text-orange-600" },
  ]);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await recruiterApi.getDashboard();
        
        // Update jobs
        const jobsData = response.jobs?.data || response.jobs || [];
        const formattedJobs = jobsData.map(job => ({
          id: job.id,
          judul: job.title,
          perusahaan: job.company_name,
          status: job.status === 'active' ? 'Active' : job.status === 'closed' ? 'Closed' : 'Draft',
          rawStatus: job.status,
          mode: job.mode || 'On-site',
          tipe: job.type || 'Full Time',
          durasi: job.duration || 'N/A',
          applicants: job.applications_count || 0,
          deadline: job.deadline,
          deadlineFormatted: job.deadline_formatted,
          posted: new Date(job.created_at).toLocaleDateString('id-ID'),
          lokasi: job.location || 'N/A',
          description: job.description,
          responsibilities: job.responsibilities,
          requirements: job.requirements,
          benefits: job.benefits,
          salary_min: job.salary_min,
          salary_max: job.salary_max,
          contact_name: job.contact_name,
          contact_email: job.contact_email,
          contact_phone: job.contact_phone,
        }));
        setJobs(formattedJobs);

        // Update stats
        const statsData = response.stats || {};
        setStats([
          { title: "Total Postings", value: String(statsData.total_jobs || 0), icon: Briefcase, color: "bg-blue-50 text-blue-600" },
          { title: "Active Opportunities", value: String(statsData.active_jobs || 0), icon: FileText, color: "bg-green-50 text-green-600" },
          { title: "Total Applicants", value: String(statsData.total_applications || 0), icon: Users, color: "bg-purple-50 text-purple-600" },
          { title: "Recent Applications", value: String(statsData.recent_applications || 0), icon: Clock, color: "bg-orange-50 text-orange-600" },
        ]);
      } catch (err) {
        console.error('Error fetching dashboard:', err);
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.perusahaan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                          job.rawStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handlers
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus lowongan ini?")) {
      try {
        setDeleting(id);
        await jobsApi.delete(id);
        setJobs(prev => prev.filter(job => job.id !== id));
      } catch (err) {
        console.error('Error deleting job:', err);
        alert(err.message || 'Failed to delete job');
      } finally {
        setDeleting(null);
      }
    }
  };

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setIsEditModalOpen(true);
  };

  const handleSaveUpdate = async (updatedData) => {
    try {
      // Map form data to API format (all fields)
      const apiData = {
        title: updatedData.judul,
        company_name: updatedData.perusahaan,
        location: updatedData.lokasi,
        department: updatedData.departemen,
        type: updatedData.tipe,
        mode: updatedData.mode,
        seniority_level: updatedData.level,
        duration: updatedData.durasi,
        deadline: updatedData.deadline,
        salary_min: updatedData.gajiMin ? parseInt(updatedData.gajiMin) : null,
        salary_max: updatedData.gajiMax ? parseInt(updatedData.gajiMax) : null,
        contact_name: updatedData.contactName,
        contact_email: updatedData.contactEmail,
        contact_phone: updatedData.contactPhone,
        description: updatedData.deskripsi,
        responsibilities: updatedData.tanggungJawab,
        requirements: updatedData.persyaratan,
        benefits: updatedData.benefit,
        status: updatedData.status || 'active',
      };

      await jobsApi.update(selectedJob.id, apiData);
      
      // Update local state with new data
      setJobs(prevJobs => prevJobs.map(job => 
        job.id === selectedJob.id ? { 
          ...job, 
          judul: updatedData.judul,
          perusahaan: updatedData.perusahaan,
          lokasi: updatedData.lokasi,
          tipe: updatedData.tipe,
          mode: updatedData.mode,
          durasi: updatedData.durasi,
          deadline: updatedData.deadline,
          status: updatedData.status === 'active' ? 'Active' : updatedData.status === 'closed' ? 'Closed' : 'Draft',
          rawStatus: updatedData.status,
        } : job
      ));
      setIsEditModalOpen(false);
      setSelectedJob(null);
    } catch (err) {
      console.error('Error updating job:', err);
      throw err; // Re-throw so EditJobForm can display the error
    }
  };

  const handleViewApplicants = (jobId) => {
    navigate(`/recruiter/job-applicants/${jobId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm"
              />
            </div>
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-gray-50 border border-transparent rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 cursor-pointer focus:bg-white focus:border-blue-500 outline-none transition"
              >
                <option value="all">Semua Status</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Job List */}
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <DashboardJobCard 
                  key={job.id} 
                  job={job} 
                  onDelete={() => handleDelete(job.id)}
                  onEdit={() => handleEditClick(job)}
                  onViewApplicants={() => handleViewApplicants(job.id)}
                  isDeleting={deleting === job.id}
                />
              ))
            ) : (
              <div className="text-center py-20 text-gray-400">
                {jobs.length === 0 
                  ? "Belum ada lowongan yang dibuat." 
                  : "Tidak ada lowongan yang cocok dengan filter."}
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