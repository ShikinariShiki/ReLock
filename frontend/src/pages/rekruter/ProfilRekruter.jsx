import React, { useState, useEffect } from 'react';
import { 
  Building2, MapPin, Globe, Phone, Mail, 
  Edit, Target, Award, Camera, Loader2, Save, X, AlertCircle
} from 'lucide-react';
import { recruiterApi } from '../../services/api.js';

export default function RecruiterProfile() {
  // API states
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // Edit modes
  const [editMode, setEditMode] = useState(null); // 'header', 'description', 'vision', 'mission'
  
  // Form data
  const [formData, setFormData] = useState({
    company_name: '',
    company_website: '',
    phone: '',
    location: '',
    company_description: '',
    vision: '',
    mission: '',
    industry: '',
    tagline: '',
  });
  
  // Photo upload
  const [uploading, setUploading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await recruiterApi.getProfile();
        const recruiter = response.recruiter || response;
        setProfile(recruiter);
        setFormData({
          company_name: recruiter.company_name || '',
          company_website: recruiter.company_website || '',
          phone: recruiter.phone || '',
          location: recruiter.location || '',
          company_description: recruiter.company_description || '',
          vision: recruiter.vision || '',
          mission: recruiter.mission || '',
          industry: recruiter.industry || '',
          tagline: recruiter.tagline || '',
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle logo upload
  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload
    try {
      setUploading(true);
      const response = await recruiterApi.uploadLogo(file);
      setProfile(prev => ({
        ...prev,
        logo_url: response.logo_url,
        company_logo: response.logo_path,
      }));
      setLogoPreview(null);
    } catch (err) {
      console.error('Error uploading logo:', err);
      alert(err.message || 'Failed to upload logo');
      setLogoPreview(null);
    } finally {
      setUploading(false);
    }
  };

  // Handle save
  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await recruiterApi.updateProfile(formData);
      const updatedRecruiter = response.recruiter || response;
      setProfile(updatedRecruiter);
      setEditMode(null);
    } catch (err) {
      console.error('Error saving profile:', err);
      alert(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setFormData({
      company_name: profile.company_name || '',
      company_website: profile.company_website || '',
      phone: profile.phone || '',
      location: profile.location || '',
      company_description: profile.company_description || '',
      vision: profile.vision || '',
      mission: profile.mission || '',
      industry: profile.industry || '',
      tagline: profile.tagline || '',
    });
    setEditMode(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const getLogoUrl = () => {
    if (logoPreview) return logoPreview;
    if (profile?.logo_url) return profile.logo_url;
    const name = profile?.company_name || 'Company';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&size=128`;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans py-8">
      <div className="max-w-5xl mx-auto px-6 space-y-6">

        {/* --- HEADER CARD --- */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm relative">
          {/* Edit/Save Button */}
          {editMode === 'header' ? (
            <div className="absolute top-8 right-8 flex gap-2">
              <button 
                onClick={handleCancel}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <X size={20} />
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition disabled:opacity-50"
              >
                {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setEditMode('header')}
              className="absolute top-8 right-8 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
            >
              <Edit size={20} />
            </button>
          )}

          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Logo with upload */}
            <div className="relative group">
              <div className="w-32 h-32 bg-white border border-gray-200 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm p-4 overflow-hidden">
                {uploading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                ) : (
                  <img 
                    src={getLogoUrl()} 
                    alt="Company Logo" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                )}
              </div>
              <label className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center">
                <Camera className="text-white" size={32} />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
            
            <div className="flex-1 w-full">
              {editMode === 'header' ? (
                // Edit form
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        value={formData.company_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <input
                        type="text"
                        value={formData.industry}
                        onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Technology, Healthcare"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Short company tagline"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={profile?.user?.email || ''}
                        disabled
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="url"
                        value={formData.company_website}
                        onChange={(e) => setFormData(prev => ({ ...prev, company_website: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // View mode
                <>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-gray-900">{profile?.company_name || 'Company Name'}</h1>
                    {(profile?.industry || formData.industry) && (
                      <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                        {profile?.industry || formData.industry}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {profile?.tagline || formData.tagline || 'Add a company tagline...'}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Mail size={18} className="text-blue-600 shrink-0" />
                      <span className="truncate">{profile?.user?.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Globe size={18} className="text-blue-600 shrink-0" />
                      <span className="truncate">{profile?.company_website || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone size={18} className="text-blue-600 shrink-0" />
                      <span>{profile?.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <MapPin size={18} className="text-blue-600 shrink-0" />
                      <span>{profile?.location || 'N/A'}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* --- COMPANY DESCRIPTION --- */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm relative">
          {editMode === 'description' ? (
            <div className="absolute top-8 right-8 flex gap-2">
              <button 
                onClick={handleCancel}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <X size={20} />
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition disabled:opacity-50"
              >
                {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setEditMode('description')}
              className="absolute top-8 right-8 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
            >
              <Edit size={20} />
            </button>
          )}

          <div className="flex items-center gap-3 mb-6">
            <Building2 className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">About Company</h3>
          </div>
          
          {editMode === 'description' ? (
            <textarea
              value={formData.company_description}
              onChange={(e) => setFormData(prev => ({ ...prev, company_description: e.target.value }))}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Describe your company..."
            />
          ) : (
            <p className="text-gray-600 leading-relaxed text-base">
              {profile?.company_description || 'Add a company description...'}
            </p>
          )}
        </div>

        {/* --- VISION & MISSION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vision */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col relative">
            {editMode === 'vision' ? (
              <div className="absolute top-6 right-6 flex gap-2">
                <button 
                  onClick={handleCancel}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <X size={18} />
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition disabled:opacity-50"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setEditMode('vision')}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                <Edit size={18} />
              </button>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <Target size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Our Vision</h4>
            </div>
            
            {editMode === 'vision' ? (
              <textarea
                value={formData.vision}
                onChange={(e) => setFormData(prev => ({ ...prev, vision: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none flex-1"
                placeholder="Describe your company vision..."
              />
            ) : (
              <p className="text-gray-600 leading-relaxed flex-1">
                {profile?.vision || formData.vision || 'Add your company vision...'}
              </p>
            )}
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col relative">
            {editMode === 'mission' ? (
              <div className="absolute top-6 right-6 flex gap-2">
                <button 
                  onClick={handleCancel}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <X size={18} />
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition disabled:opacity-50"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setEditMode('mission')}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              >
                <Edit size={18} />
              </button>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                <Award size={24} />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Our Mission</h4>
            </div>
            
            {editMode === 'mission' ? (
              <textarea
                value={formData.mission}
                onChange={(e) => setFormData(prev => ({ ...prev, mission: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none flex-1"
                placeholder="Describe your company mission..."
              />
            ) : (
              <p className="text-gray-600 leading-relaxed flex-1">
                {profile?.mission || formData.mission || 'Add your company mission...'}
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}