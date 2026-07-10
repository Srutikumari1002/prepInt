import React from 'react';

export const ProgressCard = ({ title, solved, total, colorClass = 'bg-primary' }) => {
  const percentage = total > 0 ? Math.min(100, Math.round((solved / total) * 100)) : 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-darkBorder dark:bg-darkCard">
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</h5>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {solved}/{total} ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full ${colorClass} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressCard;
