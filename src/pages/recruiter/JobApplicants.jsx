import React, { useState } from 'react';
import { ArrowLeft, FileText, ChevronDown } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';

export default function JobApplicants() {
  const { id } = useParams(); // Get Job ID from URL

  // Mockup Job Info (Header)
  const jobInfo = {
    title: "UI/UX Internship",
    totalApplicants: 8
  };

  // Mockup Applicants Data (English & Simplified Status)
  const [applicants, setApplicants] = useState([
    { id: 1, name: "Ahmad Rizki Pratama", email: "ahmad.rizki@email.com", date: "Oct 21, 2025", status: "Applied" },
    { id: 2, name: "Siti Nurhaliza", email: "siti.nur@email.com", date: "Oct 20, 2025", status: "In Review" },
    { id: 3, name: "Budi Santoso", email: "budi.santoso@email.com", date: "Oct 19, 2025", status: "In Review" },
    { id: 4, name: "Dewi Lestari", email: "dewi.lestari@email.com", date: "Oct 18, 2025", status: "Accepted" },
    { id: 5, name: "Eko Prasetyo", email: "eko.prasetyo@email.com", date: "Oct 17, 2025", status: "Applied" },
    { id: 6, name: "Fitri Handayani", email: "fitri.h@email.com", date: "Oct 16, 2025", status: "In Review" },
    { id: 7, name: "Gunawan Wijaya", email: "gunawan.w@email.com", date: "Oct 15, 2025", status: "Rejected" },
    { id: 8, name: "Hani Safira", email: "hani.safira@email.com", date: "Oct 14, 2025", status: "In Review" },
  ]);

  // Status Color Configuration
  const statusConfig = {
    "Applied": "bg-blue-50 text-blue-700 border-blue-200",
    "In Review": "bg-purple-50 text-purple-700 border-purple-200",
    "Accepted": "bg-green-50 text-green-700 border-green-200",
    "Rejected": "bg-red-50 text-red-700 border-red-200",
  };

  // Handler Status Change
  const handleStatusChange = (id, newStatus) => {
    setApplicants(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    console.log(`Applicant ${id} status changed to: ${newStatus}`);
  };

  // Handler View CV
  const handleViewCV = (applicantName) => {
    // Di sini nanti logika untuk membuka URL PDF dari backend
    // Contoh: window.open(applicant.cvUrl, '_blank');
    alert(`Opening CV for ${applicantName}...\n(Mockup: PDF Viewer would open in a new tab)`);
  };

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
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{jobInfo.title}</h1>
            <p className="text-gray-500">Total Applicants: {jobInfo.totalApplicants} candidates</p>
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
                {applicants.map((applicant, index) => (
                  <tr key={applicant.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 text-gray-500 text-sm">{index + 1}</td>
                    <td className="p-6 font-medium text-gray-900">{applicant.name}</td>
                    <td className="p-6 text-gray-600 text-sm">{applicant.email}</td>
                    <td className="p-6 text-gray-600 text-sm">{applicant.date}</td>
                    
                    {/* Status Dropdown */}
                    <td className="p-6">
                      <div className="relative inline-block w-40">
                        <select
                          value={applicant.status}
                          onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                          className={`w-full appearance-none border px-4 py-2 pr-8 rounded-full text-xs font-bold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all ${statusConfig[applicant.status]}`}
                        >
                          <option value="Applied">Applied</option>
                          <option value="In Review">In Review</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                        <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 ${applicant.status === 'Rejected' ? 'text-red-700' : 'text-gray-600'}`} />
                      </div>
                    </td>

                    {/* Action Button */}
                    <td className="p-6 text-center">
                      <button 
                        onClick={() => handleViewCV(applicant.name)}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all bg-white"
                      >
                        <FileText size={16} />
                        View CV
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {applicants.length === 0 && (
            <div className="p-12 text-center text-gray-400">
              No applicants found for this job.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}