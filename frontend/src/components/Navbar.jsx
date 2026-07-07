import React from 'react'
import { Link } from 'react-router-dom'
import { UserButton, SignedIn, SignedOut } from '@clerk/clerk-react'
import { Terminal } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity">
          <Terminal size={28} />
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">CodeMentor</span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-4">
        <SignedOut>
          <Link to="/sign-in" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
            Sign In
          </Link>
          <Link to="/sign-up" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Sign Up
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  )
}
