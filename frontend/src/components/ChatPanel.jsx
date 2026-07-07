import React from 'react'

export default function ChatPanel() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
        {/* Placeholder Chat Messages */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-start max-w-[85%]">
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-2xl rounded-tl-none text-sm">
              Submit your code in the editor, and I'll explain it here!
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <form className="flex space-x-2" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            placeholder="Ask a follow-up question..." 
            className="flex-1 bg-gray-100 dark:bg-gray-900 border-none rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-200"
          />
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
