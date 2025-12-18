import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Mail, Phone, MapPin, Linkedin, 
  Edit, Briefcase, Users, GraduationCap, 
  Award, MapPinned, Clock, Link as LinkIcon, 
  FileText, Camera, Upload, Loader2, Save, X, Plus, Trash2
} from 'lucide-react';
import { candidateApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function CandidateProfile() {
  const { user, updateUserPhoto } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  
  const photoInputRef = useRef(null);
  const cvInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await candidateApi.getProfile();
      // Handle both wrapped (response.data) and unwrapped response formats
      const profileData = response.data || response;
      setProfile(profileData);
      setEditData(profileData);
    } catch (err) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingPhoto(true);
      const response = await candidateApi.uploadPhoto(file);
      setProfile(prev => ({ ...prev, photo_url: response.photo_url }));
      // Update photo in AuthContext so navbar updates immediately
      if (updateUserPhoto) {
        updateUserPhoto(response.photo_url);
      }
    } catch (err) {
      alert(err.message || 'Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleCvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingCv(true);
      const response = await candidateApi.uploadCv(file);
      setProfile(prev => ({ ...prev, cv_url: response.cv_url, cv_path: response.cv_path }));
      alert('CV uploaded successfully!');
    } catch (err) {
      alert(err.message || 'Failed to upload CV');
    } finally {
      setUploadingCv(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await candidateApi.updateProfile({
        first_name: editData.first_name,
        last_name: editData.last_name,
        phone: editData.phone,
        linkedin: editData.linkedin,
        location: editData.location,
        about: editData.about,
        role: editData.role,
        skills: editData.skills,
        experiences: editData.experiences,
        organizations: editData.organizations,
        education: editData.education,
        preferred_location: editData.preferred_location,
        experience_level: editData.experience_level,
        portfolio_link: editData.portfolio_link,
      });
      setProfile(editData);
      setIsEditing(false);
      alert('Profile saved successfully!');
    } catch (err) {
      alert(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const addArrayItem = (field, template) => {
    setEditData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), template]
    }));
  };

  const updateArrayItem = (field, index, key, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => 
        i === index ? { ...item, [key]: value } : item
      )
    }));
  };

  const removeArrayItem = (field, index) => {
    setEditData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={fetchProfile} className="text-blue-600 hover:underline">
            Try again
          </button>
        </div>
      </div>
    );
  }

  const displayData = isEditing ? editData : profile;

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-8">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* --- LEFT SIDEBAR --- */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              
              {/* Profile Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4 border-2 border-white shadow-sm overflow-hidden">
                    {profile?.photo_url ? (
                      <img src={profile.photo_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={40} />
                    )}
                  </div>
                  <button 
                    onClick={() => photoInputRef.current?.click()}
                    disabled={uploadingPhoto}
                    className="absolute bottom-3 right-0 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  >
                    {uploadingPhoto ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
                  </button>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{displayData?.full_name}</h2>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.role || ''}
                    onChange={(e) => handleEditChange('role', e.target.value)}
                    className="mt-1 p-1 border rounded text-sm text-center w-full"
                    placeholder="Your role/title"
                  />
                ) : (
                  <p className="text-gray-500 text-sm">{displayData?.role || 'No role set'}</p>
                )}
              </div>

              {/* Edit Button */}
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`w-full py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition mb-8 ${
                  isEditing 
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-[#155DFC] text-white hover:bg-blue-700'
                }`}
              >
                {isEditing ? <X size={16} /> : <Edit size={16} />}
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>

              {/* About */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3">About</h3>
                {isEditing ? (
                  <textarea
                    value={editData.about || ''}
                    onChange={(e) => handleEditChange('about', e.target.value)}
                    className="w-full p-2 border rounded-lg text-sm"
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {displayData?.about || 'No description yet'}
                  </p>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail size={18} className="text-blue-600 shrink-0" />
                    <span className="truncate">{user?.email}</span>
                  </div>
                  
                  {isEditing ? (
                    <>
                      <div className="flex items-center gap-3">
                        <Phone size={18} className="text-blue-600 shrink-0" />
                        <input
                          type="tel"
                          value={editData.phone || ''}
                          onChange={(e) => handleEditChange('phone', e.target.value)}
                          className="flex-1 p-1.5 border rounded text-sm"
                          placeholder="Phone number"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Linkedin size={18} className="text-blue-600 shrink-0" />
                        <input
                          type="text"
                          value={editData.linkedin || ''}
                          onChange={(e) => handleEditChange('linkedin', e.target.value)}
                          className="flex-1 p-1.5 border rounded text-sm"
                          placeholder="LinkedIn URL"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin size={18} className="text-blue-600 shrink-0" />
                        <input
                          type="text"
                          value={editData.location || ''}
                          onChange={(e) => handleEditChange('location', e.target.value)}
                          className="flex-1 p-1.5 border rounded text-sm"
                          placeholder="Location"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Phone size={18} className="text-blue-600 shrink-0" />
                        <span>{displayData?.phone || '-'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Linkedin size={18} className="text-blue-600 shrink-0" />
                        <span className="truncate">{displayData?.linkedin || '-'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <MapPin size={18} className="text-blue-600 shrink-0" />
                        <span>{displayData?.location || '-'}</span>
                      </div>
                    </>
                  )}
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
                  {isEditing && (
                    <button
                      onClick={() => {
                        const skill = prompt('Enter new skill:');
                        if (skill) {
                          handleEditChange('skills', [...(editData.skills || []), skill]);
                        }
                      }}
                      className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
                    >
                      <Plus size={16} /> Add Skill
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(displayData?.skills || []).map((skill, idx) => (
                    <span key={idx} className="px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg flex items-center gap-2">
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => handleEditChange('skills', editData.skills.filter((_, i) => i !== idx))}
                          className="text-blue-500 hover:text-red-500"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </span>
                  ))}
                  {(!displayData?.skills || displayData.skills.length === 0) && (
                    <span className="text-gray-400 text-sm">No skills added yet</span>
                  )}
                </div>
              </section>

              {/* 2. WORK EXPERIENCE */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="text-blue-600" size={20} />
                    <h3 className="text-lg font-bold text-gray-900">Work Experience</h3>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => addArrayItem('experiences', { company: '', position: '', start_date: '', end_date: '', description: '' })}
                      className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
                    >
                      <Plus size={16} /> Add Experience
                    </button>
                  )}
                </div>
                {(displayData?.experiences || []).map((exp, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-4 relative">
                    {isEditing && (
                      <button
                        onClick={() => removeArrayItem('experiences', idx)}
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    {isEditing ? (
                      <div className="space-y-3 pr-8">
                        <input
                          value={exp.position || ''}
                          onChange={(e) => updateArrayItem('experiences', idx, 'position', e.target.value)}
                          className="w-full p-2 border rounded text-sm font-bold"
                          placeholder="Position"
                        />
                        <input
                          value={exp.company || ''}
                          onChange={(e) => updateArrayItem('experiences', idx, 'company', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                          placeholder="Company"
                        />
                        <div className="flex gap-2">
                          <input
                            type="date"
                            value={exp.start_date || ''}
                            onChange={(e) => updateArrayItem('experiences', idx, 'start_date', e.target.value)}
                            className="flex-1 p-2 border rounded text-sm"
                          />
                          <input
                            type="date"
                            value={exp.end_date || ''}
                            onChange={(e) => updateArrayItem('experiences', idx, 'end_date', e.target.value)}
                            className="flex-1 p-2 border rounded text-sm"
                            placeholder="Present"
                          />
                        </div>
                        <textarea
                          value={exp.description || ''}
                          onChange={(e) => updateArrayItem('experiences', idx, 'description', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                          rows={2}
                          placeholder="Description"
                        />
                      </div>
                    ) : (
                      <>
                        <h4 className="font-bold text-gray-900 text-base mb-1">{exp.position}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <Briefcase size={14} /> {exp.company}
                          <span className="mx-1">•</span>
                          <Clock size={14} /> {exp.start_date} - {exp.end_date || 'Present'}
                        </div>
                        <p className="text-gray-600 text-sm">{exp.description}</p>
                      </>
                    )}
                  </div>
                ))}
                {(!displayData?.experiences || displayData.experiences.length === 0) && (
                  <p className="text-gray-400 text-sm">No experience added yet</p>
                )}
              </section>

              {/* 3. ORGANIZATIONAL */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="text-blue-600" size={20} />
                    <h3 className="text-lg font-bold text-gray-900">Organizational</h3>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => addArrayItem('organizations', { role: '', organization: '', description: '' })}
                      className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
                    >
                      <Plus size={16} /> Add Organization
                    </button>
                  )}
                </div>
                {(displayData?.organizations || []).map((org, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-4 relative">
                    {isEditing && (
                      <button
                        onClick={() => removeArrayItem('organizations', idx)}
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    {isEditing ? (
                      <div className="space-y-3 pr-8">
                        <input
                          value={org.role || ''}
                          onChange={(e) => updateArrayItem('organizations', idx, 'role', e.target.value)}
                          className="w-full p-2 border rounded text-sm font-bold"
                          placeholder="Role"
                        />
                        <input
                          value={org.organization || ''}
                          onChange={(e) => updateArrayItem('organizations', idx, 'organization', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                          placeholder="Organization"
                        />
                        <textarea
                          value={org.description || ''}
                          onChange={(e) => updateArrayItem('organizations', idx, 'description', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                          rows={2}
                          placeholder="Description"
                        />
                      </div>
                    ) : (
                      <>
                        <h4 className="font-bold text-gray-900 text-base mb-1">{org.role}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <Users size={14} /> {org.organization}
                        </div>
                        <p className="text-gray-600 text-sm">{org.description}</p>
                      </>
                    )}
                  </div>
                ))}
                {(!displayData?.organizations || displayData.organizations.length === 0) && (
                  <p className="text-gray-400 text-sm">No organizations added yet</p>
                )}
              </section>

              {/* 4. EDUCATION */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="text-blue-600" size={20} />
                    <h3 className="text-lg font-bold text-gray-900">Education</h3>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => addArrayItem('education', { institution: '', degree: '', field: '', start_year: '', end_year: '' })}
                      className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
                    >
                      <Plus size={16} /> Add Education
                    </button>
                  )}
                </div>
                {(displayData?.education || []).map((edu, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-5 mb-4 relative">
                    {isEditing && (
                      <button
                        onClick={() => removeArrayItem('education', idx)}
                        className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    {isEditing ? (
                      <div className="space-y-3 pr-8">
                        <input
                          value={edu.institution || ''}
                          onChange={(e) => updateArrayItem('education', idx, 'institution', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                          placeholder="Institution"
                        />
                        <div className="flex gap-2">
                          <input
                            value={edu.degree || ''}
                            onChange={(e) => updateArrayItem('education', idx, 'degree', e.target.value)}
                            className="flex-1 p-2 border rounded text-sm"
                            placeholder="Degree"
                          />
                          <input
                            value={edu.field || ''}
                            onChange={(e) => updateArrayItem('education', idx, 'field', e.target.value)}
                            className="flex-1 p-2 border rounded text-sm"
                            placeholder="Field of Study"
                          />
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={edu.start_year || ''}
                            onChange={(e) => updateArrayItem('education', idx, 'start_year', e.target.value)}
                            className="flex-1 p-2 border rounded text-sm"
                            placeholder="Start Year"
                          />
                          <input
                            type="number"
                            value={edu.end_year || ''}
                            onChange={(e) => updateArrayItem('education', idx, 'end_year', e.target.value)}
                            className="flex-1 p-2 border rounded text-sm"
                            placeholder="End Year"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <h4 className="font-bold text-gray-900 text-base mb-1">{edu.degree} in {edu.field}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <GraduationCap size={14} /> {edu.institution}
                          <span className="mx-1">•</span>
                          <Clock size={14} /> {edu.start_year} - {edu.end_year || 'Present'}
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {(!displayData?.education || displayData.education.length === 0) && (
                  <p className="text-gray-400 text-sm">No education added yet</p>
                )}
              </section>

              {/* 5. JOB PREFERENCES */}
              <section className="mb-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Job Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                    <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                      <MapPinned size={18} />
                      Preferred Location
                    </div>
                    {isEditing ? (
                      <input
                        value={editData.preferred_location || ''}
                        onChange={(e) => handleEditChange('preferred_location', e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                        placeholder="e.g., Jakarta, Bandung"
                      />
                    ) : (
                      <p className="text-blue-600 text-sm">{displayData?.preferred_location || '-'}</p>
                    )}
                  </div>

                  <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
                    <div className="flex items-center gap-2 text-purple-700 font-semibold mb-2">
                      <Briefcase size={18} />
                      Experience Level
                    </div>
                    {isEditing ? (
                      <select
                        value={editData.experience_level || ''}
                        onChange={(e) => handleEditChange('experience_level', e.target.value)}
                        className="w-full p-2 border rounded text-sm"
                      >
                        <option value="">Select level</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior">Senior</option>
                        <option value="Lead">Lead</option>
                        <option value="Manager">Manager</option>
                      </select>
                    ) : (
                      <p className="text-purple-600 text-sm">{displayData?.experience_level || '-'}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* 6. RESUME & PORTFOLIO */}
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="text-blue-600" size={20} />
                  <h3 className="text-lg font-bold text-gray-900">Resume & Portfolio</h3>
                </div>
                
                <div className="space-y-4">
                  {/* CV Upload */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Resume / CV</p>
                        {profile?.cv_url ? (
                          <a 
                            href={profile.cv_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm hover:underline flex items-center gap-1"
                          >
                            <FileText size={14} />
                            View uploaded CV
                          </a>
                        ) : (
                          <p className="text-gray-500 text-sm">No CV uploaded yet</p>
                        )}
                      </div>
                      <button
                        onClick={() => cvInputRef.current?.click()}
                        disabled={uploadingCv}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:bg-blue-400"
                      >
                        {uploadingCv ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                        {uploadingCv ? 'Uploading...' : 'Upload CV'}
                      </button>
                      <input
                        ref={cvInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleCvUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Portfolio Link */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Portfolio / Website Link</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                      {isEditing ? (
                        <input 
                          type="text" 
                          value={editData.portfolio_link || ''}
                          onChange={(e) => handleEditChange('portfolio_link', e.target.value)}
                          placeholder="https://your-portfolio.com"
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <input 
                          type="text" 
                          readOnly
                          value={displayData?.portfolio_link || ''}
                          placeholder="No portfolio link"
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer Action */}
              {isEditing && (
                <div className="flex justify-end pt-4 border-t border-gray-100 gap-3">
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setEditData(profile);
                    }}
                    className="px-6 py-2.5 rounded-lg text-sm font-bold border border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#155DFC] hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition flex items-center gap-2 disabled:bg-blue-400"
                  >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
