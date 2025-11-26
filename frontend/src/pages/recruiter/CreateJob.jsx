import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import {
  ArrowLeft,
  Info,
  Briefcase,
  DollarSign,
  MapPin,
  Building,
  CheckSquare,
  Loader2,
  User, 
} from "lucide-react";

import FormInput from "../../components/common/FormInput.jsx";
import FormTextarea from "../../components/common/FormTextArea.jsx";
import SuccessNotification from "../../components/common/SuccessNotification.jsx";

// --- PLACEHOLDERS ---
const descPlaceholder =
  "Describe the job position, key responsibilities, and work environment...";
const respPlaceholder =
  "- Develop and maintain web applications\n- Collaborate with design team...";
const reqPlaceholder =
  "- Minimum 3 years of experience in React\n- Proficient in TypeScript...";
const benefitPlaceholder =
  "- Health insurance\n- Transport allowance...";

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
        className="w-full bg-gray-50 border-gray-200 rounded-lg px-4 py-2.5 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function CreateJob() {
  const navigate = useNavigate(); // 2. Inisialisasi hook navigasi

  // State Data Form
  const [formData, setFormData] = useState({
    judul: "",
    perusahaan: "",
    lokasi: "",
    departemen: "",
    tipe: "Full Time",
    mode: "On-site",
    level: "1st year college student",
    deadline: "",
    durasi: "",
    gajiMin: "",
    gajiMax: "",
    // Contact Person Data
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    
    deskripsi: "",
    tanggungJawab: "",
    persyaratan: "",
    benefit: "",
  });

  // State UI
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // Validasi Form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.judul.trim()) newErrors.judul = "Job title is required";
    if (!formData.perusahaan.trim()) newErrors.perusahaan = "Company name is required";
    if (!formData.lokasi.trim()) newErrors.lokasi = "Location is required";
    if (!formData.departemen.trim()) newErrors.departemen = "Department is required";
    if (!formData.deadline) newErrors.deadline = "Deadline is required";
    if (!formData.durasi.trim()) newErrors.durasi = "Duration is required";
    
    // Validasi Contact Person
    if (!formData.contactName.trim()) newErrors.contactName = "Contact name is required";
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required";
    if (!formData.contactPhone.trim()) newErrors.contactPhone = "Contact phone is required";

    if (!formData.deskripsi.trim()) newErrors.deskripsi = "Description is required";
    if (!formData.tanggungJawab.trim()) newErrors.tanggungJawab = "Responsibilities are required";
    if (!formData.persyaratan.trim()) newErrors.persyaratan = "Requirements are required";
    
    if (parseInt(formData.gajiMin) < 0) newErrors.gajiMin = "Cannot be negative";
    if (parseInt(formData.gajiMax) < 0) newErrors.gajiMax = "Cannot be negative";
    if (parseInt(formData.gajiMin) > parseInt(formData.gajiMax)) {
      newErrors.gajiMin = "Min cannot be greater than Max";
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
      console.log("Data Submitted:", formData);
      setShowSuccess(true);
      setIsLoading(false);
      
      // 3. Redirect ke Dashboard setelah 2 detik (agar notifikasi terbaca dulu)
      setTimeout(() => {
        navigate('/recruiter/dashboard'); 
      }, 2000);
      
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      judul: "", perusahaan: "", lokasi: "", departemen: "",
      tipe: "Full Time", mode: "On-site", level: "1st year college student",
      deadline: "", durasi: "",
      gajiMin: "", gajiMax: "",
      contactName: "", contactEmail: "", contactPhone: "", // Reset contact
      deskripsi: "", tanggungJawab: "", persyaratan: "", benefit: "",
    });
    setErrors({});
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      
      {showSuccess && (
        <SuccessNotification 
          message="Job vacancy successfully created and published."
          onClose={() => setShowSuccess(false)}
        />
      )}

      <form className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg" onSubmit={handleSubmit}>
        
        {/* HEADER */}
        <div className="bg-blue-600 p-8 text-white rounded-t-xl">
          <button 
            type="button" 
            onClick={() => navigate('/recruiter/dashboard')} // Tambahkan navigasi ke dashboard
            className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <h1 className="text-3xl font-bold mt-4">Create New Vacancy</h1>
          <p className="text-blue-100">Fill this form to post vacancy</p>
        </div>

        {/* BODY */}
        <div className="p-8">
          {/* Basic Information */}
          <Section title="Basic Information" icon={<Info />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Job Title" name="judul"
                value={formData.judul} onChange={handleChange}
                placeholder="e.g. Social Media Intern"
                required error={errors.judul}
              />
              <FormInput
                label="Company Name" name="perusahaan"
                value={formData.perusahaan} onChange={handleChange}
                placeholder="e.g. Relock Corp"
                required error={errors.perusahaan}
              />
              <FormInput
                label="Location" name="lokasi"
                value={formData.lokasi} onChange={handleChange}
                placeholder="e.g. Jakarta, Indonesia"
                icon={<MapPin />} required error={errors.lokasi}
              />
              <FormInput
                label="Department" name="departemen"
                value={formData.departemen} onChange={handleChange}
                placeholder="e.g. Marketing"
                icon={<Building />} required error={errors.departemen}
              />
              
              <FormInput
                label="Application Deadline" name="deadline" type="date"
                value={formData.deadline} onChange={handleChange}
                required error={errors.deadline}
              />

              <FormInput
                label="Duration (e.g. 3 Months)" name="durasi"
                value={formData.durasi} onChange={handleChange}
                placeholder="e.g. 6 Months, 1 Year, or Permanent"
                required error={errors.durasi}
              />
            </div>
          </Section>

          {/* Job Details */}
          <Section title="Job Details" icon={<Briefcase />}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SelectField
                label="Job Type" name="tipe"
                value={formData.tipe} onChange={handleChange}
                options={["Full Time", "Part Time", "Contract", "Freelance", "Internship"]}
              />
              <SelectField
                label="Work Mode" name="mode"
                value={formData.mode} onChange={handleChange}
                options={["On-site", "Remote", "Hybrid"]}
              />
              <SelectField
                label="Seniority Level" name="level"
                value={formData.level} onChange={handleChange}
                options={[
                  "No Experience (First Year Student)", 
                  "Active Student (Ongoing)", 
                  "Final Year Student", 
                  "Fresh Graduate (< 1 Year)", 
                  "Entry Level (1-3 Years)"
                ]}
              />
            </div>
          </Section>

          {/* Salary Range */}
          <Section title="Salary Range" icon={<DollarSign />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Minimum Salary (IDR)" name="gajiMin" type="number"
                value={formData.gajiMin} onChange={handleChange}
                placeholder="e.g. 2000000" error={errors.gajiMin}
              />
              <FormInput
                label="Maximum Salary (IDR)" name="gajiMax" type="number"
                value={formData.gajiMax} onChange={handleChange}
                placeholder="e.g. 3500000" error={errors.gajiMax}
              />
            </div>
          </Section>

          {/* Contact Person Section (NEW) */}
          <Section title="Contact Person" icon={<User />}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput
                label="Full Name" name="contactName"
                value={formData.contactName} onChange={handleChange}
                placeholder="e.g. Sarah Wijaya"
                required error={errors.contactName}
              />
              <FormInput
                label="Email Address" name="contactEmail" type="email"
                value={formData.contactEmail} onChange={handleChange}
                placeholder="e.g. recruitment@techvision.id"
                required error={errors.contactEmail}
              />
              <FormInput
                label="Phone Number" name="contactPhone" type="tel"
                value={formData.contactPhone} onChange={handleChange}
                placeholder="e.g. +62 812-3456-7890"
                required error={errors.contactPhone}
              />
            </div>
          </Section>

          {/* Textarea */}
          <div className="space-y-6 mt-8">
            <FormTextarea
              label="Job Description" name="deskripsi"
              value={formData.deskripsi} onChange={handleChange}
              placeholder={descPlaceholder} required error={errors.deskripsi}
            />
            <FormTextarea
              label="Responsibilities" name="tanggungJawab"
              value={formData.tanggungJawab} onChange={handleChange}
              placeholder={respPlaceholder} rows={5} required error={errors.tanggungJawab}
            />
            <FormTextarea
              label="Requirements" name="persyaratan"
              value={formData.persyaratan} onChange={handleChange}
              placeholder={reqPlaceholder} rows={5} required error={errors.persyaratan}
            />
            <FormTextarea
              label="Benefits & Facilities" name="benefit"
              value={formData.benefit} onChange={handleChange}
              placeholder={benefitPlaceholder} rows={4}
            />
          </div>

          {/* Action Buttons */}
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
                  Processing...
                </>
              ) : (
                <>
                  <CheckSquare size={18} />
                  Post Vacancy
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}