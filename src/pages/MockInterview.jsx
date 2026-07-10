import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { MOCK_INTERVIEW_QUESTIONS } from '../utils/constants';
import { generateMockFeedback } from '../utils/helpers';
import Button from '../components/Button';
import { FiPlay, FiStar, FiAlertCircle, FiChevronRight, FiCheckCircle, FiActivity } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const MockInterview = () => {
  const { addMockAttempt } = useContext(UserContext);
  const [sessionState, setSessionState] = useState('setup'); // setup, active, feedback, finished
  const [selectedCategory, setSelectedCategory] = useState('HR');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerText, setAnswerText] = useState('');
  
  // Track answers and feedback for this session
  const [sessionAnswers, setSessionAnswers] = useState({});
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [sessionAttempts, setSessionAttempts] = useState([]);

  const categories = Object.keys(MOCK_INTERVIEW_QUESTIONS);
  const questionsList = MOCK_INTERVIEW_QUESTIONS[selectedCategory] || [];
  const currentQuestion = questionsList[currentQuestionIndex];

  const handleStart = () => {
    setSessionState('active');
    setCurrentQuestionIndex(0);
    setAnswerText('');
    setSessionAnswers({});
    setSessionAttempts([]);
    setCurrentFeedback(null);
  };

  const handleSubmitAnswer = () => {
    if (!answerText.trim()) {
      toast.error("Please enter an answer before submitting.");
      return;
    }

    const evaluation = generateMockFeedback(selectedCategory, currentQuestion, answerText);
    setCurrentFeedback(evaluation);
    
    // Save to local session arrays
    const newAnswers = { ...sessionAnswers, [currentQuestion]: answerText };
    setSessionAnswers(newAnswers);
    
    const newAttemptItem = {
      question: currentQuestion,
      answer: answerText,
      evaluation
    };
    const updatedAttempts = [...sessionAttempts, newAttemptItem];
    setSessionAttempts(updatedAttempts);

    setSessionState('feedback');
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questionsList.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerText('');
      setCurrentFeedback(null);
      setSessionState('active');
    } else {
      // Calculate overall session average score
      const averageScore = Math.round(
        sessionAttempts.reduce((acc, item) => acc + item.evaluation.score, 0) / sessionAttempts.length
      );
      
      const avgConfidence = Math.round(sessionAttempts.reduce((acc, item) => acc + item.evaluation.confidence, 0) / sessionAttempts.length);
      const avgGrammar = Math.round(sessionAttempts.reduce((acc, item) => acc + item.evaluation.grammar, 0) / sessionAttempts.length);
      const avgTechnical = Math.round(sessionAttempts.reduce((acc, item) => acc + item.evaluation.technical, 0) / sessionAttempts.length);

      const allSuggestions = sessionAttempts.flatMap(item => item.evaluation.suggestions);
      
      // Save global attempt to context
      const finalAttemptRecord = {
        id: `mock-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        category: selectedCategory,
        score: averageScore,
        confidence: avgConfidence,
        grammar: avgGrammar,
        technical: avgTechnical,
        answers: sessionAnswers,
        suggestions: [...new Set(allSuggestions)].slice(0, 4) // deduplicated suggestions
      };

      addMockAttempt(finalAttemptRecord);
      setSessionState('finished');
      toast.success("Mock interview completed! Statistics saved to dashboard.");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`h-5 w-5 ${
            i <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-700'
          }`}
        />
      );
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          AI-Simulated Mock Interview
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Refine your verbal and written answer capabilities. Choose a subject and receive immediate evaluation.
        </p>
      </div>

      {/* Screen 1: SETUP */}
      {sessionState === 'setup' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-darkBorder dark:bg-darkCard space-y-6">
          <div className="max-w-md mx-auto text-center space-y-3">
            <div className="inline-flex rounded-full bg-primary/10 p-4 text-primary dark:bg-primary/20 dark:text-primary-light">
              <FiPlay className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Start a Prep Session</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Each session contains 4-5 core questions. Write your answers and see where you need to improve.
            </p>
          </div>

          <div className="max-w-sm mx-auto space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Select Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 bg-white py-2.5 px-3.5 text-sm text-slate-950 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat} Interview
                  </option>
                ))}
              </select>
            </div>

            <Button onClick={handleStart} variant="primary" className="w-full">
              Begin Interview
            </Button>
          </div>
        </div>
      )}

      {/* Screen 2: ACTIVE (Answering Question) */}
      {sessionState === 'active' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-darkBorder dark:bg-darkCard space-y-6">
          {/* Question Indicator */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 dark:border-darkBorder">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary dark:bg-primary/20 dark:text-primary-light">
              {selectedCategory} Category
            </span>
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Question {currentQuestionIndex + 1} of {questionsList.length}
            </span>
          </div>

          {/* Question Panel */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Interview Question
            </h4>
            <p className="text-xl font-bold text-slate-800 dark:text-white leading-snug">
              {currentQuestion}
            </p>
          </div>

          {/* Answer Input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Your Response
            </label>
            <textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Write your detailed answer here. Try to cover definition, mechanisms, and examples..."
              rows={8}
              className="w-full rounded-lg border border-slate-300 bg-white p-4 text-sm text-slate-900 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100 dark:placeholder-slate-500"
            />
            <p className="text-right text-xs text-slate-400">
              Word count: {answerText.trim() === '' ? 0 : answerText.trim().split(/\s+/).length} words
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end">
            <Button onClick={handleSubmitAnswer} variant="primary">
              Submit Answer
            </Button>
          </div>
        </div>
      )}

      {/* Screen 3: FEEDBACK (Question Evaluated) */}
      {sessionState === 'feedback' && currentFeedback && (
        <div className="space-y-6">
          
          {/* Main Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-darkBorder dark:bg-darkCard space-y-6">
            
            {/* Feedback Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 dark:border-darkBorder">
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Evaluation for Question {currentQuestionIndex + 1}
              </span>
              <span className="text-xl font-black text-primary">
                Score: {currentFeedback.score}%
              </span>
            </div>

            {/* Question Panel */}
            <div className="space-y-1">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Question
              </h5>
              <p className="text-base font-bold text-slate-800 dark:text-white">
                {currentQuestion}
              </p>
            </div>

            {/* Ratings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-darkBorder">
              <div className="space-y-1.5 text-center md:text-left">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Confidence</span>
                <div className="flex justify-center md:justify-start">{renderStars(currentFeedback.confidence)}</div>
              </div>
              <div className="space-y-1.5 text-center md:text-left">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Grammar & Structure</span>
                <div className="flex justify-center md:justify-start">{renderStars(currentFeedback.grammar)}</div>
              </div>
              <div className="space-y-1.5 text-center md:text-left">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Technical Accuracy</span>
                <div className="flex justify-center md:justify-start">{renderStars(currentFeedback.technical)}</div>
              </div>
            </div>

            {/* Recommendations / Suggestions */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                AI Mock Suggestions
              </h5>
              <ul className="space-y-2.5">
                {currentFeedback.suggestions.map((sug, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-400">
                    <FiAlertCircle className="mr-2 h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Button */}
            <div className="flex justify-end pt-2">
              <Button onClick={handleNext} variant="primary" icon={FiChevronRight}>
                {currentQuestionIndex + 1 < questionsList.length ? "Next Question" : "Complete Interview"}
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* Screen 4: FINISHED */}
      {sessionState === 'finished' && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-darkBorder dark:bg-darkCard text-center space-y-6">
          <div className="inline-flex rounded-full bg-success/10 p-4 text-success dark:bg-success/20">
            <FiCheckCircle className="h-10 w-10" />
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">Congratulations!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              You have completed the mock interview for <strong>{selectedCategory}</strong> category.
            </p>
          </div>

          {/* Session Overview Stats */}
          <div className="max-w-sm mx-auto grid grid-cols-3 gap-4 border border-slate-100 rounded-xl p-4 bg-slate-50 dark:border-darkBorder dark:bg-slate-800/40">
            <div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Solved</span>
              <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{sessionAttempts.length}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Category</span>
              <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{selectedCategory}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Average Score</span>
              <span className="text-lg font-bold text-primary">
                {Math.round(sessionAttempts.reduce((acc, item) => acc + item.evaluation.score, 0) / sessionAttempts.length)}%
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-sm mx-auto pt-2">
            <Button onClick={handleStart} variant="primary" className="flex-1">
              Start Again
            </Button>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-darkCard px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 flex-1 transition"
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};

export default MockInterview;
