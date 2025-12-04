import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.me();
      setUser(response.data.user);
    } catch (err) {
      // Token invalid, clear it
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await authApi.login(email, password);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      
      return { success: true, user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message, errors: err.errors };
    }
  };

  const registerCandidate = async (data) => {
    setError(null);
    try {
      const response = await authApi.registerCandidate(data);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      
      return { success: true, user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message, errors: err.errors };
    }
  };

  const registerRecruiter = async (data) => {
    setError(null);
    try {
      const response = await authApi.registerRecruiter(data);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      
      return { success: true, user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message, errors: err.errors };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      // Ignore logout errors
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  // Update user photo URL (called after uploading new photo)
  const updateUserPhoto = (photoUrl) => {
    setUser(prev => prev ? { ...prev, photo_url: photoUrl } : null);
  };

  // Refresh user data from server
  const refreshUser = async () => {
    try {
      const response = await authApi.me();
      setUser(response.data.user);
    } catch (err) {
      console.error('Failed to refresh user:', err);
    }
  };

  const isAuthenticated = !!user;
  const isCandidate = user?.role === 'candidate';
  const isRecruiter = user?.role === 'recruiter';

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    isCandidate,
    isRecruiter,
    login,
    logout,
    registerCandidate,
    registerRecruiter,
    checkAuth,
    updateUserPhoto,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
