import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Inbox } from "lucide-react"; // <-- 1. Tambah Inbox untuk ikon
// import CandidateNavbar from "../../components/candidate/CandidateNavbar.jsx"; 
import JobCard from "../../components/candidate/JobCard.jsx";
import FilterMyList from "../../components/candidate/FilterMyList.jsx";

// Data dummy
const appliedJobsData = [
  {
    id: 1,
    title: "Frontend Dev",
    company: "Tokopedia",
    location: "Jakarta",
    type: "Fulltime",
    workType: "Remote",
    salary: "IDR 15jt",
    tags: ["React", "Tailwind"],
    status: "Accepted",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Gojek",
    location: "Jakarta",
    type: "Senior",
    workType: "Hybrid",
    salary: "IDR 20jt",
    tags: ["Golang", "SQL"],
    status: "Rejected",
  },
  {
    id: 3,
    title: "UI/ UX Internship",
    company: "PT ABCD",
    location: "Malang",
    type: "Internship",
    workType: "On-Site",
    salary: "Negotiable",
    tags: ["UI Design", "Figma"],
    status: "Wait For Response",
  },
];

const bookmarkedJobsData = [
  {
    id: 101,
    title: "UI/ UX Internship",
    company: "PT ABCD",
    location: "Malang",
    type: "Internship",
    workType: "On-Site",
    salary: "Negotiable",
    tags: ["UI Design", "Figma", "Design Systems"],
  },
  {
    id: 102,
    title: "Data Analyst",
    company: "Shopee",
    location: "Jakarta",
    type: "Fulltime",
    workType: "On-Site",
    salary: "Negotiable",
    tags: ["SQL", "Python"],
  },
  {
    id: 103,
    title: "Mobile Dev",
    company: "Traveloka",
    location: "Remote",
    type: "Freshgraduate",
    workType: "Remote",
    salary: "Negotiable",
    tags: ["React Native", "Flutter"],
  },
  {
    id: 104,
    title: "UI/ UX Internship",
    company: "PT Telkom",
    location: "Malang",
    type: "Internship",
    workType: "Hybrid",
    salary: "Negotiable",
    tags: ["UI Design", "Figma"],
  },
];

export default function MyJobList() {
  const [activeTab, setActiveTab] = useState("bookmarked");

  const [appliedJobs, setAppliedJobs] = useState(appliedJobsData);
  const [bookmarkedJobs, setBookmarkedJobs] = useState(bookmarkedJobsData);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    locations: [],
    types: [],
  });

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    setIsFilterOpen(false);
  };

  // --- 2. Logika untuk mendeteksi apakah filter/search sedang aktif ---
  const isFiltering =
    activeFilters.locations.length > 0 ||
    activeFilters.types.length > 0 ||
    searchTerm !== "";

  // Logika filter (useMemo)
  const displayedBookmarks = useMemo(() => {
    return bookmarkedJobs.filter((job) => {
      const locationMatch =
        activeFilters.locations.length === 0 ||
        activeFilters.locations.includes(job.location);
      const typeMatch =
        activeFilters.types.length === 0 ||
        activeFilters.types.includes(job.type);
      const searchMatch = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return locationMatch && typeMatch && searchMatch;
    });
  }, [bookmarkedJobs, activeFilters, searchTerm]);

  const displayedApplied = useMemo(() => {
    return appliedJobs.filter((job) => {
      const locationMatch =
        activeFilters.locations.length === 0 ||
        activeFilters.locations.includes(job.location);
      const typeMatch =
        activeFilters.types.length === 0 ||
        activeFilters.types.includes(job.type);
      const searchMatch = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return locationMatch && typeMatch && searchMatch;
    });
  }, [appliedJobs, activeFilters, searchTerm]);

  // Fungsi unbookmark
  const handleUnbookmark = (jobId) => {
    const newBookmarkedList = bookmarkedJobs.filter((job) => job.id !== jobId);
    setBookmarkedJobs(newBookmarkedList);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-10">
      

      <main className="max-w-5xl mx-auto px-6 mt-8">
        {/* ... (Header dan Search Bar ) ... */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Job List</h1>
          <p className="text-slate-500 mt-2 text-lg">
            Manage your saved jobs, applications, and track your job search
            progress
          </p>
        </div>

        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-8 flex gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search jobs by title..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 transition text-gray-700"
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

        {/* ... (Tabs ) ... */}
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

        {/* --- 3. LOGIKA KONTEN DENGAN EMPTY STATE --- */}
        <div className="space-y-4">
          {activeTab === "bookmarked" ? (
            displayedBookmarks.length > 0 ? (
              // Jika ADA data, tampilkan list
              displayedBookmarks.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isBookmarked={true}
                  onUnbookmark={() => handleUnbookmark(job.id)}
                />
              ))
            ) : (
              // Jika TIDAK ADA data, tampilkan EmptyState
              <EmptyState
                isFiltering={isFiltering}
                message="You haven't bookmarked any jobs yet."
                filteredMessage="No bookmarked jobs match your filters."
              />
            )
          ) : // (Tab 'Applied' aktif)
          displayedApplied.length > 0 ? (
            // Jika ADA data, tampilkan list
            displayedApplied.map((job) => (
              <JobCard key={job.id} job={job} isBookmarked={false} />
            ))
          ) : (
            // Jika TIDAK ADA data, tampilkan EmptyState
            <EmptyState
              isFiltering={isFiltering}
              message="You haven't applied for any jobs yet."
              filteredMessage="No applied jobs match your filters."
            />
          )}
        </div>
      </main>

      {/* Render filter */}
      {isFilterOpen && (
        <FilterMyList
          onClose={() => setIsFilterOpen(false)}
          onApplyFilters={handleApplyFilters}
        />
      )}
    </div>
  );
}

// --- 4. KOMPONEN BARU UNTUK TAMPILAN KOSONG ---
// (Ditaruh di file yang sama agar rapi)
function EmptyState({ isFiltering, message, filteredMessage }) {
  return (
    <div className="text-center py-16 px-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
        {/* Ikon berubah: Inbox jika list kosong, Search jika sedang memfilter */}
        {isFiltering ? (
          <Search size={32} className="text-gray-400" />
        ) : (
          <Inbox size={32} className="text-gray-400" />
        )}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-gray-900">
        {/* Judul berubah */}
        {isFiltering ? "No Results Found" : "Your List is Empty"}
      </h3>
      <p className="mt-2 text-gray-500">
        {/* Pesan berubah */}
        {isFiltering ? filteredMessage : message}
      </p>
    </div>
  );
}