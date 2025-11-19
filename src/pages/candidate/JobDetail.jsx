import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Calendar,
  Clock,
  Bookmark,
  Mail,
  Phone,
  Check, // Tambahkan ikon Check untuk status tersimpan
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ApplyForm from "../../components/candidate/ApplyForm.jsx";

export default function JobDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isApplyFormOpen, setIsApplyFormOpen] = useState(false);
  
  // 1. STATE BOOKMARK (Default false)
  // Nanti bisa ambil status awal dari backend (apakah user sudah bookmark job ini?)
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Data Dummy
  const job = {
    title: "UI/UX Designer Intern",
    company: "TechVision Indonesia",
    location: "Malang, Indonesia",
    type: "Hybrid",
    duration: "3 Bulan",
    postedDate: "15 Oktober 2025",
    startDate: "1 November 2025",
    endDate: "31 Januari 2026",
    description:
      "Kami mencari mahasiswa/i yang passionate di bidang UI/UX Design untuk bergabung dalam tim Product Design kami. Kamu akan berkesempatan untuk belajar langsung dari para profesional dan terlibat dalam proyek-proyek nyata yang berdampak pada ribuan pengguna.",
    responsibilities: [
      "Membantu tim design dalam merancang user interface untuk aplikasi mobile dan web",
      "Melakukan riset pengguna dan analisis kompetitor",
      "Membuat wireframe, prototype, dan mockup menggunakan Figma",
      "Berkolaborasi dengan tim developer dan product manager",
      "Melakukan usability testing dan mengumpulkan feedback pengguna",
      "Membantu dalam pembuatan design system dan dokumentasi",
    ],
    requirements: [
      "Mahasiswa/i aktif minimal semester 4 dari jurusan Desain Komunikasi Visual, Informatika, Sistem Informasi, atau jurusan terkait",
      "Memiliki portfolio design (wajib)",
      "Menguasai Figma atau Adobe XD",
      "Memahami prinsip-prinsip UI/UX Design",
      "Memiliki kemampuan komunikasi yang baik",
      "Dapat bekerja dalam tim",
      "Bersedia bekerja hybrid (2x seminggu onsite di Malang)",
      "Dapat berkomitmen selama 3 bulan penuh",
    ],
    benefits: [
      "Uang saku Rp 1.500.000/bulan",
      "Sertifikat resmi magang",
      "Mentoring dari senior designer",
      "Pengalaman kerja di proyek real",
      "Networking dengan profesional industri",
      "Kesempatan diangkat menjadi karyawan tetap",
      "Lingkungan kerja yang supportive dan kolaboratif",
    ],
    contact: {
      name: "Sarah Wijaya",
      email: "recruitment@techvision.id",
      phone: "+62 812-3456-7890",
    },
  };

  // 2. FUNGSI HANDLE BOOKMARK
  const handleBookmark = () => {
    // Toggle status bookmark
    setIsBookmarked(!isBookmarked);
    
    // Simulasi Logika Backend (Opsional)
    if (!isBookmarked) {
      console.log("Lowongan disimpan ke bookmark!");
      // Di sini bisa panggil API untuk simpan bookmark
    } else {
      console.log("Lowongan dihapus dari bookmark.");
      // Di sini bisa panggil API untuk hapus bookmark
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-12">
      <main className="max-w-6xl mx-auto px-6 pt-8">
        {/* TOMBOL KEMBALI */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- KOLOM KIRI (DETAIL UTAMA) --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* HEADER CARD */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Logo */}
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden border border-gray-100">
                  <img
                    src="https://ui-avatars.com/api/?name=Tech+Vision&background=0D8ABC&color=fff"
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                      {job.type}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                      {job.duration}
                    </span>
                  </div>

                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h1>

                  <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={16} />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      {job.location}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {job.startDate} - {job.endDate}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      Diposting: {job.postedDate}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 my-6"></div>

              {/* Tombol Aksi */}
              <div className="flex gap-4">
                <button
                  onClick={() => setIsApplyFormOpen(true)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Lamar Sekarang
                </button>
                
                {/* 3. TOMBOL SIMPAN DINAMIS */}
                <button
                  onClick={handleBookmark}
                  className={`flex items-center justify-center gap-2 px-6 py-3 border rounded-lg font-semibold transition-all duration-200
                    ${isBookmarked 
                      ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" // Style saat tersimpan
                      : "border-gray-300 text-gray-700 hover:bg-gray-50" // Style default
                    }`}
                >
                  {isBookmarked ? (
                    // Tampilan saat tersimpan
                    <>
                      <Check size={20} /> {/* Ikon Centang */}
                      Tersimpan
                    </>
                  ) : (
                    // Tampilan default
                    <>
                      <Bookmark size={20} /> {/* Ikon Bookmark Biasa */}
                      Simpan
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* DESKRIPSI PEKERJAAN */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Deskripsi Pekerjaan
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {job.description}
              </p>

              <h4 className="text-md font-bold text-gray-900 mb-3">
                Tugas dan Tanggung Jawab
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-8">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <div className="border-t border-gray-100 my-8"></div>

              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Kualifikasi yang Dibutuhkan
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-8">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <div className="border-t border-gray-100 my-8"></div>

              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Benefit yang Diperoleh
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                {job.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- KOLOM KANAN (SIDEBAR) --- */}
          <div className="lg:col-span-1 space-y-6">
            {/* TENTANG PERUSAHAAN */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-md font-bold text-gray-900 mb-4">
                Tentang Perusahaan
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="https://ui-avatars.com/api/?name=Tech+Vision&background=0D8ABC&color=fff"
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{job.company}</h4>
                  <p className="text-xs text-gray-500">Teknologi</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                TechVision adalah perusahaan teknologi terkemuka yang berfokus
                pada pengembangan solusi digital inovatif untuk transformasi
                bisnis di Indonesia.
              </p>
            </div>

            {/* KONTAK PERSON */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-md font-bold text-gray-900 mb-4">
                Kontak Person
              </h3>
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Nama</p>
                <p className="text-sm font-medium text-gray-900">
                  {job.contact.name}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <a
                  href={`mailto:${job.contact.email}`}
                  className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-2"
                >
                  <Mail size={14} />
                  {job.contact.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Telepon</p>
                <a
                  href={`tel:${job.contact.phone}`}
                  className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-2"
                >
                  <Phone size={14} />
                  {job.contact.phone}
                </a>
              </div>
            </div>

            {/* INFORMASI TAMBAHAN */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-md font-bold text-gray-900 mb-4">
                Informasi Tambahan
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tipe</span>
                  <span className="font-medium text-gray-900">{job.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Durasi</span>
                  <span className="font-medium text-gray-900">
                    {job.duration}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t pt-3">
                  <span className="text-gray-500">Update Terakhir</span>
                  <span className="font-medium text-gray-900">
                    20 Oktober 2025
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Render Form Lamaran jika state terbuka */}
      {isApplyFormOpen && (
        <ApplyForm
          jobTitle={job.title}
          companyName={job.company}
          onClose={() => setIsApplyFormOpen(false)}
        />
      )}
    </div>
  );
}