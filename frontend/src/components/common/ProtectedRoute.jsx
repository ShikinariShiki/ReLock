import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

// Protected Route for authenticated users
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login based on attempted route
    const loginPath = location.pathname.startsWith('/recruiter') 
      ? '/login-recruiter' 
      : '/login-candidate';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // Check role if allowedRoles specified
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard
    const redirectPath = user?.role === 'recruiter' ? '/recruiter/dashboard' : '/homepage-candidate';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

// Guest Route - only for non-authenticated users
export const GuestRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirect authenticated users to their dashboard
    const redirectPath = user?.role === 'recruiter' ? '/recruiter/dashboard' : '/homepage-candidate';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
