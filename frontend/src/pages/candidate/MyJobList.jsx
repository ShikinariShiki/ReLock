import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, Inbox, Loader2, AlertCircle } from "lucide-react";
import JobCard from "../../components/candidate/JobCard.jsx";
import FilterMyList from "../../components/candidate/FilterMyList.jsx";
import { candidateApi } from "../../services/api.js";

export default function MyJobList() {
  const [activeTab, setActiveTab] = useState("bookmarked");

  // API states
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    locations: [],
    types: [],
  });

  // Fetch bookmarks and applications
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both in parallel
        const [bookmarksRes, applicationsRes] = await Promise.all([
          candidateApi.getBookmarks(),
          candidateApi.getApplications(),
        ]);

        console.log('Bookmarks Response:', bookmarksRes);
        console.log('Applications Response:', applicationsRes);

        // Process bookmarks data - handle { bookmarks: [...] } or { data: [...] } or [...]
        const bookmarksArray = bookmarksRes.bookmarks || bookmarksRes.data || bookmarksRes || [];
        const bookmarks = Array.isArray(bookmarksArray) ? bookmarksArray : [];
        
        const formattedBookmarks = bookmarks.map(job => ({
          id: job.id,
          title: job.title,
          company: job.company_name,
          location: job.location || 'N/A',
          type: job.type || 'N/A',
          workType: job.mode || 'N/A',
          salary: job.salary_range || 'Negotiable',
          tags: job.requirements ? (Array.isArray(job.requirements) ? job.requirements.slice(0, 3) : []) : [],
          deadline: job.deadline_formatted,
          level: job.level,
        }));
        setBookmarkedJobs(formattedBookmarks);

        // Process applications data - handle { applications: [...] } or { data: [...] } or [...]
        const applicationsArray = applicationsRes.applications || applicationsRes.data || applicationsRes || [];
        const applications = Array.isArray(applicationsArray) ? applicationsArray : [];
        
        const formattedApplications = applications.map(app => ({
          id: app.id,
          jobId: app.job_listing?.id,
          title: app.job_listing?.title || 'Unknown Job',
          company: app.job_listing?.company_name || 'Unknown Company',
          location: app.job_listing?.location || 'N/A',
          type: app.job_listing?.type || 'N/A',
          workType: app.job_listing?.mode || 'N/A',
          salary: app.job_listing?.salary_range || 'Negotiable',
          tags: [],
          status: formatApplicationStatus(app.status),
          rawStatus: app.status,
          appliedAt: app.created_at,
        }));
        setAppliedJobs(formattedApplications);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper to format application status
  const formatApplicationStatus = (status) => {
    const statusMap = {
      'pending': 'Wait For Response',
      'reviewed': 'In Review',
      'interviewed': 'Interviewed',
      'accepted': 'Accepted',
      'rejected': 'Rejected',
    };
    return statusMap[status] || status;
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    setIsFilterOpen(false);
  };

  const isFiltering =
    activeFilters.locations.length > 0 ||
    activeFilters.types.length > 0 ||
    searchTerm !== "";

  // Filter bookmarks
  const displayedBookmarks = useMemo(() => {
    return bookmarkedJobs.filter((job) => {
      const locationMatch =
        activeFilters.locations.length === 0 ||
        activeFilters.locations.some(loc => 
          job.location.toLowerCase().includes(loc.toLowerCase())
        );
      const typeMatch =
        activeFilters.types.length === 0 ||
        activeFilters.types.includes(job.type);
      const searchMatch = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      return locationMatch && typeMatch && searchMatch;
    });
  }, [bookmarkedJobs, activeFilters, searchTerm]);

  // Filter applied
  const displayedApplied = useMemo(() => {
    return appliedJobs.filter((job) => {
      const locationMatch =
        activeFilters.locations.length === 0 ||
        activeFilters.locations.some(loc => 
          job.location.toLowerCase().includes(loc.toLowerCase())
        );
      const typeMatch =
        activeFilters.types.length === 0 ||
        activeFilters.types.includes(job.type);
      const searchMatch = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      return locationMatch && typeMatch && searchMatch;
    });
  }, [appliedJobs, activeFilters, searchTerm]);

  // Handle unbookmark (UnbookmarkLamaran use case)
  const handleUnbookmark = async (jobId) => {
    try {
      await candidateApi.removeBookmark(jobId);
      setBookmarkedJobs(prev => prev.filter(job => job.id !== jobId));
    } catch (err) {
      console.error('Error removing bookmark:', err);
      alert('Failed to remove bookmark. Please try again.');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your jobs...</p>
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
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Jobs</h2>
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
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      <main className="max-w-5xl mx-auto px-6 mt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Job List</h1>
          <p className="text-slate-500 mt-2 text-lg">
            Manage your saved jobs, applications, and track your job search progress
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-8 flex gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search jobs by title..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 transition text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-5 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 font-medium text-slate-700"
          >
            <SlidersHorizontal size={18} /> Filters
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-xl border border-gray-200 p-1.5 mb-8 shadow-sm">
          <button
            onClick={() => setActiveTab("bookmarked")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "bookmarked"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Bookmarked
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === "bookmarked"
                  ? "bg-white/20 text-white"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {displayedBookmarks.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("applied")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === "applied"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Applied
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === "applied"
                  ? "bg-white/20 text-white"
                  : "bg-blue-100 text-blue-600" 
              }`}
            >
              {displayedApplied.length}
            </span>
          </button>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {activeTab === "bookmarked" ? (
            displayedBookmarks.length > 0 ? (
              displayedBookmarks.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isBookmarked={true}
                  onUnbookmark={() => handleUnbookmark(job.id)}
                />
              ))
            ) : (
              <EmptyState
                isFiltering={isFiltering}
                message="You haven't bookmarked any jobs yet."
                filteredMessage="No bookmarked jobs match your filters."
                type="bookmarked"
              />
            )
          ) : displayedApplied.length > 0 ? (
            displayedApplied.map((job) => (
              <JobCard key={job.id} job={job} isBookmarked={false} />
            ))
          ) : (
            <EmptyState
              isFiltering={isFiltering}
              message="You haven't applied for any jobs yet."
              filteredMessage="No applied jobs match your filters."
              type="applied"
            />
          )}
        </div>
      </main>

      {/* Filter Modal */}
      {isFilterOpen && (
        <FilterMyList
          onClose={() => setIsFilterOpen(false)}
          onApplyFilters={handleApplyFilters}
        />
      )}
    </div>
  );
}

// Empty State Component
function EmptyState({ isFiltering, message, filteredMessage, type }) {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-16 px-6 bg-white rounded-xl border border-gray-200 shadow-sm animate-fade-in">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full mb-6">
        {isFiltering ? (
          <Search size={36} className="text-blue-500" />
        ) : (
          <Inbox size={36} className="text-blue-500" />
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {isFiltering ? "No Results Found" : "Your List is Empty"}
      </h3>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        {isFiltering ? filteredMessage : message}
      </p>
      {!isFiltering && (
        <button
          onClick={() => navigate('/homepage-candidate')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Search size={18} />
          {type === 'bookmarked' ? 'Start Exploring Jobs' : 'Find Your First Job'}
        </button>
      )}
    </div>
  );
}
