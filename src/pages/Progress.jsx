import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { CATEGORIES, SUBJECT_COLORS } from '../utils/constants';
import ProgressCard from '../components/ProgressCard';
import { FiCheckCircle, FiActivity, FiTarget, FiPieChart } from 'react-icons/fi';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const Progress = () => {
  const { solvedQuestions, mockAttempts } = useContext(UserContext);

  const subjects = Object.keys(CATEGORIES);

  // Solved counts by subject
  const subjectProgress = subjects.map(sub => {
    const list = CATEGORIES[sub] || [];
    const total = list.length;
    // Real count solved
    const solved = list.filter(q => solvedQuestions.includes(q.id)).length;
    
    // virtual counts mapping to reach ~120 total for display
    let virtualSolved = solved;
    if (virtualSolved === 0) {
      if (sub === "DBMS") virtualSolved = 18;
      if (sub === "Operating System") virtualSolved = 12;
      if (sub === "Computer Network") virtualSolved = 15;
      if (sub === "Java") virtualSolved = 22;
      if (sub === "HR") virtualSolved = 8;
      if (sub === "Aptitude") virtualSolved = 25;
      if (sub === "DSA") virtualSolved = 20;
    } else {
      virtualSolved += 10;
    }
    const virtualTotal = total + 15;

    return {
      name: sub,
      solved: virtualSolved,
      total: virtualTotal,
      percentage: Math.round((virtualSolved / virtualTotal) * 100),
      color: sub === "DBMS" ? "bg-primary" : sub === "Operating System" ? "bg-purple-500" : sub === "Computer Network" ? "bg-teal-500" : sub === "Java" ? "bg-orange-500" : sub === "HR" ? "bg-rose-500" : sub === "Aptitude" ? "bg-emerald-500" : "bg-violet-600"
    };
  });

  const totalQuestionsInSystem = subjectProgress.reduce((acc, sub) => acc + sub.total, 0);
  const totalSolvedQuestions = solvedQuestions.length; // Uses virtual offset seeded in context ~120
  const remainingQuestions = Math.max(0, totalQuestionsInSystem - totalSolvedQuestions);

  // Pie chart data
  const pieData = [
    { name: 'Solved', value: totalSolvedQuestions, color: '#3b82f6' }, // blue
    { name: 'Remaining', value: remainingQuestions, color: '#e2e8f0' } // grey
  ];

  // Subject accuracy: averages of mock scores or static high scores
  const accuracyData = subjects.map(sub => {
    // If mock attempts exist for this category, compute average.
    const attempts = mockAttempts.filter(att => att.category === sub);
    const score = attempts.length > 0
      ? Math.round(attempts.reduce((acc, att) => acc + att.score, 0) / attempts.length)
      : sub === "DBMS" ? 88 : sub === "Operating System" ? 78 : sub === "Computer Network" ? 82 : sub === "Java" ? 85 : sub === "HR" ? 90 : sub === "Aptitude" ? 80 : 84; // Mock defaults

    return {
      subject: sub === "Operating System" ? "OS" : sub === "Computer Network" ? "CN" : sub,
      accuracy: score
    };
  });

  // Weekly Progress
  const weeklySolvedTrends = [
    { week: 'Week 1', solved: 20 },
    { week: 'Week 2', solved: 35 },
    { week: 'Week 3', solved: 55 },
    { week: 'Week 4', solved: 75 },
    { week: 'Week 5', solved: 95 },
    { week: 'Week 6', solved: totalSolvedQuestions }
  ];

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Detailed Progress Analytics
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Visualize your prep efficiency, accuracy scores, and subject completions across different mock evaluation charts.
        </p>
      </div>

      {/* Top Grid: Cards + Pie chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI Card */}
        <div className="md:col-span-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-darkCard flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center">
              <FiCheckCircle className="mr-1.5 text-primary" /> Core Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-slate-50 rounded-lg dark:bg-slate-800/40 border border-slate-100 dark:border-darkBorder/40">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Total Solved</span>
                <span className="text-2xl font-extrabold text-slate-800 dark:text-white">{totalSolvedQuestions}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg dark:bg-slate-800/40 border border-slate-100 dark:border-darkBorder/40">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Completion Rate</span>
                <span className="text-2xl font-extrabold text-slate-800 dark:text-white">
                  {Math.round((totalSolvedQuestions / totalQuestionsInSystem) * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Pie Chart display */}
          <div className="h-44 w-full relative flex items-center justify-center my-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#cbd5e1" className="dark:fill-slate-700" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center flex flex-col items-center">
              <span className="text-xl font-black text-slate-800 dark:text-white">
                {totalSolvedQuestions}
              </span>
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase">Solved</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-3 dark:border-darkBorder">
            <span className="flex items-center text-slate-500 dark:text-slate-400">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary mr-1.5" /> Solved: {totalSolvedQuestions}
            </span>
            <span className="flex items-center text-slate-500 dark:text-slate-400">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-350 dark:bg-slate-700 mr-1.5" /> Remaining: {remainingQuestions}
            </span>
          </div>
        </div>

        {/* Weekly solved trend graph */}
        <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-darkCard">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center">
            <FiActivity className="mr-1.5 text-primary" /> Cumulative Solved Progress
          </h3>
          <div className="h-60 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklySolvedTrends} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSolvedCum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:stroke-slate-800" />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="solved" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSolvedCum)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Center Row: Subject Accuracy + Subject List progress bars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Subject Accuracy chart */}
        <div className="lg:col-span-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-darkCard">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center">
            <FiTarget className="mr-1.5 text-primary" /> Subject Wise Accuracy (%)
          </h3>
          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accuracyData} layout="vertical" margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" className="dark:stroke-slate-800" />
                <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
                <YAxis dataKey="subject" type="category" stroke="#94a3b8" width={60} />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#10b981" radius={[0, 4, 4, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subjects list progress cards */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-darkCard space-y-4">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center mb-1">
            <FiPieChart className="mr-1.5 text-primary" /> Subject Completion Breakdowns
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjectProgress.map(sub => (
              <ProgressCard
                key={sub.name}
                title={sub.name}
                solved={sub.solved}
                total={sub.total}
                colorClass={sub.color}
              />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Progress;
