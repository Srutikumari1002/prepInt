import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiGrid,
  FiHelpCircle,
  FiMessageSquare,
  FiFileText,
  FiTrendingUp,
  FiEdit3,
  FiUser,
  FiX
} from 'react-icons/fi';

export const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
    { name: 'Interview Questions', path: '/questions', icon: FiHelpCircle },
    { name: 'Mock Interview', path: '/mock-interview', icon: FiMessageSquare },
    { name: 'Resume Analyzer', path: '/resume-analyzer', icon: FiFileText },
    { name: 'Progress Tracker', path: '/progress', icon: FiTrendingUp },
    { name: 'Notes', path: '/notes', icon: FiEdit3 },
    { name: 'My Profile', path: '/profile', icon: FiUser },
  ];

  const linkBaseStyle = "flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-150 mb-1.5 group";
  const activeStyle = "bg-primary text-white shadow-md shadow-primary/20";
  const inactiveStyle = "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white";

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white pt-16 transition-transform duration-300 ease-in-out md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 dark:border-darkBorder dark:bg-darkCard ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header Close button */}
        <div className="flex items-center justify-end px-4 py-2 md:hidden">
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <FiX className="h-5.5 w-5.5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `${linkBaseStyle} ${isActive ? activeStyle : inactiveStyle}`
                }
              >
                <Icon className="mr-3 h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-105" />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer info in Sidebar */}
        <div className="border-t border-slate-100 p-4 dark:border-darkBorder">
          <div className="rounded-lg bg-gradient-to-tr from-slate-50 to-slate-100/50 p-3 dark:from-slate-800/30 dark:to-slate-800/10 border border-slate-100 dark:border-darkBorder">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">PREPARATION MODE</p>
            <p className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-300">Premium active</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
