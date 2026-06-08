import { useState } from "react";
import { FiMoon, FiSun, FiUploadCloud, FiArrowRight } from "react-icons/fi";
import ResumeUpload from "./components/ResumeUpload";
import AnalysisDashboard from "./components/AnalysisDashboard";
import ReportsHistory from "./components/ReportsHistory";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const [analysis, setAnalysis] = useState(null);
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/50 dark:bg-linear-to-r dark:from-slate-800/50 dark:to-slate-900/50 border-b border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-linear-to-br from-primary-500 to-accent-600 rounded-xl shadow-lg shadow-primary-500/30">
              <FiUploadCloud className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                ResumePro
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
                AI-POWERED OPTIMIZATION
              </p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200 shadow-md hover:shadow-lg"
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Premium Hero Section */}
        {!analysis && (
          <div className="text-center mb-16 animate-fadeIn">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800">
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                ✨ Powered by Advanced AI & n8n Automation
              </span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Analyze & Optimize
              <br />
              <span className="bg-linear-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400 bg-clip-text text-transparent">
                Your Resume
              </span>
            </h2>
            <p className="text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto mb-2 font-medium">
              Get AI-driven insights to improve your chances with ATS systems
              and recruiters
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Used by 10,000+ job seekers | 94% success rate
            </p>
          </div>
        )}

        {/* Upload Section */}
        <div className="mb-20">
          <ResumeUpload setAnalysis={setAnalysis} />
        </div>

        {/* Analysis Dashboard */}
        {analysis && (
          <div className="mb-16 animate-fadeIn">
            <AnalysisDashboard analysis={analysis} />
          </div>
        )}

        {/* History Section */}
        <div className="animate-slideIn">
          <ReportsHistory setAnalysis={setAnalysis} />
        </div>
      </main>

      {/* Premium Footer */}
      <footer className="bg-white dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700/50 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                Product
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                Connect
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-8 text-center text-slate-600 dark:text-slate-400 text-sm">
            <p>
              © 2024 ResumePro. Built with React & n8n. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
