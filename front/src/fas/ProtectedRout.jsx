//
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/adminContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
