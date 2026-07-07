import React from 'react'
import ThemeToggle from '../components/ThemeToggle'

export default function Settings() {
  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 max-w-2xl">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Appearance</h2>
        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-gray-800 dark:text-gray-200 font-medium">Dark Mode</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode interface</p>
          </div>
          <ThemeToggle />
        </div>
        
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mt-8 mb-4">Account</h2>
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          Account management is handled via Clerk in the user menu.
        </div>
      </div>
    </div>
  )
}
