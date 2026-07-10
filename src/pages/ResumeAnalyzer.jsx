import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { calculateAtsScore } from '../utils/helpers';
import ResumeUpload from '../components/ResumeUpload';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { FiFileText, FiActivity, FiCheck, FiArrowRight, FiRotateCcw, FiList } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const ResumeAnalyzer = () => {
  const { atsHistory, addAtsResult } = useContext(UserContext);
  const [viewState, setViewState] = useState('upload'); // upload, analyzing, report
  const [activeReport, setActiveReport] = useState(null);

  const handleAnalyze = (fileName, text) => {
    setViewState('analyzing');
    
    // Simulate premium parsing delay (1.5 seconds)
    setTimeout(() => {
      const evaluation = calculateAtsScore(fileName, text);
      
      const newResult = {
        id: `ats-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        fileName,
        score: evaluation.score,
        suggestions: evaluation.suggestions
      };

      addAtsResult(newResult);
      setActiveReport(newResult);
      setViewState('report');
      toast.success("Resume parsing completed successfully!");
    }, 1500);
  };

  const handleHistoryItemClick = (report) => {
    setActiveReport(report);
    setViewState('report');
  };

  const getScoreColor = (score) => {
    if (score < 65) return 'text-rose-500 border-rose-200 dark:border-rose-900/50';
    if (score < 80) return 'text-amber-500 border-amber-200 dark:border-amber-900/50';
    return 'text-success border-success-light/30';
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          ATS Resume Analyzer
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Optimize your resume for applicant screening machines. Scan files or text to identify gaps and raise your ATS rating.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left side: Upload area / Report details */}
        <div className="lg:col-span-3">
          
          {viewState === 'upload' && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-darkBorder dark:bg-darkCard">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Analyze Your Resume</h3>
              <ResumeUpload onAnalyze={handleAnalyze} />
            </div>
          )}

          {viewState === 'analyzing' && (
            <div className="rounded-xl border border-slate-200 bg-white p-12 shadow-sm dark:border-darkBorder dark:bg-darkCard flex flex-col items-center justify-center min-h-[350px]">
              <Loader message="Reading files and parsing structural elements..." size="large" />
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-2 max-w-sm">
                Running keyword matchers, checking spacing density, and parsing text segments.
              </p>
            </div>
          )}

          {viewState === 'report' && activeReport && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-darkBorder dark:bg-darkCard space-y-6">
              
              {/* Report Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 dark:border-darkBorder gap-3">
                <div>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">Resume Report</span>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center mt-0.5">
                    <FiFileText className="mr-2 text-primary" /> {activeReport.fileName}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400 dark:text-slate-500">Scanned on {activeReport.date}</span>
                </div>
              </div>

              {/* Score Meter Row */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-darkBorder">
                {/* Dial Score */}
                <div className={`relative flex items-center justify-center rounded-full border-4 h-28 w-28 flex-shrink-0 ${getScoreColor(activeReport.score)}`}>
                  <div className="text-center">
                    <span className="text-3xl font-black">{activeReport.score}%</span>
                    <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400">ATS Rating</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 dark:text-white text-base">
                    {activeReport.score >= 80 ? "Solid ATS Fit!" : activeReport.score >= 65 ? "Moderate Alignment" : "Needs Improvement"}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {activeReport.score >= 80
                      ? "Your resume has a strong matching density. You satisfy standard database queries. Focus on minor details to hit 90%+."
                      : activeReport.score >= 65
                      ? "You meet basic criteria but lack quantified results or formatting optimization. Follow the suggestions below."
                      : "We found formatting errors or a lack of key industrial technologies. Address critical suggestions to pass auto-filters."}
                  </p>
                </div>
              </div>

              {/* Action items / suggestions */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Critical Suggestions
                </h4>
                <div className="space-y-2.5">
                  {activeReport.suggestions.map((sug, i) => (
                    <div key={i} className="flex items-start bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-100 dark:border-darkBorder/40">
                      <div className="rounded-full bg-emerald-50 text-success p-1 dark:bg-emerald-950/20 mr-3 flex-shrink-0 mt-0.5">
                        <FiCheck className="h-4.5 w-4.5" />
                      </div>
                      <span className="text-sm text-slate-700 dark:text-slate-300 leading-snug">
                        {sug.startsWith('✔') ? sug.substring(2) : sug}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Controls */}
              <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-darkBorder">
                <Button onClick={() => setViewState('upload')} variant="outline" icon={FiRotateCcw}>
                  Scan Another Resume
                </Button>
              </div>

            </div>
          )}

        </div>

        {/* Right sidebar: Historical scans list */}
        <div className="lg:col-span-1 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-darkBorder dark:bg-darkCard space-y-4">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center">
            <FiList className="mr-1.5" /> Scan History
          </h3>

          <div className="space-y-2.5 max-h-[450px] overflow-y-auto pr-1">
            {atsHistory.length > 0 ? (
              atsHistory.map((item) => {
                const isActive = activeReport?.id === item.id && viewState === 'report';
                return (
                  <button
                    key={item.id}
                    onClick={() => handleHistoryItemClick(item)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                      isActive
                        ? 'border-primary bg-primary/5 text-slate-900 dark:text-white'
                        : 'border-slate-150 bg-white hover:bg-slate-50 text-slate-700 dark:border-darkBorder dark:bg-darkCard dark:hover:bg-slate-850 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold truncate max-w-[130px]">{item.fileName}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        item.score >= 80
                          ? 'bg-emerald-50 text-success dark:bg-emerald-950/20'
                          : item.score >= 65
                          ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/20'
                          : 'bg-rose-50 text-rose-600 dark:bg-rose-950/20'
                      }`}>
                        {item.score}%
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{item.date}</p>
                  </button>
                );
              })
            ) : (
              <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
                No previous scans found.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default ResumeAnalyzer;
