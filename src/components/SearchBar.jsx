import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <FiSearch className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100 dark:placeholder-slate-500"
        placeholder={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          aria-label="Clear search"
        >
          <FiX className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
