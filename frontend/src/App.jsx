import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react'

// Layouts
import MainLayout from './layouts/MainLayout'

// Pages
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import History from './pages/History'
import Settings from './pages/Settings'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="sign-in/*" element={<div className="flex justify-center p-8"><SignIn routing="path" path="/sign-in" /></div>} />
            <Route path="sign-up/*" element={<div className="flex justify-center p-8"><SignUp routing="path" path="/sign-up" /></div>} />
            
            {/* Protected Routes */}
            <Route path="dashboard" element={
              <>
                <SignedIn>
                  <Dashboard />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/sign-in" />
                </SignedOut>
              </>
            } />
            <Route path="history" element={
              <>
                <SignedIn>
                  <History />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/sign-in" />
                </SignedOut>
              </>
            } />
            <Route path="settings" element={
              <>
                <SignedIn>
                  <Settings />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/sign-in" />
                </SignedOut>
              </>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
