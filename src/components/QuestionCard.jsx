import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiCheckCircle } from 'react-icons/fi';

export const QuestionCard = ({ question, isSolved, onToggleSolved }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const difficultyColors = {
    Easy: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50',
    Hard: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50',
  };

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isExpanded
          ? 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 shadow-sm'
          : 'border-slate-200 dark:border-darkBorder bg-white dark:bg-darkCard hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      {/* Header / Clickable Area */}
      <div
        className="flex items-start justify-between p-5 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start space-x-3.5 pr-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSolved(question.id);
            }}
            className={`mt-0.5 flex-shrink-0 text-xl transition-all duration-150 ${
              isSolved
                ? 'text-success hover:text-success-dark'
                : 'text-slate-300 hover:text-slate-400 dark:text-slate-600 dark:hover:text-slate-500'
            }`}
            aria-label={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
          >
            <FiCheckCircle className={isSolved ? 'fill-success/15' : ''} />
          </button>
          <div>
            <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">
              {question.question}
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                {question.category}
              </span>
              <span
                className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${
                  difficultyColors[question.difficulty] || 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                {question.difficulty}
              </span>
            </div>
          </div>
        </div>

        <div className="text-slate-400 dark:text-slate-500 mt-1">
          {isExpanded ? <FiChevronUp className="h-5 w-5" /> : <FiChevronDown className="h-5 w-5" />}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-slate-200 px-5 pb-5 pt-4 dark:border-slate-700">
          <div className="space-y-4">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Answer Key
              </h5>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {question.answer}
              </p>
            </div>

            {question.tips && (
              <div className="rounded-lg bg-primary/5 p-4 border border-primary/10 dark:bg-primary/5 dark:border-primary/10">
                <h5 className="text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-light">
                  Interview Tip
                </h5>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {question.tips}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
