import React, { useRef, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { MessageSquare, Plus, Search, Settings, X, MoreHorizontal, PenSquare, PanelLeftClose, PanelLeftOpen, Sun, Moon } from 'lucide-react'
import { useAuth, UserButton, useUser } from '@clerk/clerk-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useTheme } from '../contexts/ThemeContext'

export default function Sidebar({ isOpen, close, toggle }) {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const sidebarRef = useRef(null)
  const contentRef = useRef(null)
  const { theme, toggleTheme } = useTheme()

  const isDesktop = window.innerWidth >= 768;

  useGSAP(() => {
    let mm = gsap.matchMedia();
    
    mm.add("(max-width: 767px)", () => {
      if (isOpen) {
        gsap.to(sidebarRef.current, { x: 0, width: 260, duration: 0.3, ease: 'power2.out' })
        gsap.fromTo('.history-item', 
          { x: -20, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.2, ease: 'power2.out' }
        )
      } else {
        gsap.to(sidebarRef.current, { x: '-100%', duration: 0.3, ease: 'power2.in' })
      }
    });
    
    mm.add("(min-width: 768px)", () => {
      if (isOpen) {
        gsap.to(sidebarRef.current, { width: 260, x: 0, duration: 0.4, ease: 'power3.out' })
        gsap.fromTo('.history-item', 
          { x: -20, opacity: 0 }, 
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.2, ease: 'power2.out' }
        )
      } else {
        gsap.to(sidebarRef.current, { width: 68, padding: 0, duration: 0.4, ease: 'power3.inOut' })
      }
    });
    
    return () => mm.revert()
  }, { dependencies: [isOpen], scope: sidebarRef })
  
  if (!isSignedIn) return null

  const historyItems = [
    { id: 1, title: 'Python Flask API Refactor' },
    { id: 2, title: 'React useEffect Debugging' },
    { id: 3, title: 'Docker Compose Setup' },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={close}
        />
      )}
      
      <aside 
        ref={sidebarRef}
        className="fixed md:relative inset-y-0 left-0 bg-sidebar md:border-r border-border flex flex-col z-40 overflow-hidden shadow-xl md:shadow-none transition-transform"
        style={{ width: isOpen ? 260 : (isDesktop ? 68 : 0) }}
      >
        {/* Desktop Collapsed View */}
        <div className={`hidden md:flex flex-col h-full w-[68px] items-center py-3 absolute top-0 left-0 transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-100'}`}>
            <button onClick={toggle} className="p-2 text-secondary-text hover:text-primary-text hover:bg-surface-hover rounded-lg transition-colors mb-3" title="Open sidebar">
              <PanelLeftOpen size={20} />
            </button>
            <NavLink to="/" className="p-2 text-secondary-text hover:text-primary-text hover:bg-surface-hover rounded-lg transition-colors mb-2" title="New chat">
              <Plus size={20} />
            </NavLink>
            <button className="p-2 text-secondary-text hover:text-primary-text hover:bg-surface-hover rounded-lg transition-colors mb-2" title="Search">
              <Search size={20} />
            </button>
            <button onClick={toggle} className="p-2 text-secondary-text hover:text-primary-text hover:bg-surface-hover rounded-lg transition-colors mb-2" title="History">
              <MessageSquare size={20} />
            </button>
            
            <button onClick={toggleTheme} className="p-2 text-secondary-text hover:text-primary-text hover:bg-surface-hover rounded-lg transition-colors mb-2" title="Toggle theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="mt-auto p-2">
               <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
            </div>
        </div>

        {/* Expanded View */}
        <div ref={contentRef} className={`flex flex-col w-[260px] h-full absolute top-0 left-0 transition-opacity duration-200 ${(!isOpen && isDesktop) ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-100'}`}>
          <div className="p-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-accent flex items-center justify-center">
                <span className="text-white font-bold text-xs">C</span>
              </div>
              <h2 className="font-bold text-primary-text tracking-tight">CodeMentor</h2>
            </div>
            
            {/* Collapse Buttons */}
            <button onClick={close} className="md:hidden p-1.5 text-secondary-text hover:text-primary-text">
              <X size={20} />
            </button>
            <button 
              onClick={toggle}
              className="hidden md:flex p-1.5 text-secondary-text hover:text-primary-text hover:bg-surface-hover rounded-lg transition-colors"
              title="Close sidebar"
            >
              <PanelLeftClose size={20} />
            </button>
          </div>

          <div className="px-3 pb-2 flex items-center">
            <NavLink
              to="/"
              onClick={() => window.innerWidth < 768 && close()}
              className="flex-1 flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors font-medium text-primary-text hover:bg-surface-hover group"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-primary-text text-background p-1 rounded-full">
                  <Plus size={16} strokeWidth={3} />
                </div>
                <span className="text-sm">New chat</span>
              </div>
              <PenSquare size={16} className="text-secondary-text opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          </div>

          <div className="px-3 pb-2">
            <button className="flex items-center space-x-3 px-3 py-2.5 w-full rounded-lg transition-colors text-sm font-medium text-primary-text hover:bg-surface-hover">
              <Search size={18} className="text-secondary-text" />
              <span>Search chats</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin">
            <div className="text-xs font-semibold text-secondary-text mb-2 px-3">Recent</div>
            <div className="space-y-0.5">
              {historyItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={`/c/${item.id}`}
                  onClick={() => window.innerWidth < 768 && close()}
                  className="history-item flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-sm text-primary-text hover:bg-surface-hover hover:translate-x-1"
                >
                  <span className="truncate">{item.title}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="p-3">
            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer">
              <div className="flex items-center space-x-3">
                <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-primary-text leading-tight">{user?.firstName || 'Account'}</span>
                  {user?.lastName && <span className="text-xs text-secondary-text leading-tight">{user.lastName}</span>}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
                  className="p-1.5 text-secondary-text hover:text-primary-text hover:bg-surface rounded-md transition-colors"
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <MoreHorizontal size={18} className="text-secondary-text" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
