import React, { useState, useContext, useMemo } from 'react';
import { UserContext } from '../context/UserContext';
import { CATEGORIES } from '../utils/constants';
import SearchBar from '../components/SearchBar';
import QuestionCard from '../components/QuestionCard';
import { FiCheckCircle, FiInbox } from 'react-icons/fi';

export const Questions = () => {
  const { solvedQuestions, toggleQuestionSolved } = useContext(UserContext);
  const [activeCategory, setActiveCategory] = useState('DBMS');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categoriesList = Object.keys(CATEGORIES);

  // Filter questions based on current options
  const filteredQuestions = useMemo(() => {
    const questions = CATEGORIES[activeCategory] || [];
    return questions.filter((q) => {
      const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
      const matchesSearch =
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDifficulty && matchesSearch;
    });
  }, [activeCategory, difficultyFilter, searchQuery]);

  // Compute category specific counts
  const categoryStats = useMemo(() => {
    const questions = CATEGORIES[activeCategory] || [];
    const total = questions.length;
    const solved = questions.filter((q) => solvedQuestions.includes(q.id)).length;
    const percent = total > 0 ? Math.round((solved / total) * 100) : 0;
    return { total, solved, percent };
  }, [activeCategory, solvedQuestions]);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Practice Interview Questions
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Browse vetted technical and HR questions, examine solutions, check interview tips, and track your progress.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left sidebar: Subject categories selection */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-2">
            Categories
          </h3>
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0 scrollbar-none">
            {categoriesList.map((category) => {
              const isActive = activeCategory === category;
              const totalCount = CATEGORIES[category].length;
              const solvedCount = CATEGORIES[category].filter((q) => solvedQuestions.includes(q.id)).length;
              
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setSearchQuery('');
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold text-left transition-all duration-150 flex-shrink-0 lg:w-full ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/10'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-darkCard dark:text-slate-300 dark:border-darkBorder dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {solvedCount}/{totalCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side: Questions panel */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Stats Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl border border-slate-200 bg-white dark:border-darkBorder dark:bg-darkCard shadow-sm">
            <div className="flex items-center space-x-3.5">
              <div className="rounded-full bg-emerald-50 p-2.5 text-success dark:bg-emerald-950/20">
                <FiCheckCircle className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {activeCategory} Solved Progress
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Solved {categoryStats.solved} of {categoryStats.total} questions ({categoryStats.percent}%)
                </p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full sm:w-48 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-success h-2 rounded-full transition-all duration-500"
                style={{ width: `${categoryStats.percent}%` }}
              />
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={`Search ${activeCategory} questions...`}
              />
            </div>
            
            {/* Difficulty Selector */}
            <div className="flex rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-darkCard">
              {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                    difficultyFilter === diff
                      ? 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-white'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Output List */}
          <div className="space-y-3.5">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((q) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  isSolved={solvedQuestions.includes(q.id)}
                  onToggleSolved={toggleQuestionSolved}
                />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
                <FiInbox className="mx-auto h-10 w-10 text-slate-400 dark:text-slate-600 mb-2" />
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  No Questions Found
                </h4>
                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  Try adjusting your search terms or selecting a different difficulty filter.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Questions;
