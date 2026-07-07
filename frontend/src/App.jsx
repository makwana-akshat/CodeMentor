import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './components/auth/AuthLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Pages
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Navigate to="/" replace />} />
                <Route path="history" element={<History />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

