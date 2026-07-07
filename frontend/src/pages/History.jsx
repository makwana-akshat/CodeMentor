import React from 'react'

export default function History() {
  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Conversation History</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="text-gray-500 dark:text-gray-400">
          <p className="mb-2">Your chat history will appear here.</p>
          <p className="text-sm">TODO: Fetch from /api/history and render.</p>
        </div>
      </div>
    </div>
  )
}
