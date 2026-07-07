import React from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, History, Settings } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react'

export default function Sidebar() {
  const { isSignedIn } = useAuth()
  
  if (!isSignedIn) return null

  const links = [
    { name: 'Workspace', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'History', path: '/history', icon: <History size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ]

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hidden md:flex flex-col py-6 px-3">
      <div className="space-y-1 flex-1">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  )
}
