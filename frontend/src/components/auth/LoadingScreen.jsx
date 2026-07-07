import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Authenticating...</p>
      </div>
    </div>
  );
}
