import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-8xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          404
        </h1>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Page Not Found</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          The page you are looking for doesn't exist or has been moved. Check the URL and try again.
        </p>
      </div>

      <Link
        to="/dashboard"
        className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition shadow-md"
      >
        <FiArrowLeft className="mr-2" /> Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
