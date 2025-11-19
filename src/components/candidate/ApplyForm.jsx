import React, { useState } from 'react';
import { X, FileText, Upload, Send, Loader2 } from 'lucide-react';

export default function ApplyModal({ jobTitle, companyName, onClose }) {
  const [cvOption, setCvOption] = useState('existing'); // 'existing' or 'new'
  const [existingCvName, setExistingCvName] = useState('CV_Ahmad_Rizki_2025.pdf'); // Dummy data
  const [newFile, setNewFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Ganti menjadi "ID Lowongan" di implementasi nyata
  const jobId = 999; 

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.size <= 10485760) { // Cek ukuran maksimal 10MB
      setNewFile(file);
      setCvOption('new'); // Otomatis pindah ke opsi Upload Baru
    } else {
      alert("Ukuran file melebihi batas maksimal 10MB.");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setNewFile(file);
    setCvOption('new');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Logika Validasi (Minimal pilih salah satu opsi)
    if (cvOption === 'new' && !newFile) {
      alert("Silakan unggah file CV baru atau pilih CV yang sudah ada.");
      return;
    }
    if (cvOption === 'existing' && !existingCvName) {
      alert("Anda belum memiliki CV yang disimpan.");
      return;
    }

    setIsLoading(true);
    
    // === SIMULASI API LAMARAN ===
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      console.log(`Lowongan ID ${jobId} Dilamar dengan opsi: ${cvOption}`);
      
      // Setelah sukses, modal akan tertutup otomatis setelah beberapa saat
      setTimeout(() => {
        onClose();
      }, 2500);

    }, 2000);
  };

  if (isSuccess) {
    // Tampilan Sukses (sesuai Lowongan Detail Page (10).png)
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-10 text-center animate-in zoom-in duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Send className="text-blue-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Lamaran Anda Berhasil Dikirim!</h3>
          <p className="text-gray-500">Lamaran Anda akan segera ditinjau oleh tim rekruter {companyName}.</p>
        </div>
      </div>
    );
  }

  // Tampilan Form Lamaran (Utama)
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      {/* Container Modal */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl animate-in zoom-in duration-300">
        
        {/* Header Modal */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Lamar Pekerjaan</h2>
            <p className="text-sm text-gray-500 mt-1">
              Melamar untuk: <span className='font-semibold'>{jobTitle}</span> di <span className='font-semibold'>{companyName}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-900 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <h3 className="text-base font-semibold text-gray-900">Pilih CV untuk Lamaran</h3>

            {/* Opsi 1: Gunakan CV Tersimpan */}
            <div 
              onClick={() => setCvOption('existing')}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                cvOption === 'existing' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="cv_choice" 
                  value="existing" 
                  checked={cvOption === 'existing'}
                  onChange={() => setCvOption('existing')}
                  className="form-radio text-blue-600 h-4 w-4"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">Gunakan CV dari Profil</span>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <FileText size={12} /> 
                    {existingCvName}
                  </p>
                </div>
              </label>
            </div>

            {/* Opsi 2: Unggah CV Baru */}
            <div 
              onClick={() => setCvOption('new')}
              className={`p-4 border-2 rounded-lg transition-colors ${
                cvOption === 'new' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="cv_choice" 
                  value="new" 
                  checked={cvOption === 'new'}
                  onChange={() => setCvOption('new')}
                  className="form-radio text-blue-600 h-4 w-4"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">Unggah CV Baru</span>
                  <p className="text-xs text-red-500 mt-1">Format PDF maksimal 10MB</p>
                </div>
              </label>

              {/* Drag and Drop Area */}
              {cvOption === 'new' && (
                <div
                  onDrop={handleFileDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById('file-upload').click()}
                  className={`mt-4 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    newFile ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-400'
                  }`}
                >
                  <Upload className={`mx-auto mb-2 ${newFile ? 'text-green-600' : 'text-gray-400'}`} size={32} />
                  <p className={`text-sm font-medium ${newFile ? 'text-green-700' : 'text-gray-700'}`}>
                    {newFile ? newFile.name : 'Klik untuk upload atau drag and drop'}
                  </p>
                  <p className="text-xs text-gray-500">PDF (maksimal 10MB)</p>
                  <input type="file" id="file-upload" className="hidden" accept=".pdf" onChange={handleFileSelect} />
                </div>
              )}
            </div>

          </div>

          {/* Footer Tombol Aksi */}
          <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading || (cvOption === 'new' && !newFile)}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-blue-400"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {isLoading ? 'Mengirim...' : 'Kirim Lamaran'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}