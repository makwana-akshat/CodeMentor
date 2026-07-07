import React from 'react'
import { Loader2 } from 'lucide-react'

export default function ChatSkeleton() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto pt-8 pb-4">
        <div className="max-w-3xl mx-auto w-full px-4 space-y-8">
          
          {/* User Message Skeleton */}
          <div className="flex flex-col">
            <div className="self-end bg-[#2F2F2F] px-5 py-4 rounded-3xl rounded-tr-sm w-3/4 max-w-[85%] animate-pulse shadow-sm">
              <div className="h-4 bg-[#404040] rounded w-full mb-3"></div>
              <div className="h-4 bg-[#404040] rounded w-5/6"></div>
            </div>
          </div>

          {/* AI Message Skeleton */}
          <div className="flex flex-col">
            <div className="self-start w-full animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-[#2F2F2F] shrink-0"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-[#2F2F2F] rounded w-3/4"></div>
                  <div className="h-4 bg-[#2F2F2F] rounded w-full"></div>
                  <div className="h-4 bg-[#2F2F2F] rounded w-5/6"></div>
                  
                  {/* Code block skeleton */}
                  <div className="h-32 bg-[#1A1A1A] rounded-xl w-full mt-4"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
