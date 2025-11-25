import React, { useState, useEffect } from 'react';
import { X, Save, User, Info, Briefcase, DollarSign, Loader2 } from 'lucide-react';
import SuccessNotification from '../common/SuccessNotification';

export default function EditJobForm({ isOpen, onClose, jobData, onSave }) {
  // State Form (Struktur data SAMA PERSIS dengan CreateJob.jsx)
  const [formData, setFormData] = useState({
    judul: '',
    perusahaan: '',
    lokasi: '',
    departemen: '',
    tipe: '',
    mode: '',
    level: '',
    deadline: '',
    durasi: '',
    gajiMin: '',
    gajiMax: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    deskripsi: '',
    tanggungJawab: '',
    persyaratan: '',
    benefit: ''
  });

  // State untuk UI Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load data saat modal dibuka
  useEffect(() => {
    if (jobData) {
      setFormData({
        ...formData, // Default values
        ...jobData   // Override dengan data dari props
      });
    }
  }, [jobData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi proses update API
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);

      // Tunggu sebentar agar notifikasi terlihat sebelum modal ditutup
      setTimeout(() => {
        onSave(formData);
        setShowSuccess(false); // Reset state
      }, 2000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Notifikasi Sukses */}
      {showSuccess && (
        <SuccessNotification 
          message="Lowongan berhasil diperbarui!" 
          onClose={() => setShowSuccess(false)} 
        />
      )}

      {/* MODAL SIZE: Diperbesar jadi max-w-4xl */}
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white rounded-t-2xl sticky top-0 z-10">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Edit Lowongan</h3>
            <p className="text-sm text-gray-500">Perbarui informasi lowongan pekerjaan</p>
          </div>
          <button onClick={onClose} disabled={isLoading} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition disabled:opacity-50">
            <X size={24} />
          </button>
        </div>

        {/* Content (Scrollable) */}
        <div className="p-8 overflow-y-auto space-y-8">
          
          {/* 1. Informasi Dasar */}
          <section className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Info size={16} className="text-blue-600" /> Informasi Dasar
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Job Title *" name="judul" value={formData.judul} onChange={handleChange} placeholder="e.g. Social Media Intern" />
              <InputGroup label="Company Name *" name="perusahaan" value={formData.perusahaan} onChange={handleChange} placeholder="e.g. Relock Corp" />
              
              <InputGroup label="Location *" name="lokasi" value={formData.lokasi} onChange={handleChange} placeholder="e.g. Jakarta" />
              <InputGroup label="Department *" name="departemen" value={formData.departemen} onChange={handleChange} placeholder="e.g. Marketing" />

              <InputGroup label="Application Deadline *" name="deadline" type="date" value={formData.deadline} onChange={handleChange} />
              <InputGroup label="Duration *" name="durasi" value={formData.durasi} onChange={handleChange} placeholder="e.g. 3 Months" />
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 2. Detail Pekerjaan */}
          <section className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Briefcase size={16} className="text-blue-600" /> Job Details
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SelectGroup 
                label="Job Type" name="tipe" value={formData.tipe} onChange={handleChange}
                options={["Full Time", "Part Time", "Contract", "Freelance", "Internship"]}
              />
              <SelectGroup 
                label="Work Mode" name="mode" value={formData.mode} onChange={handleChange}
                options={["On-site", "Remote", "Hybrid"]}
              />
              <SelectGroup 
                label="Seniority Level" name="level" value={formData.level} onChange={handleChange}
                options={["1st year college student", "2nd year college student", "3th year college student", "4th year college student", "Fresh Graduate (< 1 Year)", "Entry Level"]}
              />
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 3. Rentang Gaji */}
          <section className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <DollarSign size={16} className="text-blue-600" /> Salary Range (IDR)
            </h4>
            <div className="grid grid-cols-2 gap-6">
              <InputGroup label="Minimum" name="gajiMin" type="number" value={formData.gajiMin} onChange={handleChange} placeholder="0" />
              <InputGroup label="Maximum" name="gajiMax" type="number" value={formData.gajiMax} onChange={handleChange} placeholder="0" />
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 4. Kontak Person */}
          <section className="space-y-4">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <User size={16} className="text-blue-600" /> Contact Person
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputGroup label="Full Name" name="contactName" value={formData.contactName} onChange={handleChange} />
              <InputGroup label="Email" name="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} />
              <InputGroup label="Phone" name="contactPhone" type="tel" value={formData.contactPhone} onChange={handleChange} />
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 5. Deskripsi (Textareas) */}
          <section className="space-y-6">
            <TextAreaGroup label="Job Description *" name="deskripsi" value={formData.deskripsi} onChange={handleChange} rows={4} placeholder="Describe the job position..." />
            <TextAreaGroup label="Responsibilities *" name="tanggungJawab" value={formData.tanggungJawab} onChange={handleChange} rows={4} placeholder="- Task 1..." />
            <TextAreaGroup label="Requirements *" name="persyaratan" value={formData.persyaratan} onChange={handleChange} rows={4} placeholder="- Skill 1..." />
            <TextAreaGroup label="Benefits & Facilities" name="benefit" value={formData.benefit} onChange={handleChange} rows={3} placeholder="- Benefit 1..." />
          </section>

        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3 sticky bottom-0 z-10">
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2.5 text-sm font-bold text-white bg-[#155DFC] rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Update Vacancy
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

// --- Helper Inputs ---
function InputGroup({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-gray-700 uppercase">{label}</label>
      <input 
        type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none"
      />
    </div>
  );
}

function SelectGroup({ label, name, value, onChange, options }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-gray-700 uppercase">{label}</label>
      <select 
        name={name} value={value} onChange={onChange}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition outline-none cursor-pointer appearance-none"
      >
        <option value="">Select...</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function TextAreaGroup({ label, name, value, onChange, rows, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-gray-700 uppercase">{label}</label>
      <textarea 
        name={name} value={value} onChange={onChange} rows={rows} placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none outline-none"
      />
    </div>
  );
}