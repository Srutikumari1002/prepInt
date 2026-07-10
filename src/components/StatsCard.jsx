import React from 'react';

export const StatsCard = ({ title, value, icon: Icon, colorClass = 'text-primary', bgClass = 'bg-primary/10', subtext }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-darkBorder dark:bg-darkCard">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h4 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </h4>
          {subtext && (
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              {subtext}
            </p>
          )}
        </div>
        <div className={`rounded-xl p-3.5 ${bgClass} ${colorClass}`}>
          {Icon && <Icon className="h-6 w-6" />}
        </div>
      </div>
      {/* Subtle decorative color bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClass.includes('primary') ? 'from-primary-light to-primary' : colorClass.includes('secondary') ? 'from-secondary-light to-secondary' : 'from-success-light to-success'}`} />
    </div>
  );
};

export default StatsCard;
