import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

export default function AuthLayout() {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <LoadingScreen />;
  }

  // If user is already authenticated, don't let them see login/register
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        <Outlet />
      </div>
    </div>
  );
}
