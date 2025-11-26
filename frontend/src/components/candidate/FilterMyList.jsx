import { X } from 'lucide-react';
import React, { useState } from 'react'; // <-- 1. Import useState

export default function FilterMyList({ onClose, onApplyFilters }) { // <-- 2. Tambah prop onApplyFilters
  
  // Data dummy
  const locations = ["Malang", "Jakarta", "Remote", "Hybrid"];
  const jobTypes = ["Internship", "Fulltime", "Freshgraduate", "Senior"];

  // --- 3. State untuk mencatat apa yang dipilih ---
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

  // --- 4. Fungsi untuk menangani centang lokasi ---
  const handleLocationChange = (location) => {
    // Cek apakah sudah ada di array
    if (selectedLocations.includes(location)) {
      // Jika ada, buang dari array (uncheck)
      setSelectedLocations(selectedLocations.filter((loc) => loc !== location));
    } else {
      // Jika tidak ada, tambahkan ke array (check)
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  // --- 5. Fungsi untuk menangani centang tipe pekerjaan ---
  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // --- 6. Fungsi saat tombol Apply diklik ---
  const handleApply = () => {
    // Kirim data filter ke 'induk' (MyJobList)
    onApplyFilters({
      locations: selectedLocations,
      types: selectedTypes
    });
  };

  // --- 7. Fungsi Reset ---
  const handleReset = () => {
    setSelectedLocations([]);
    setSelectedTypes([]);
    // Kita juga kirim data kosong ke induk agar filternya bersih
    onApplyFilters({
      locations: [],
      types: []
    });
  }

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40 flex justify-center items-center transition-opacity">
      <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 z-50 transform transition-all">
        
        {/* Header filter */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Isi Opsi Filter */}
        <div className="py-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Bagian Lokasi */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Location</h3>
            <div className="grid grid-cols-2 gap-3">
              {locations.map((loc) => (
                <label key={loc} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="form-checkbox text-blue-600 rounded" 
                    checked={selectedLocations.includes(loc)} // <-- 8. Set status checked
                    onChange={() => handleLocationChange(loc)} // <-- 9. Set onChange
                  />
                  <span className="text-sm font-medium text-gray-700">{loc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bagian Tipe Pekerjaan */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Job Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {jobTypes.map((type) => (
                <label key={type} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="form-checkbox text-blue-600 rounded" 
                    checked={selectedTypes.includes(type)} // <-- 8. Set status checked
                    onChange={() => handleTypeChange(type)} // <-- 9. Set onChange
                  />
                  <span className="text-sm font-medium text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Tombol Aksi (Footer) */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
          <button 
            onClick={handleReset} // <-- 10. Ganti onClick
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-50 transition"
          >
            Reset
          </button>
          <button 
            onClick={handleApply} // <-- 10. Ganti onClick
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-sm font-bold text-white hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}