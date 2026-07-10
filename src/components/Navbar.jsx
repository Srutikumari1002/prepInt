import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import ThemeToggle from './ThemeToggle';
import { FiMenu, FiBell, FiAward } from 'react-icons/fi';

export const Navbar = ({ onMenuToggle }) => {
  const { profile, streak } = useContext(UserContext);
  const location = useLocation();

  // Don't show full navbar options on landing page if we want, or show it simplified.
  const isLandingPage = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-darkBorder dark:bg-darkCard/80 transition-colors duration-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left Side: Brand and Mobile Toggle */}
          <div className="flex items-center">
            {!isLandingPage && (
              <button
                type="button"
                onClick={onMenuToggle}
                className="mr-3 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 md:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Toggle sidebar menu"
              >
                <FiMenu className="h-6 w-6" />
              </button>
            )}
            <Link to={isLandingPage ? "/" : "/dashboard"} className="flex items-center space-x-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-secondary text-white font-black text-xl shadow-md">
                A
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                InterviewAce
              </span>
            </Link>
          </div>

          {/* Right Side: Quick Stats, Theme, Avatar */}
          <div className="flex items-center space-x-4">
            
            {/* Streak Counter */}
            {!isLandingPage && (
              <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30 text-sm font-semibold">
                <span>🔥</span>
                <span>{streak} Day Streak</span>
              </div>
            )}

            {/* Notifications (Visual Element) */}
            {!isLandingPage && (
              <button
                type="button"
                className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="View notifications"
              >
                <FiBell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-darkCard" />
              </button>
            )}

            <ThemeToggle />

            {/* User Profile Quick Access */}
            {!isLandingPage && (
              <Link
                to="/profile"
                className="flex items-center space-x-2.5 rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-indigo-500 text-white font-bold text-sm">
                  {profile.name ? profile.name.charAt(0) : 'U'}
                </div>
                <span className="hidden md:inline text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {profile.name}
                </span>
              </Link>
            )}
            
            {isLandingPage && (
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition shadow-md"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
