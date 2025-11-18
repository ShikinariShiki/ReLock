import {
  MapPin,
  Briefcase,
  Building2,
  DollarSign,
  Bookmark,
} from "lucide-react";

// === PERUBAHAN 1: Tambahkan "onUnbookmark" di daftar props ===
export default function JobCard({ job, isBookmarked, onUnbookmark }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all mb-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          {/* ... (Info lowongan tetap sama) ... */}
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
            <p className="text-gray-500 text-sm mb-3">{job.company}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mb-4 font-medium">
              <div className="flex items-center gap-1">
                <MapPin size={16} /> {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Briefcase size={16} /> {job.type}
              </div>
              <div className="flex items-center gap-1">
                <Building2 size={16} /> {job.workType}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign size={16} /> {job.salary}
              </div>
            </div>
            <div className="flex gap-2">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {isBookmarked ? (
          // === PERUBAHAN 2: Tambahkan onClick di tombol bookmark ===
          <button
            onClick={onUnbookmark} // Panggil fungsi yang dikirim dari MyJobList
            className="text-blue-600 hover:text-blue-700 transition"
          >
            <Bookmark size={24} className="fill-current" />
          </button>
        ) : (
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
              job.status
            )}`}
          >
            {job.status}
          </span>
        )}
      </div>
    </div>
  );
}
