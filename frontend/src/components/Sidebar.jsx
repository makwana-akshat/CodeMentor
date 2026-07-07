import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { MessageSquare, Plus, Search, Settings, X, MoreHorizontal, PenSquare } from 'lucide-react'
import { useAuth, UserButton, useUser } from '@clerk/clerk-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Sidebar({ isOpen, close }) {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const sidebarRef = useRef(null)

  useGSAP(() => {
    let mm = gsap.matchMedia();
    
    mm.add("(max-width: 767px)", () => {
      if (isOpen) {
        gsap.to(sidebarRef.current, { x: 0, duration: 0.3, ease: 'power2.out' })
      } else {
        gsap.to(sidebarRef.current, { x: '-100%', duration: 0.3, ease: 'power2.in' })
      }
    });
    
    mm.add("(min-width: 768px)", () => {
      gsap.set(sidebarRef.current, { x: 0 })
    });
    
    return () => mm.revert()
  }, [isOpen])
  
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
        className="fixed md:static inset-y-0 left-0 w-[260px] bg-sidebar border-r border-border flex flex-col z-40 transform -translate-x-full md:translate-x-0"
      >
        <div className="p-4 flex items-center justify-between md:hidden">
          <h2 className="font-semibold text-primary-text">Menu</h2>
          <button onClick={close} className="p-2 text-secondary-text hover:text-primary-text">
            <X size={20} />
          </button>
        </div>

        <div className="p-3">
          <NavLink
            to="/"
            onClick={close}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors font-medium text-primary-text hover:bg-[#2A2B32] group"
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
          <button className="flex items-center space-x-3 px-3 py-2.5 w-full rounded-lg transition-colors text-sm font-medium text-primary-text hover:bg-[#2A2B32]">
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
                to={`/history`}
                onClick={close}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm text-primary-text hover:bg-[#2A2B32]"
              >
                <span className="truncate">{item.title}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#2A2B32] transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-primary-text leading-tight">{user?.firstName || 'Account'}</span>
                {user?.lastName && <span className="text-xs text-secondary-text leading-tight">{user.lastName}</span>}
              </div>
            </div>
            <MoreHorizontal size={18} className="text-secondary-text" />
          </div>
        </div>
      </aside>
    </>
  )
}
