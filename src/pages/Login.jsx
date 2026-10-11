import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Button from '../components/Button';
import { FiUser, FiMail, FiLock, FiBook, FiAward, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const Login = () => {
  const { loginUser, registerUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Mode: 'login' or 'signup'
  const [mode, setMode] = useState('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign up form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState('');
  const [selectedSkills, setSelectedSkills] = useState(["React", "JavaScript", "SQL"]);

  const presetSkills = ["React", "JavaScript", "SQL", "Java", "Python", "Data Structures", "Operating Systems", "Networking"];

  const handleToggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    const res = loginUser(loginEmail, loginPassword);
    if (res.success) {
      toast.success(`Welcome back, ${res.user.name}!`);
      navigate('/dashboard');
    } else {
      toast.error(res.message);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Name and Email are required.");
      return;
    }

    const res = registerUser({
      name: name.trim(),
      email: email.trim(),
      password: password.trim() || 'password123',
      college: college.trim(),
      branch: branch.trim(),
      skills: selectedSkills
    });

    if (res.success) {
      toast.success(`Account created! Welcome, ${res.user.name}!`);
      navigate('/dashboard');
    } else {
      toast.error(res.message);
    }
  };

  const fillDemoAccount = () => {
    setLoginEmail('demo@interviewace.com');
    setLoginPassword('password123');
    toast('Filled demo credentials! Click "Log In" below.', { icon: '⚡' });
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4 py-8">
      <div className="w-full max-w-xl bg-white dark:bg-darkCard rounded-2xl border border-slate-200 dark:border-darkBorder p-6 sm:p-10 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white font-black text-2xl shadow-md mb-2">
            A
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Profile'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {mode === 'login' 
              ? 'Log in to access your saved mock interviews, revision notes, and streak.' 
              : 'Sign up to build your student profile, practice interviews, and analyze your resume.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-primary shadow-sm dark:bg-darkCard dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-primary shadow-sm dark:bg-darkCard dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* LOG IN VIEW */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Quick Demo Pill */}
            <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs dark:bg-primary/10">
              <span className="text-slate-650 dark:text-slate-300 font-medium">
                Want to test with sample data?
              </span>
              <button
                type="button"
                onClick={fillDemoAccount}
                className="font-bold text-primary hover:underline hover:text-primary-dark"
              >
                1-Click Demo Fill
              </button>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Registered Email *
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. demo@interviewace.com"
                  className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password (e.g. password123)"
                  className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full py-3 text-sm font-bold" icon={FiArrowRight}>
                Log In to Account
              </Button>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-primary hover:underline"
                >
                  Create one now
                </button>
              </p>
            </div>
          </form>
        )}

        {/* SIGN UP VIEW */}
        {mode === 'signup' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Set Password *
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* College */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  College / University
                </label>
                <div className="relative">
                  <FiBook className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. IIT Bombay"
                    className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Branch */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Course / Branch
                </label>
                <div className="relative">
                  <FiAward className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="e.g. Information Technology"
                    className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-darkCard dark:text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Select Your Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {presetSkills.map(skill => {
                  const isSelected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleToggleSkill(skill)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full py-3 text-sm font-bold" icon={FiArrowRight}>
                Create Account & Enter Dashboard
              </Button>
            </div>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-primary hover:underline"
                >
                  Log In here
                </button>
              </p>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

export default Login;
