import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiZap, FiTarget, FiBarChart2, FiAward, FiFileText } from 'react-icons/fi';
import Footer from '../components/Footer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-darkBg text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Landing Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-darkBg/80 backdrop-blur-md border-b border-slate-100 dark:border-darkBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-secondary text-white font-black text-xl shadow-md">
              A
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              InterviewAce
            </span>
          </div>
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition shadow-md"
            >
              Get Started <FiArrowRight className="ml-1.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-bold text-primary dark:bg-primary/20 dark:text-primary-light mb-6 uppercase tracking-wider">
              🚀 THE ULTIMATE PREPARATION HUB
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Ace Your Next Technical{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Interview
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Master core computer science subjects, practice simulated mock interviews with granular feedback, and optimize your resume for ATS engines. All in one dashboard.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-base font-bold text-white hover:bg-primary-dark transition shadow-lg shadow-primary/20"
              >
                Start Free Journey
              </Link>
              <Link
                to="/questions"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-darkCard px-6 py-3.5 text-base font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Explore Questions
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-slate-100 dark:border-darkBorder bg-white dark:bg-darkCard/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Everything You Need in One Place
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              No need to switch between multiple tabs. InterviewAce provides all the modules to get you interview-ready.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="rounded-xl border border-slate-100 bg-slate-50/50 p-6 dark:border-darkBorder dark:bg-darkCard hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 dark:bg-primary/20 dark:text-primary-light">
                <FiZap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Subject-wise Questions</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Study categorized questions for HR, Java, DBMS, Operating Systems, Computer Networks, and Aptitude.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="rounded-xl border border-slate-100 bg-slate-50/50 p-6 dark:border-darkBorder dark:bg-darkCard hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mb-4 dark:bg-secondary/20 dark:text-secondary-light">
                <FiTarget className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Mock Interview Coach</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Submit text responses to interview questions and get detailed, simulated feedback on confidence, grammar, and tech accuracy.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="rounded-xl border border-slate-100 bg-slate-50/50 p-6 dark:border-darkBorder dark:bg-darkCard hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 dark:bg-emerald-900/30 dark:text-emerald-400">
                <FiFileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Resume ATS Score</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Scan your resume file or paste text content to see how friendly it is to Applicant Tracking Systems. Get direct actionable tips.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={itemVariants} className="rounded-xl border border-slate-100 bg-slate-50/50 p-6 dark:border-darkBorder dark:bg-darkCard hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 dark:bg-indigo-900/30 dark:text-indigo-400">
                <FiBarChart2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Detailed Analytics</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Track your weekly solved counts, accuracy scores, subject coverage, and streak logs in high-quality Recharts visualizations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50 dark:bg-darkBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              What Students Say
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Thousands of computer science engineering graduates have used InterviewAce to land placement offers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-darkCard">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                  P
                </div>
                <div>
                  <h4 className="text-sm font-bold">Priya Sharma</h4>
                  <p className="text-xs text-slate-400">Software Engineer @ Microsoft</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed">
                "The mock interview interface really helped me structure my answers. I spent weeks practicing DBMS and Operating Systems here, and it paid off during my interview!"
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-darkCard">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div>
                  <h4 className="text-sm font-bold">Rohan Verma</h4>
                  <p className="text-xs text-slate-400">Associate Analyst @ Deloitte</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed">
                "Loved the ATS Resume Analyzer. I made three changes based on the suggestions—adding specific metrics—and got shortlisted in the very next drive."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-darkCard">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm">
                  A
                </div>
                <div>
                  <h4 className="text-sm font-bold">Ananya Goel</h4>
                  <p className="text-xs text-slate-400">SDE Intern @ Amazon</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed">
                "The notes feature is super handy. I saved all my quick SQL query definitions right inside the platform, making it a breeze to study them on my phone before interviews."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (Coming Soon) */}
      <section className="py-20 border-t border-slate-100 dark:border-darkBorder bg-white dark:bg-darkCard/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center rounded-full bg-secondary/15 px-3 py-1 text-xs font-bold text-secondary dark:bg-secondary/20 dark:text-secondary-light mb-3">
              PRICING PLANS
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Get access to all prep resources. Upgrade to premium features when we release them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Tier */}
            <div className="rounded-xl border border-slate-200 bg-white p-8 dark:border-darkBorder dark:bg-darkCard relative overflow-hidden flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Basic Prep</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">All essential study resources and simulators.</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight">$0</span>
                  <span className="ml-1 text-xl font-semibold text-slate-500">/forever</span>
                </div>
                <ul className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center">
                    <FiCheck className="text-emerald-500 mr-2 flex-shrink-0" /> Subject-wise Questions Bank
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="text-emerald-500 mr-2 flex-shrink-0" /> ATS Resume Scanner UI
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="text-emerald-500 mr-2 flex-shrink-0" /> Local Progress & Notes tracker
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="text-emerald-500 mr-2 flex-shrink-0" /> Dark mode support
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link to="/dashboard" className="block w-full text-center rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 py-3 text-sm font-semibold transition">
                  Get Started Free
                </Link>
              </div>
            </div>

            {/* Premium Tier (Coming Soon) */}
            <div className="rounded-xl border-2 border-secondary bg-white p-8 dark:border-secondary dark:bg-darkCard relative overflow-hidden flex flex-col justify-between shadow-lg">
              <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold uppercase py-1 px-4 rounded-bl-lg">
                COMING SOON
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                  InterviewAce Pro <FiAward className="ml-1.5 text-secondary" />
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Live AI evaluations and mentor mocks.</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight text-secondary">$15</span>
                  <span className="ml-1 text-xl font-semibold text-slate-500">/month</span>
                </div>
                <ul className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center">
                    <FiCheck className="text-secondary mr-2 flex-shrink-0" /> Real LLM AI feedback for interviews
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="text-secondary mr-2 flex-shrink-0" /> Direct PDF resume parser & analyzer
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="text-secondary mr-2 flex-shrink-0" /> Over 1000+ advanced system design questions
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="text-secondary mr-2 flex-shrink-0" /> Verified placement certifications
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <button disabled className="block w-full text-center rounded-lg bg-secondary text-white py-3 text-sm font-semibold opacity-60 cursor-not-allowed">
                  Launching Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
