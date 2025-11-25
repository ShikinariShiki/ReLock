import React, { useState } from 'react';
import { 
  Search, SlidersHorizontal, MapPin, 
  GraduationCap, Banknote, 
  Clock, Home, Sparkles, Bookmark, Briefcase, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Semua Pekerjaan');

  // --- 1. STATE BOOKMARK ---
  const [bookmarkedJobIds, setBookmarkedJobIds] = useState([]);

  // --- 2. STATE FILTER MODAL ---
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    minSalary: '',
    maxSalary: '',
    selectedCategories: [],
    datePosted: 'anytime'
  });

  // --- HANDLERS ---
  const handleBookmark = (e, jobId) => {
    e.stopPropagation();
    setBookmarkedJobIds((prevIds) => {
      if (prevIds.includes(jobId)) return prevIds.filter((id) => id !== jobId);
      return [...prevIds, jobId];
    });
  };

  const handleCardClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  // Handler untuk Checkbox Kategori
  const toggleCategoryFilter = (category) => {
    setAdvancedFilters(prev => {
      const isSelected = prev.selectedCategories.includes(category);
      if (isSelected) {
        return { ...prev, selectedCategories: prev.selectedCategories.filter(c => c !== category) };
      } else {
        return { ...prev, selectedCategories: [...prev.selectedCategories, category] };
      }
    });
  };

  // Handler Reset Filter
  const resetFilters = () => {
    setAdvancedFilters({
      minSalary: '',
      maxSalary: '',
      selectedCategories: [],
      datePosted: 'anytime'
    });
  };

  // --- DATA ---
  const filterOptions = {
    Level: ["1st year college student", "2nd year college student", "3th year college student", "4th year college student", "Fresh Graduate (< 1 Year)"],
    "Work Mode": ["On-site", "Remote", "Hybrid"],
    "Job Type": ["Full Time", "Part Time", "Contract", "Freelance", "Internship"],
    Locations: ["Jakarta", "Bandung", "Surabaya", "Bali", "Yogyakarta", "Remote"]
  };

  const categories = [
    "All Jobs", "Data & Product", "BusDev & Sales", 
    "Design & Creative", "Marketing & SocMed", 
    "Finance & Account", "Recruiting & HR"
  ];

  // Opsi Tanggal Posting
  const datePostedOptions = [
    { value: 'anytime', label: 'Anytime' },
    { value: '24h', label: 'Past 24 hours' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' },
  ];

  const jobs = [
    {
      id: 1,
      title: "Marketing Intern - Social Media",
      company: "Tech Startup Indonesia",
      location: "Jakarta",
      status: "2nd year college student",
      type: "Hybrid",
      salary: "Rp 2.000.000 - 3.000.000",
      tags: ["Marketing", "Social Media", "Content Creation"],
      category: "Marketing & SocMed"
    },
    {
      id: 2,
      title: "UI/UX Design Intern",
      company: "Creative Digital Agency",
      location: "Bandung",
      status: "4th year college student",
      type: "Remote",
      salary: "Rp 1.500.000 - 2.500.000",
      tags: ["UI/Design", "Figma", "Design System"],
      category: "Design & Creative"
    },
    {
      id: 3,
      title: "Content Writer Intern",
      company: "Media Digital Nusantara",
      location: "Jakarta",
      status: "3th year college student",
      type: "Hybrid",
      salary: "Rp 2.500.000 - 3.500.000",
      tags: ["Writing", "Content", "SEO"],
      category: "Marketing & SocMed"
    },
    {
      id: 4,
      title: "Data Entry Intern",
      company: "E-Commerce Solutions",
      location: "Surabaya",
      status: "1st year college student",
      type: "On-site",
      salary: "Rp 1.800.000 - 2.500.000",
      tags: ["Excel", "Data Entry", "Admin"],
      category: "Data & Product"
    },
    {
      id: 5,
      title: "Customer Service Intern",
      company: "FinTech Startup",
      location: "Jakarta",
      status: "2nd year college student",
      type: "Hybrid",
      salary: "Rp 2.000.000 - 3.000.000",
      tags: ["Customer Service", "Communication", "FinTech"],
      category: "BusDev & Sales"
    },
    {
      id: 6,
      title: "Software Development Intern",
      company: "Tech Academy",
      location: "Remote",
      status: "Fresh Graduate (< 1 Year)",
      type: "Remote",
      salary: "Rp 3.000.000 - 4.000.000",
      tags: ["JavaScript", "Python", "Git"],
      category: "Data & Product"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans relative">
      
      {/* HERO SECTION */}
      <div className="bg-[#155DFC] text-white pt-16 pb-24 px-6 text-center">
        <h1 className="text-2xl font-medium mb-2">Unlock Your First Opportunity</h1>
        <p className="text-blue-100 text-lg mb-8">Find internships and entry-level positions tailored for students</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { label: 'No Experience Needed', icon: Sparkles },
            { label: 'Fresh Graduate', icon: GraduationCap },
            { label: 'Remote Work', icon: Home },
            { label: '3-6 Months', icon: Clock },
          ].map((item, idx) => (
            <button key={idx} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition">
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 pb-20">
        
        {/* SEARCH & FILTER CARD */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* TOMBOL FILTERS (Memicu Modal) */}
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              <SlidersHorizontal size={20} />
              Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(filterOptions).map(([label, options]) => (
              <div key={label} className="relative">
                <select className="w-full p-3 border border-gray-200 rounded-lg text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <option value="">{label}</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
             <select className="w-full md:w-auto p-3 border border-gray-200 rounded-lg text-gray-500 bg-white focus:outline-none cursor-pointer">
                <option>Sort by: Newest</option>
                <option>Sort by: Salary (High to Low)</option>
                <option>Sort by: Salary (Low to High)</option>
             </select>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide mb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? 'bg-[#155DFC] text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* JOB COUNT */}
        <p className="text-gray-500 mb-6">{jobs.length} jobs found</p>

        {/* JOB GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => {
            const isBookmarked = bookmarkedJobIds.includes(job.id);
            return (
              <div 
                key={job.id} 
                onClick={() => handleCardClick(job.id)} 
                className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col h-full cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{job.company}</p>
                  </div>
                  <button 
                    onClick={(e) => handleBookmark(e, job.id)}
                    className={`p-2 rounded-full transition-colors duration-200 z-10 ${
                      isBookmarked 
                        ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                        : 'text-gray-400 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Bookmark size={22} className={isBookmarked ? "fill-current" : ""} />
                  </button>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin size={18} className="text-gray-400 shrink-0" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <GraduationCap size={18} className="text-gray-400 shrink-0" />
                    {job.status}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Briefcase size={18} className="text-gray-400 shrink-0" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Banknote size={18} className="text-gray-400 shrink-0" />
                    {job.salary}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {job.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#101828] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <h4 className="text-lg font-bold mb-6">About Relock!</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            {/* ...Footer Columns Lainnya... */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Email</a></li>
                <li><a href="#" className="hover:text-white">WhatsApp</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © 2025 Relock. All rights reserved.
          </div>
        </div>
      </footer>

      {/* --- ADVANCED FILTER MODAL --- */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">All Filters</h3>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-8">
              
              {/* 1. Salary Range */}
              <section>
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Salary Range (IDR)</h4>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Minimum</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400 text-sm">Rp</span>
                      <input 
                        type="number" 
                        placeholder="0" 
                        value={advancedFilters.minSalary}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, minSalary: e.target.value})}
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Maximum</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400 text-sm">Rp</span>
                      <input 
                        type="number" 
                        placeholder="Any" 
                        value={advancedFilters.maxSalary}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, maxSalary: e.target.value})}
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Job Categories (Checkbox) */}
              <section>
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Job Categories</h4>
                <div className="grid grid-cols-2 gap-3">
                  {categories.filter(c => c !== "All Jobs").map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        checked={advancedFilters.selectedCategories.includes(cat)}
                        onChange={() => toggleCategoryFilter(cat)}
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition">{cat}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* 3. Date Posted (Radio) */}
              <section>
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Date Posted</h4>
                <div className="space-y-2">
                  {datePostedOptions.map((option) => (
                    <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="datePosted"
                        value={option.value}
                        checked={advancedFilters.datePosted === option.value}
                        onChange={(e) => setAdvancedFilters({...advancedFilters, datePosted: e.target.value})}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition">{option.label}</span>
                    </label>
                  ))}
                </div>
              </section>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-between items-center">
              <button 
                onClick={resetFilters}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition underline underline-offset-4"
              >
                Reset all
              </button>
              <button 
                onClick={() => {
                  console.log("Applying filters:", advancedFilters);
                  setIsFilterOpen(false);
                }}
                className="bg-[#155DFC] text-white px-8 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
              >
                Show Results
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}