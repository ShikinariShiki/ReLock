import React from 'react';
import { Users, Clock, Eye, Edit, Trash2 } from 'lucide-react';

// Tambahkan prop onEdit
export default function DashboardJobCard({ job, onDelete, onEdit }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          {/* Ganti job.title dengan job.judul sesuai data baru */}
          <h3 className="text-lg font-bold text-gray-900">{job.judul || job.title}</h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            job.status === 'Active' 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-gray-100 text-gray-600 border-gray-200'
          }`}>
            {job.status}
          </span>
        </div>
        
        <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <span>{job.type || job.tipe}</span>
          <span>•</span>
          <span>{job.duration || job.durasi}</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1.5 text-gray-700 font-medium">
            <Users size={16} className="text-gray-400" />
            {job.applicants} pelamar
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-gray-400" />
            Deadline: {job.deadline}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">
            Diposting: {job.posted}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-gray-200 transition" title="Lihat Detail">
          <Eye size={18} />
        </button>
        {/* Pasang onEdit disini */}
        <button 
          onClick={onEdit}
          className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg border border-gray-200 transition" 
          title="Edit Lowongan"
        >
          <Edit size={18} />
        </button>
        <button 
          onClick={onDelete}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg border border-gray-200 transition" 
          title="Hapus Lowongan"
        >
          <Trash2 size={18} />
        </button>
      </div>

    </div>
  );
}