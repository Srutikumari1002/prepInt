import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { FiSun, FiMoon } from 'react-icons/fi';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <FiSun className="w-5 h-5 text-amber-400" />
      ) : (
        <FiMoon className="w-5 h-5 text-indigo-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
