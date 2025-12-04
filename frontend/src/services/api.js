// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';

// Helper untuk mendapatkan token
const getToken = () => localStorage.getItem('token');

// Helper untuk headers
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      ...getHeaders(options.auth !== false),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Something went wrong',
        errors: data.errors || {},
      };
    }

    return data;
  } catch (error) {
    if (error.status) {
      throw error;
    }
    throw {
      status: 0,
      message: 'Network error. Please check your connection.',
      errors: {},
    };
  }
};

// ==================== AUTH API ====================
export const authApi = {
  // Login
  login: async (email, password) => {
    return apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      auth: false,
    });
  },

  // Register Candidate
  registerCandidate: async (data) => {
    return apiRequest('/register/candidate', {
      method: 'POST',
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      }),
      auth: false,
    });
  },

  // Register Recruiter
  registerRecruiter: async (data) => {
    return apiRequest('/register/recruiter', {
      method: 'POST',
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        company_name: data.companyName,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      }),
      auth: false,
    });
  },

  // Logout
  logout: async () => {
    return apiRequest('/logout', {
      method: 'POST',
    });
  },

  // Get current user
  me: async () => {
    return apiRequest('/me');
  },
};

// ==================== JOBS API ====================
export const jobsApi = {
  // Get all jobs (public)
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/jobs?${queryString}` : '/jobs';
    return apiRequest(endpoint, { auth: false });
  },

  // Get single job
  getById: async (id) => {
    return apiRequest(`/jobs/${id}`, { auth: false });
  },

  // Create job (recruiter only)
  create: async (data) => {
    return apiRequest('/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update job (recruiter only)
  update: async (id, data) => {
    return apiRequest(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete job (recruiter only)
  delete: async (id) => {
    return apiRequest(`/jobs/${id}`, {
      method: 'DELETE',
    });
  },

  // Get job applicants (recruiter only)
  getApplicants: async (id) => {
    return apiRequest(`/jobs/${id}/applicants`);
  },
};

// ==================== APPLICATIONS API ====================
export const applicationsApi = {
  // Apply for job (candidate only)
  apply: async (jobId, data = {}) => {
    return apiRequest(`/jobs/${jobId}/apply`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Get single application
  getById: async (id) => {
    return apiRequest(`/applications/${id}`);
  },

  // Update application status (recruiter only)
  updateStatus: async (id, status, notes = null) => {
    return apiRequest(`/applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes }),
    });
  },

  // Delete/withdraw application
  delete: async (id) => {
    return apiRequest(`/applications/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== CANDIDATE API ====================
export const candidateApi = {
  // Get profile
  getProfile: async () => {
    return apiRequest('/candidate/profile');
  },

  // Update profile
  updateProfile: async (data) => {
    return apiRequest('/candidate/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Upload CV
  uploadCv: async (file) => {
    const formData = new FormData();
    formData.append('cv', file);

    const response = await fetch(`${API_BASE_URL}/candidate/upload-cv`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Accept': 'application/json',
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw { status: response.status, message: data.message || 'Upload failed', errors: data.errors || {} };
    }
    return data;
  },

  // Upload profile photo
  uploadPhoto: async (file) => {
    const formData = new FormData();
    formData.append('photo', file);

    const response = await fetch(`${API_BASE_URL}/candidate/upload-photo`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Accept': 'application/json',
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw { status: response.status, message: data.message || 'Upload failed', errors: data.errors || {} };
    }
    return data;
  },

  // Get my applications
  getApplications: async () => {
    return apiRequest('/candidate/applications');
  },

  // Get bookmarks
  getBookmarks: async () => {
    return apiRequest('/candidate/bookmarks');
  },

  // Add bookmark (BookmarkLamaran)
  addBookmark: async (jobId) => {
    return apiRequest(`/candidate/bookmarks/${jobId}`, {
      method: 'POST',
    });
  },

  // Remove bookmark (UnbookmarkLamaran)
  removeBookmark: async (jobId) => {
    return apiRequest(`/candidate/bookmarks/${jobId}`, {
      method: 'DELETE',
    });
  },

  // Toggle bookmark (convenience method)
  toggleBookmark: async (jobId, isCurrentlyBookmarked) => {
    if (isCurrentlyBookmarked) {
      return apiRequest(`/candidate/bookmarks/${jobId}`, {
        method: 'DELETE',
      });
    } else {
      return apiRequest(`/candidate/bookmarks/${jobId}`, {
        method: 'POST',
      });
    }
  },

  // Check if job is bookmarked
  checkBookmark: async (jobId) => {
    return apiRequest(`/candidate/bookmarks/${jobId}/check`);
  },
};

// ==================== RECRUITER API ====================
export const recruiterApi = {
  // Get profile
  getProfile: async () => {
    return apiRequest('/recruiter/profile');
  },

  // Update profile
  updateProfile: async (data) => {
    return apiRequest('/recruiter/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Upload company logo
  uploadLogo: async (file) => {
    const formData = new FormData();
    formData.append('logo', file);

    const response = await fetch(`${API_BASE_URL}/recruiter/upload-logo`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Accept': 'application/json',
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw { status: response.status, message: data.message || 'Upload failed', errors: data.errors || {} };
    }
    return data;
  },

  // Get dashboard data
  getDashboard: async () => {
    return apiRequest('/recruiter/dashboard');
  },
};

export default {
  auth: authApi,
  jobs: jobsApi,
  applications: applicationsApi,
  candidate: candidateApi,
  recruiter: recruiterApi,
};
