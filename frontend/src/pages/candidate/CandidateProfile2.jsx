import React, { useState, useRef } from 'react';
import { 
  User, Mail, Phone, MapPin, Linkedin, 
  Edit, Briefcase, Users, GraduationCap, 
  Award, MapPinned, Clock, Link as LinkIcon, 
  FileText, PlusCircle, AlertCircle, X, Check, Save, Plus,
  Camera, Trash2, Upload
} from 'lucide-react';

export default function CandidateProfile() {
  // --- STATE DATA PROFILE UTAMA ---
  const [profile, setProfile] = useState({
    name: "New User",
    role: "Job Seeker",
    about: "", 
    email: "user@example.com",
    phone: "-",
    linkedin: "-",
    location: "-",
    skills: [], 
    experiences: [], 
    organizations: [], 
    education: [] 
  });

  // --- STATE FOTO PROFIL ---
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // --- STATE RESUME ---
  const [resumeType, setResumeType] = useState('link'); // 'link' | 'file'

  // --- STATE EDIT BASIC INFO (Sidebar) ---
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [editBasicForm, setEditBasicForm] = useState(profile);

  // --- STATE MODAL POPUP (Add/Edit Item) ---
  const [activeModal, setActiveModal] = useState(null); 
  const [editingIndex, setEditingIndex] = useState(null); // null = Add mode, number = Edit mode
  const [tempFormData, setTempFormData] = useState({}); 

  // --- HANDLERS: FOTO PROFIL ---
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // --- HANDLERS: BASIC PROFILE ---
  const handleEditBasicClick = () => {
    setEditBasicForm(profile);
    setIsEditingBasic(true);
  };

  const handleSaveBasicClick = () => {
    setProfile(prev => ({ ...prev, ...editBasicForm }));
    setIsEditingBasic(false);
  };

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setEditBasicForm(prev => ({ ...prev, [name]: value }));
  };

  // --- HANDLERS: MODAL (ADD / EDIT / DELETE ITEMS) ---
  
  // Mapping tipe modal ke key state profile
  const typeToKey = {
    'skills': 'skills',
    'experience': 'experiences',
    'organization': 'organizations',
    'education': 'education'
  };

  const openModal = (type, index = null, data = null) => {
    setActiveModal(type);
    setEditingIndex(index); // Jika index ada, masuk mode Edit

    if (index !== null && data) {
      // Populate form jika mode Edit
      if (type === 'skills') {
        setTempFormData({ newSkill: data });
      } else if (type === 'experience' || type === 'organization') {
        setTempFormData({ 
          title: data.role, 
          subtitle: type === 'experience' ? data.company : data.org, 
          date: data.date, 
          desc: data.desc 
        });
      } else if (type === 'education') {
        setTempFormData({ 
          title: data.major, 
          subtitle: data.univ, 
          date: data.date, 
          desc: data.desc 
        });
      }
    } else {
      // Reset form jika mode Add
      if (type === 'skills') {
        setTempFormData({ newSkill: '' });
      } else {
        setTempFormData({ title: '', subtitle: '', date: '', desc: '' });
      }
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditingIndex(null);
    setTempFormData({});
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setTempFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveModalData = () => {
    const key = typeToKey[activeModal];
    let newItem = {};

    // Validasi Sederhana
    if (activeModal === 'skills') {
      if (!tempFormData.newSkill?.trim()) return;
      newItem = tempFormData.newSkill;
    } else {
      if (!tempFormData.title?.trim() || !tempFormData.subtitle?.trim()) {
        alert("Mohon lengkapi data utama (Judul & Instansi)");
        return;
      }
      // Mapping input form ke struktur data profile
      if (activeModal === 'experience') {
        newItem = { role: tempFormData.title, company: tempFormData.subtitle, date: tempFormData.date, desc: tempFormData.desc };
      } else if (activeModal === 'organization') {
        newItem = { role: tempFormData.title, org: tempFormData.subtitle, date: tempFormData.date, desc: tempFormData.desc };
      } else if (activeModal === 'education') {
        newItem = { major: tempFormData.title, univ: tempFormData.subtitle, date: tempFormData.date, desc: tempFormData.desc };
      }
    }

    setProfile(prev => {
      const newList = [...prev[key]];
      if (editingIndex !== null) {
        // Update existing item
        newList[editingIndex] = newItem;
      } else {
        // Add new item
        newList.push(newItem);
      }
      return { ...prev, [key]: newList };
    });
    
    closeModal();
  };

  const deleteItem = (type, index) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      const key = typeToKey[type];
      setProfile(prev => ({
        ...prev,
        [key]: prev[key].filter((_, i) => i !== index)
      }));
    }
  };

  // Helper Component: Empty State
  const EmptyStateCard = ({ icon: Icon, title, subtitle, actionText, onClick }) => (
    <div 
      onClick={onClick}
      className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-gray-50 transition-colors group cursor-pointer"
    >
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-3 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
        <Icon size={24} />
      </div>
      <h4 className="text-gray-900 font-medium mb-1">{title}</h4>
      <p className="text-gray-500 text-sm mb-4 max-w-xs">{subtitle}</p>
      <button className="text-blue-600 text-sm font-bold flex items-center gap-2 hover:underline">
        <PlusCircle size={16} />
        {actionText}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-8">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* --- LEFT SIDEBAR (EDIT INLINE & FOTO) --- */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              
              {/* Header Image & Name */}
              <div className="flex flex-col items-center text-center mb-4">
                <div className="relative group cursor-pointer" onClick={handleImageClick}>
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-100 flex items-center justify-center text-gray-400">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={40} />
                    )}
                  </div>
                  {/* Overlay Camera Icon */}
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white">
                    <Camera size={20} />
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                </div>

                {isEditingBasic ? (
                  <div className="w-full space-y-3 mb-4 mt-4">
                    <input 
                      type="text" name="name" 
                      value={editBasicForm.name} onChange={handleBasicChange}
                      className="w-full text-center border border-blue-300 rounded px-2 py-1 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Full Name"
                    />
                    <input 
                      type="text" name="role" 
                      value={editBasicForm.role} onChange={handleBasicChange}
                      className="w-full text-center border border-blue-300 rounded px-2 py-1 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Role"
                    />
                  </div>
                ) : (
                  <div className="mt-4">
                    <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                    <p className="text-gray-500 text-sm">{profile.role}</p>
                  </div>
                )}
              </div>

              {/* Tombol Edit/Save Sidebar */}
              {isEditingBasic ? (
                <div className="flex gap-2 mb-8">
                  <button onClick={() => setIsEditingBasic(false)} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition">Cancel</button>
                  <button onClick={handleSaveBasicClick} className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition"><Save size={16} /> Save</button>
                </div>
              ) : (
                <button onClick={handleEditBasicClick} className="w-full bg-[#155DFC] text-white py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition mb-8">
                  <Edit size={16} /> Edit Profile
                </button>
              )}

              {/* About */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3">About</h3>
                {isEditingBasic ? (
                  <textarea 
                    name="about" value={editBasicForm.about} onChange={handleBasicChange}
                    className="w-full border border-blue-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  profile.about ? <p className="text-gray-600 text-sm leading-relaxed">{profile.about}</p> : 
                  <div onClick={handleEditBasicClick} className="text-center p-4 bg-gray-50 rounded-lg border border-dashed border-gray-200 cursor-pointer hover:bg-gray-100">
                    <p className="text-xs text-gray-400 italic mb-2">"Ceritakan sedikit tentang diri Anda."</p>
                    <span className="text-xs text-blue-600 font-semibold hover:underline">+ Add Summary</span>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <ContactInput isEditing={isEditingBasic} icon={Mail} name="email" value={isEditingBasic ? editBasicForm.email : profile.email} label="Email" onChange={handleBasicChange} />
                  <ContactInput isEditing={isEditingBasic} icon={Phone} name="phone" value={isEditingBasic ? editBasicForm.phone : profile.phone} label="Phone" onChange={handleBasicChange} />
                  <ContactInput isEditing={isEditingBasic} icon={Linkedin} name="linkedin" value={isEditingBasic ? editBasicForm.linkedin : profile.linkedin} label="LinkedIn" onChange={handleBasicChange} />
                  <ContactInput isEditing={isEditingBasic} icon={MapPin} name="location" value={isEditingBasic ? editBasicForm.location : profile.location} label="Location" onChange={handleBasicChange} />
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT CONTENT --- */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              
              {/* 1. SKILLS */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="text-blue-600" size={20} />
                    <h3 className="text-lg font-bold text-gray-900">Skills & Expertise</h3>
                  </div>
                  <button onClick={() => openModal('skills')} className="text-sm text-blue-600 font-medium hover:underline">+ Add Skills</button>
                </div>
                
                {profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, idx) => (
                      <span key={idx} className="px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg flex items-center gap-2 group">
                        {skill}
                        <button onClick={() => deleteItem('skills', idx)} className="text-blue-400 hover:text-blue-900 transition-opacity opacity-0 group-hover:opacity-100"><X size={14} /></button>
                      </span>
                    ))}
                  </div>
                ) : (
                  <div onClick={() => openModal('skills')} className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 cursor-pointer hover:bg-blue-50 transition">
                    <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Tambahkan Skill Anda</p>
                      <p className="text-xs text-blue-600 mt-1">Skill membantu perusahaan menemukan Anda.</p>
                    </div>
                  </div>
                )}
              </section>

              {/* 2. WORK EXPERIENCE */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="text-blue-600" size={20} />
                    <h3 className="text-lg font-bold text-gray-900">Work Experience</h3>
                  </div>
                  {profile.experiences.length > 0 && (
                    <button onClick={() => openModal('experience')} className="text-sm text-blue-600 font-medium hover:underline">+ Add</button>
                  )}
                </div>
                
                {profile.experiences.length > 0 ? (
                  profile.experiences.map((exp, idx) => (
                    <ExperienceCard 
                      key={idx} data={exp} 
                      onEdit={() => openModal('experience', idx, exp)}
                      onDelete={() => deleteItem('experience', idx)}
                    />
                  ))
                ) : (
                  <EmptyStateCard 
                    icon={Briefcase} title="Belum ada pengalaman kerja" subtitle="Tambahkan magang atau pekerjaan sebelumnya." actionText="Tambah Pengalaman"
                    onClick={() => openModal('experience')}
                  />
                )}
              </section>

              {/* 3. ORGANIZATIONAL */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="text-blue-600" size={20} />
                    <h3 className="text-lg font-bold text-gray-900">Organizational</h3>
                  </div>
                  {profile.organizations.length > 0 && (
                    <button onClick={() => openModal('organization')} className="text-sm text-blue-600 font-medium hover:underline">+ Add</button>
                  )}
                </div>

                {profile.organizations.length > 0 ? (
                  profile.organizations.map((org, idx) => (
                    <ExperienceCard 
                      key={idx} data={org} isOrg={true}
                      onEdit={() => openModal('organization', idx, org)}
                      onDelete={() => deleteItem('organization', idx)}
                    />
                  ))
                ) : (
                  <EmptyStateCard 
                    icon={Users} title="Belum ada organisasi" subtitle="Aktif di kampus? Masukkan pengalaman organisasi Anda." actionText="Tambah Organisasi"
                    onClick={() => openModal('organization')}
                  />
                )}
              </section>

              {/* 4. EDUCATION */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="text-blue-600" size={20} />
                    <h3 className="text-lg font-bold text-gray-900">Education</h3>
                  </div>
                  {profile.education.length > 0 && (
                    <button onClick={() => openModal('education')} className="text-sm text-blue-600 font-medium hover:underline">+ Add</button>
                  )}
                </div>

                {profile.education.length > 0 ? (
                  profile.education.map((edu, idx) => (
                    <EducationCard 
                      key={idx} data={edu} 
                      onEdit={() => openModal('education', idx, edu)}
                      onDelete={() => deleteItem('education', idx)}
                    />
                  ))
                ) : (
                  <EmptyStateCard 
                    icon={GraduationCap} title="Riwayat pendidikan kosong" subtitle="Tunjukkan latar belakang akademis Anda." actionText="Tambah Pendidikan"
                    onClick={() => openModal('education')}
                  />
                )}
              </section>

              {/* 5. RESUME */}
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="text-blue-600" size={20} />
                  <h3 className="text-lg font-bold text-gray-900">Resume & Portfolio</h3>
                </div>
                
                {/* Resume Toggle */}
                <div className="flex gap-4 mb-4 text-sm">
                  <button 
                    onClick={() => setResumeType('link')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${resumeType === 'link' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <LinkIcon size={16} /> Link URL
                  </button>
                  <button 
                    onClick={() => setResumeType('file')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${resumeType === 'file' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <Upload size={16} /> Upload File
                  </button>
                </div>

                <div className="space-y-2">
                  {resumeType === 'link' ? (
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input type="text" placeholder="https://behance.net/johndoe" className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition cursor-pointer">
                      <Upload size={24} className="mb-2 text-gray-400" />
                      <p className="text-sm font-medium">Click to upload Resume (PDF)</p>
                      <p className="text-xs text-gray-400 mt-1">Max size 2MB</p>
                    </div>
                  )}
                </div>
              </section>

              {/* GLOBAL SAVE BUTTON */}
              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button className="bg-[#155DFC] hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition">
                  Save All Changes
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* --- GENERIC MODAL (ADD & EDIT) --- */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 capitalize">
                {editingIndex !== null ? 'Edit' : 'Add'} {activeModal === 'skills' ? 'Skill' : activeModal}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {activeModal === 'skills' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                  <input 
                    type="text" name="newSkill"
                    value={tempFormData.newSkill || ''} onChange={handleModalChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. Figma, React"
                    autoFocus
                  />
                </div>
              ) : (
                <>
                  {/* Form Dinamis */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {activeModal === 'education' ? 'Major / Jurusan' : 'Role / Posisi'}
                    </label>
                    <input 
                      type="text" name="title"
                      value={tempFormData.title || ''} onChange={handleModalChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder={activeModal === 'education' ? 'e.g. Computer Science' : 'e.g. UI Designer'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {activeModal === 'education' ? 'University / School' : 'Company / Organization'}
                    </label>
                    <input 
                      type="text" name="subtitle"
                      value={tempFormData.subtitle || ''} onChange={handleModalChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder={activeModal === 'education' ? 'e.g. Universitas Brawijaya' : 'e.g. Google'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date / Duration</label>
                    <input 
                      type="text" name="date"
                      value={tempFormData.date || ''} onChange={handleModalChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="e.g. 2020 - Present"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      name="desc" rows={3}
                      value={tempFormData.desc || ''} onChange={handleModalChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Describe your role..."
                    />
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-2">
              <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg transition">Cancel</button>
              <button onClick={saveModalData} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// --- HELPER COMPONENTS (Updated with Edit/Delete) ---
function ContactInput({ isEditing, icon: Icon, name, value, label, onChange }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-600">
      <Icon size={18} className="text-blue-600 shrink-0" />
      {isEditing ? (
        <input 
          type="text" name={name} value={value} onChange={onChange}
          className="w-full border-b border-blue-300 focus:border-blue-600 outline-none px-1 py-0.5"
          placeholder={`Enter ${label}`}
        />
      ) : (
        value === "-" ? <span className="text-gray-400 italic">Add {label}</span> : <span className="truncate">{value}</span>
      )}
    </div>
  );
}

function ExperienceCard({ data, isOrg = false, onEdit, onDelete }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-4 group relative">
      {/* Edit/Delete Actions */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onEdit} className="p-1.5 bg-white rounded-md text-gray-500 hover:text-blue-600 shadow-sm border border-gray-200"><Edit size={14} /></button>
        <button onClick={onDelete} className="p-1.5 bg-white rounded-md text-gray-500 hover:text-red-600 shadow-sm border border-gray-200"><Trash2 size={14} /></button>
      </div>

      <h4 className="font-bold text-gray-900 text-base mb-1 pr-16">{data.role}</h4>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        {isOrg ? <Users size={14} /> : <Briefcase size={14} />} 
        {isOrg ? data.org : data.company}
        <span className="mx-1">•</span>
        <Clock size={14} /> {data.date}
      </div>
      <p className="text-gray-600 text-sm">{data.desc}</p>
    </div>
  );
}

function EducationCard({ data, onEdit, onDelete }) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-4 group relative">
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onEdit} className="p-1.5 bg-white rounded-md text-gray-500 hover:text-blue-600 shadow-sm border border-gray-200"><Edit size={14} /></button>
        <button onClick={onDelete} className="p-1.5 bg-white rounded-md text-gray-500 hover:text-red-600 shadow-sm border border-gray-200"><Trash2 size={14} /></button>
      </div>

      <h4 className="font-bold text-gray-900 text-base mb-1 pr-16">{data.major}</h4>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <GraduationCap size={14} /> {data.univ}
        <span className="mx-1">•</span>
        <Clock size={14} /> {data.date}
      </div>
      <p className="text-gray-600 text-sm">{data.desc}</p>
    </div>
  );
}