import React from 'react'
import { Link } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import { Terminal } from 'lucide-react'
import { useAuthContext } from '../contexts/AuthContext'

export default function Navbar() {
  const { isAuthenticated, loading } = useAuthContext()

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity">
          <Terminal size={28} />
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">CodeMentor</span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        {!loading && (
          isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex space-x-4 mr-2">
                <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Dashboard</Link>
                <Link to="/history" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">History</Link>
                <Link to="/settings" className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Settings</Link>
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Register
              </Link>
            </>
          )
        )}
      </div>
    </nav>
  )
}

