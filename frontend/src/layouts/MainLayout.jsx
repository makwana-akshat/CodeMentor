import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { Menu } from 'lucide-react'

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen bg-background text-primary-text overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-14 bg-sidebar border-b border-border flex items-center px-4 z-20">
        <button onClick={toggleSidebar} className="p-2 text-secondary-text hover:text-primary-text">
          <Menu size={24} />
        </button>
        <h1 className="ml-4 font-semibold">CodeMentor AI</h1>
      </div>

      <Sidebar isOpen={isSidebarOpen} close={() => setIsSidebarOpen(false)} toggle={toggleSidebar} />
      
      <main className="flex-1 flex flex-col pt-14 md:pt-0 overflow-hidden relative h-full">
        <Outlet />
      </main>
    </div>
  )
}
