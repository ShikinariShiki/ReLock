import React, { useState } from "react";
import {
  ArrowLeft,
  Info,
  Briefcase,
  DollarSign,
  MapPin,
  Building,
  CheckSquare,
  Loader2,
} from "lucide-react";

import FormInput from "../../components/common/FormInput.jsx";
import FormTextarea from "../../components/common/FormTextArea.jsx";
import SuccessNotification from "../../components/common/SuccessNotification.jsx";

// --- PLACEHOLDERS ---
const descPlaceholder =
  "Jelaskan posisi pekerjaan, tanggung jawab utama, dan lingkungan kerja...";
const respPlaceholder =
  "- Mengembangkan dan memelihara aplikasi web\n- Berkolaborasi dengan tim desain...";
const reqPlaceholder =
  "- Minimal 3 tahun pengalaman di React\n- Menguasai TypeScript...";
const benefitPlaceholder =
  "- Asuransi kesehatan\n- Tunjangan transportasi...";

// --- HELPER COMPONENTS ---
function Section({ title, icon, children }) {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-blue-600">{React.cloneElement(icon, { size: 20 })}</span>
        <h2 className="font-bold text-gray-800 text-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-2.5 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function CreateJob() {
  // State Data Form
  const [formData, setFormData] = useState({
    judul: "",
    perusahaan: "Tech Indonesia",
    lokasi: "Jakarta, Indonesia",
    departemen: "Engineering",
    tipe: "Part Time",
    mode: "On-site",
    gajiMin: "8000000",
    gajiMax: "15000000",
    deskripsi: "",
    tanggungJawab: "",
    persyaratan: "",
    benefit: "",
  });

  // State UI (Error, Loading, Success)
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Hapus error real-time saat user mengetik
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // Validasi Form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.judul.trim()) newErrors.judul = "Judul wajib diisi";
    if (!formData.perusahaan.trim()) newErrors.perusahaan = "Perusahaan wajib diisi";
    if (!formData.lokasi.trim()) newErrors.lokasi = "Lokasi wajib diisi";
    if (!formData.departemen.trim()) newErrors.departemen = "Departemen wajib diisi";
    if (!formData.deskripsi.trim()) newErrors.deskripsi = "Deskripsi wajib diisi";
    if (!formData.tanggungJawab.trim()) newErrors.tanggungJawab = "Tanggung jawab wajib diisi";
    if (!formData.persyaratan.trim()) newErrors.persyaratan = "Persyaratan wajib diisi";
    
    if (parseInt(formData.gajiMin) < 0) newErrors.gajiMin = "Tidak boleh minus";
    if (parseInt(formData.gajiMax) < 0) newErrors.gajiMax = "Tidak boleh minus";
    if (parseInt(formData.gajiMin) > parseInt(formData.gajiMax)) {
      newErrors.gajiMin = "Min tidak boleh > Max";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsLoading(true);

    // Simulasi API Call
    setTimeout(() => {
      console.log("Data Terkirim:", formData);
      setShowSuccess(true); // Munculkan notifikasi
      setIsLoading(false);
      handleReset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      judul: "", perusahaan: "", lokasi: "", departemen: "",
      tipe: "Part Time", mode: "On-site", gajiMin: "", gajiMax: "",
      deskripsi: "", tanggungJawab: "", persyaratan: "", benefit: "",
    });
    setErrors({});
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      
      {/* Notifikasi Sukses */}
      {showSuccess && (
        <SuccessNotification 
          message="Lowongan kerja berhasil dibuat dan dipublikasikan."
          onClose={() => setShowSuccess(false)}
        />
      )}

      <form className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg" onSubmit={handleSubmit}>
        
        {/* HEADER BIRU (Menyatu) */}
        <div className="bg-blue-600 p-8 text-white rounded-t-xl">
          <button type="button" className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100">
            <ArrowLeft size={18} /> Kembali
          </button>
          <h1 className="text-3xl font-bold mt-4">Create New Vacancy</h1>
          <p className="text-blue-100">Fill this form to post vacancy</p>
        </div>

        {/* BODY FORM */}
        <div className="p-8">
          {/* Informasi Dasar */}
          <Section title="Informasi Dasar" icon={<Info />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Judul Pekerjaan" name="judul"
                value={formData.judul} onChange={handleChange}
                placeholder="e.g. Senior Software Engineer"
                required error={errors.judul}
              />
              <FormInput
                label="Nama Perusahaan" name="perusahaan"
                value={formData.perusahaan} onChange={handleChange}
                placeholder="e.g. Tech Indonesia"
                required error={errors.perusahaan}
              />
              <FormInput
                label="Lokasi" name="lokasi"
                value={formData.lokasi} onChange={handleChange}
                placeholder="e.g. Jakarta, Indonesia"
                icon={<MapPin />} required error={errors.lokasi}
              />
              <FormInput
                label="Departemen" name="departemen"
                value={formData.departemen} onChange={handleChange}
                placeholder="e.g. Engineering"
                icon={<Building />} required error={errors.departemen}
              />
            </div>
          </Section>

          {/* Detail Pekerjaan */}
          <Section title="Detail Pekerjaan" icon={<Briefcase />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectField
                label="Tipe Pekerjaan" name="tipe"
                value={formData.tipe} onChange={handleChange}
                options={["Part Time", "Full Time", "Internship", "Contract"]}
              />
              <SelectField
                label="Mode Kerja" name="mode"
                value={formData.mode} onChange={handleChange}
                options={["On-site", "Remote", "Hybrid"]}
              />
            </div>
          </Section>

          {/* Rentang Gaji */}
          <Section title="Rentang Gaji" icon={<DollarSign />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Gaji Minimum (IDR)" name="gajiMin" type="number"
                value={formData.gajiMin} onChange={handleChange}
                placeholder="e.g. 8000000" error={errors.gajiMin}
              />
              <FormInput
                label="Gaji Maksimum (IDR)" name="gajiMax" type="number"
                value={formData.gajiMax} onChange={handleChange}
                placeholder="e.g. 15000000" error={errors.gajiMax}
              />
            </div>
          </Section>

          {/* Textarea */}
          <div className="space-y-6 mt-8">
            <FormTextarea
              label="Deskripsi Pekerjaan" name="deskripsi"
              value={formData.deskripsi} onChange={handleChange}
              placeholder={descPlaceholder} required error={errors.deskripsi}
            />
            <FormTextarea
              label="Tanggung Jawab" name="tanggungJawab"
              value={formData.tanggungJawab} onChange={handleChange}
              placeholder={respPlaceholder} rows={5} required error={errors.tanggungJawab}
            />
            <FormTextarea
              label="Persyaratan" name="persyaratan"
              value={formData.persyaratan} onChange={handleChange}
              placeholder={reqPlaceholder} rows={5} required error={errors.persyaratan}
            />
            <FormTextarea
              label="Benefit & Fasilitas" name="benefit"
              value={formData.benefit} onChange={handleChange}
              placeholder={benefitPlaceholder} rows={4}
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-4 mt-8 pt-8 border-t">
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-bold text-sm disabled:opacity-50"
            >
              Reset Form
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 flex items-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <CheckSquare size={18} />
                  Posting Lowongan
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}