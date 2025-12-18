import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, ChevronDown, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { jobsApi, applicationsApi } from '../../services/api.js';

export default function JobApplicants() {
  const { jobId } = useParams(); // Get Job ID from URL (matches route param)

  // API States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobInfo, setJobInfo] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState(null); // Track which applicant is being updated

  // Status Configuration (maps to backend statuses)
  const statusConfig = {
    "pending": { label: "Pending Review", bgClass: "bg-yellow-50 text-yellow-700 border-yellow-200" },
    "reviewed": { label: "In Review", bgClass: "bg-blue-50 text-blue-700 border-blue-200" },
    "shortlisted": { label: "Shortlisted", bgClass: "bg-purple-50 text-purple-700 border-purple-200" },
    "accepted": { label: "Accepted", bgClass: "bg-green-50 text-green-700 border-green-200" },
    "rejected": { label: "Rejected", bgClass: "bg-red-50 text-red-700 border-red-200" },
  };

  // Fetch applicants
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await jobsApi.getApplicants(jobId);
        setJobInfo(response.job);
        setApplicants(response.applicants || []);
      } catch (err) {
        console.error('Error fetching applicants:', err);
        setError(err.message || 'Failed to load applicants');
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchApplicants();
    }
  }, [jobId]);

  // Handler Status Change
  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      setUpdatingStatus(applicationId);
      await applicationsApi.updateStatus(applicationId, newStatus);
      
      // Update local state
      setApplicants(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ));
    } catch (err) {
      console.error('Error updating status:', err);
      alert(err.message || 'Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Handler View CV
  const handleViewCV = (applicant) => {
    if (applicant.cv_url) {
      window.open(applicant.cv_url, '_blank');
    } else {
      alert('CV not available');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading applicants...</p>
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Applicants</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/recruiter/dashboard"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Back to Dashboard
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 1. HEADER & BACK BUTTON */}
        <div>
          <Link 
            to="/recruiter/dashboard" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Jobs
          </Link>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {jobInfo?.title || 'Job Applicants'}
            </h1>
            <p className="text-gray-500">
              Total Applicants: {applicants.length} candidate{applicants.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* 2. APPLICANTS TABLE */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wide text-gray-500 font-bold">
                  <th className="p-6 w-16">#</th>
                  <th className="p-6">Candidate Name</th>
                  <th className="p-6">Email</th>
                  <th className="p-6">Date Applied</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applicants.map((applicant, index) => {
                  const statusInfo = statusConfig[applicant.status] || statusConfig.pending;
                  const candidateName = applicant.candidate?.full_name || 
                    `${applicant.candidate?.first_name || ''} ${applicant.candidate?.last_name || ''}`.trim() ||
                    'Unknown';
                  const candidateEmail = applicant.candidate?.user?.email || 'N/A';

                  return (
                    <tr key={applicant.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-6 text-gray-500 text-sm">{index + 1}</td>
                      <td className="p-6 font-medium text-gray-900">{candidateName}</td>
                      <td className="p-6 text-gray-600 text-sm">{candidateEmail}</td>
                      <td className="p-6 text-gray-600 text-sm">{applicant.applied_at || 'N/A'}</td>
                      
                      {/* Status Dropdown */}
                      <td className="p-6">
                        <div className="relative inline-block w-44">
                          {updatingStatus === applicant.id ? (
                            <div className="flex items-center gap-2 px-4 py-2">
                              <Loader2 size={16} className="animate-spin text-gray-500" />
                              <span className="text-sm text-gray-500">Updating...</span>
                            </div>
                          ) : (
                            <>
                              <select
                                value={applicant.status}
                                onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                                className={`w-full appearance-none border px-4 py-2 pr-8 rounded-full text-xs font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all ${statusInfo.bgClass}`}
                              >
                                <option value="pending">Pending Review</option>
                                <option value="reviewed">In Review</option>
                                <option value="shortlisted">Shortlisted</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                              </select>
                              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                            </>
                          )}
                        </div>
                      </td>

                      {/* Action Button */}
                      <td className="p-6 text-center">
                        <button 
                          onClick={() => handleViewCV(applicant)}
                          disabled={!applicant.cv_url}
                          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FileText size={16} />
                          View CV
                          {applicant.cv_url && <ExternalLink size={14} />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {applicants.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium text-gray-600 mb-2">No applicants yet</p>
              <p className="text-sm">When candidates apply for this job, they will appear here.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}