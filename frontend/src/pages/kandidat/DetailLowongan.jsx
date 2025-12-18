import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Calendar,
  Clock,
  Bookmark,
  Mail,
  Phone,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ApplyForm from "../../components/candidate/ApplyForm.jsx";
import { jobsApi, candidateApi } from "../../services/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function JobDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const [isApplyFormOpen, setIsApplyFormOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);
  
  // API states
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await jobsApi.getById(id);
        console.log('Job API Response:', response);
        // Handle both wrapped and unwrapped responses
        const jobData = response.job || response.data?.job || response;
        console.log('Job Data:', jobData);
        setJob(jobData);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError(err.message || 'Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Check bookmark status when logged in as candidate
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (user && user.role === 'candidate' && id) {
        try {
          const response = await candidateApi.checkBookmark(id);
          setIsBookmarked(response.is_bookmarked);
        } catch (err) {
          console.error('Error checking bookmark:', err);
        }
      }
    };

    checkBookmarkStatus();
  }, [user, id]);

  // Handle bookmark toggle
  const handleBookmark = async () => {
    if (!user) {
      navigate('/login-candidate');
      return;
    }
    
    if (user.role !== 'candidate') {
      alert('Only candidates can bookmark jobs');
      return;
    }

    // Optimistic update
    const previousState = isBookmarked;
    setIsBookmarked(!isBookmarked);

    try {
      setIsBookmarkLoading(true);
      if (previousState) {
        // Currently bookmarked, so remove it
        await candidateApi.removeBookmark(id);
      } else {
        // Not bookmarked, so add it
        await candidateApi.addBookmark(id);
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
      // Revert on error
      setIsBookmarked(previousState);
      alert(err.message || 'Failed to update bookmark');
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading job details...</p>
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">Failed to Load Job</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // No job found
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/homepage-candidate')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    );
  }

  // Parse arrays if they're strings
  const parseJsonArray = (data) => {
    if (Array.isArray(data)) return data;
    if (!data) return [];
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        // If not valid JSON, try splitting by newlines
        return data.split('\n').filter(line => line.trim());
      }
    }
    return [];
  };

  const responsibilities = parseJsonArray(job.responsibilities);
  const requirements = parseJsonArray(job.requirements);
  const benefits = parseJsonArray(job.benefits);

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Get company logo URL
  const getCompanyLogo = () => {
    if (job.recruiter?.logo_url) {
      return job.recruiter.logo_url;
    }
    const companyName = job.company_name || 'Company';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=0D8ABC&color=fff`;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <main className="max-w-6xl mx-auto px-6 pt-8">
        {/* TOMBOL KEMBALI */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- KOLOM KIRI (DETAIL UTAMA) --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* HEADER CARD */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm animate-fade-in">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Logo */}
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden border border-gray-100">
                  <img
                    src={getCompanyLogo()}
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {job.mode && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                        {job.mode}
                      </span>
                    )}
                    {job.type && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                        {job.type}
                      </span>
                    )}
                    {job.duration && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                        {job.duration}
                      </span>
                    )}
                    {job.level && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {job.level}
                      </span>
                    )}
                    {job.is_expired && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                        Expired
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h1>

                  <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={16} />
                      {job.company_name}
                    </div>
                    {job.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin size={16} />
                        {job.location}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-gray-400">
                    {job.deadline && (
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        Deadline: {job.deadline_formatted}
                        {job.days_remaining !== null && job.days_remaining > 0 && (
                          <span className="ml-1 text-orange-500">
                            ({job.days_remaining} days left)
                          </span>
                        )}
                      </div>
                    )}
                    {job.created_at && (
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        Posted: {formatDate(job.created_at)}
                      </div>
                    )}
                  </div>

                  {/* Salary */}
                  {job.salary_range && (
                    <div className="mt-3 text-sm font-semibold text-green-600">
                      {job.salary_range}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 my-6"></div>

              {/* Tombol Aksi */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    if (!user) {
                      navigate('/login-candidate');
                      return;
                    }
                    if (user.role !== 'candidate') {
                      alert('Only candidates can apply for jobs');
                      return;
                    }
                    if (job.is_expired) {
                      alert('This job posting has expired');
                      return;
                    }
                    setIsApplyFormOpen(true);
                  }}
                  disabled={job.is_expired}
                  className={`flex-1 font-bold py-3 px-6 rounded-lg transition-colors ${
                    job.is_expired
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {job.is_expired ? 'Job Expired' : 'Lamar Sekarang'}
                </button>
                
                {/* Tombol Simpan */}
                <button
                  onClick={handleBookmark}
                  disabled={isBookmarkLoading}
                  className={`flex items-center justify-center gap-2 px-6 py-3 border rounded-lg font-semibold transition-all duration-200
                    ${isBookmarked 
                      ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    } ${isBookmarkLoading ? 'opacity-50 cursor-wait' : ''}`}
                >
                  {isBookmarkLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : isBookmarked ? (
                    <>
                      <Check size={20} />
                      Tersimpan
                    </>
                  ) : (
                    <>
                      <Bookmark size={20} />
                      Simpan
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* DESKRIPSI PEKERJAAN */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Deskripsi Pekerjaan
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                {job.description || 'No description available.'}
              </p>

              {responsibilities.length > 0 && (
                <>
                  <h4 className="text-md font-bold text-gray-900 mb-3">
                    Tugas dan Tanggung Jawab
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-8">
                    {responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              <div className="border-t border-gray-100 my-8"></div>

              {requirements.length > 0 && (
                <>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Kualifikasi yang Dibutuhkan
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-8">
                    {requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {benefits.length > 0 && (
                <>
                  <div className="border-t border-gray-100 my-8"></div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Benefit yang Diperoleh
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* --- KOLOM KANAN (SIDEBAR) --- */}
          <div className="lg:col-span-1 space-y-6">
            {/* TENTANG PERUSAHAAN */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-md font-bold text-gray-900 mb-4">
                Tentang Perusahaan
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={getCompanyLogo()}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{job.company_name}</h4>
                  {job.department && (
                    <p className="text-xs text-gray-500">{job.department}</p>
                  )}
                </div>
              </div>
              {job.recruiter?.description && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {job.recruiter.description}
                </p>
              )}
            </div>

            {/* KONTAK PERSON */}
            {(job.contact_name || job.contact_email || job.contact_phone) && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-md font-bold text-gray-900 mb-4">
                  Kontak Person
                </h3>
                {job.contact_name && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Nama</p>
                    <p className="text-sm font-medium text-gray-900">
                      {job.contact_name}
                    </p>
                  </div>
                )}
                {job.contact_email && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <a
                      href={`mailto:${job.contact_email}`}
                      className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-2"
                    >
                      <Mail size={14} />
                      {job.contact_email}
                    </a>
                  </div>
                )}
                {job.contact_phone && (
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Telepon</p>
                    <a
                      href={`tel:${job.contact_phone}`}
                      className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-2"
                    >
                      <Phone size={14} />
                      {job.contact_phone}
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* INFORMASI TAMBAHAN */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-md font-bold text-gray-900 mb-4">
                Informasi Tambahan
              </h3>
              <div className="space-y-4">
                {job.type && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tipe</span>
                    <span className="font-medium text-gray-900">{job.type}</span>
                  </div>
                )}
                {job.mode && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Mode</span>
                    <span className="font-medium text-gray-900">{job.mode}</span>
                  </div>
                )}
                {job.level && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Level</span>
                    <span className="font-medium text-gray-900">{job.level}</span>
                  </div>
                )}
                {job.duration && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Durasi</span>
                    <span className="font-medium text-gray-900">{job.duration}</span>
                  </div>
                )}
                {job.updated_at && (
                  <div className="flex justify-between text-sm border-t pt-3">
                    <span className="text-gray-500">Update Terakhir</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(job.updated_at)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Render Form Lamaran jika state terbuka */}
      {isApplyFormOpen && (
        <ApplyForm
          jobId={job.id}
          jobTitle={job.title}
          companyName={job.company_name}
          onClose={() => setIsApplyFormOpen(false)}
        />
      )}
    </div>
  );
}
