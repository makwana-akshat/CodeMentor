import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
      <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        CodeMentor AI
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
        Your personal AI-powered code explanation platform. Submit snippets, get detailed explanations, and discover bug fixes instantly.
      </p>
      <div className="flex space-x-4 pt-4">
        <Link to="/dashboard" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all">
          Get Started
        </Link>
        <a href="#features" className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg shadow-sm transition-all">
          Learn More
        </a>
      </div>
    </div>
  )
}
