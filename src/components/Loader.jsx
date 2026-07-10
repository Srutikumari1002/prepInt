import React from 'react';

export const Loader = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-10 h-10 border-4',
    large: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-3">
      <div
        className={`${sizeClasses[size]} border-slate-200 border-t-primary rounded-full animate-spin`}
        role="status"
      >
        <span className="sr-only">{message}</span>
      </div>
      {message && <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{message}</p>}
    </div>
  );
};

export default Loader;
