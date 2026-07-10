import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { Toaster } from 'react-hot-toast';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Questions from './pages/Questions';
import MockInterview from './pages/MockInterview';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import Progress from './pages/Progress';
import Notes from './pages/Notes';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Layout wrapper for authenticated/dashboard routes
const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // If on landing page (Home), don't show the dashboard shell (sidebar, full padding, etc.)
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-darkBg text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router basename="/prepInt">
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'dark:bg-slate-800 dark:text-white border dark:border-slate-700 text-sm font-semibold rounded-lg',
              duration: 3000,
            }}
          />
          <AppLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              
              {/* Dashboard Shell Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/mock-interview" element={<MockInterview />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Fallback */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </AppLayout>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
