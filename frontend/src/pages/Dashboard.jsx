import React, { useState } from 'react'
import EditorPlaceholder from '../components/EditorPlaceholder'
import ChatPanel from '../components/ChatPanel'

export default function Dashboard() {
  const [language, setLanguage] = useState('javascript')
  
  return (
    <div className="h-full flex flex-col space-y-4">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Workspace</h1>
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 text-gray-700 dark:text-gray-200"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </header>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-12rem)]">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
          <div className="bg-gray-100 dark:bg-gray-900 p-2 text-sm font-mono border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
            Editor
          </div>
          <div className="flex-1">
            <EditorPlaceholder language={language} />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
          <div className="bg-gray-100 dark:bg-gray-900 p-2 text-sm font-mono border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
            Output / Chat
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
