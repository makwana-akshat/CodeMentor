import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
