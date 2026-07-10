import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 bg-white py-6 dark:border-darkBorder dark:bg-darkCard transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-center sm:text-left">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {currentYear} <strong>InterviewAce</strong>. All rights reserved. Made for job preparation.
          </p>
          <div className="flex space-x-6 text-sm text-slate-400 dark:text-slate-500">
            <span className="hover:text-slate-600 dark:hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="text-primary dark:text-primary-light font-medium">Pricing (Coming Soon)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
