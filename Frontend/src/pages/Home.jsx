import { useState } from "react";
import { FiMoon, FiSun, FiUploadCloud, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import ResumeUpload from "../components/ResumeUpload";
import AnalysisDashboard from "../components/AnalysisDashboard";
import ReportsHistory from "../components/ReportsHistory";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [analysis, setAnalysis] = useState(null);

  const { isDark, toggleTheme } = useTheme();
  const { logout, user } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20">
              <FiUploadCloud className="text-white text-2xl" />
            </div>

            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResumePro
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
                AI Resume Analyzer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/30 font-semibold transition"
            >
              <FiLogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {!analysis && (
          <section className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Powered by AI, n8n Automation & ATS Scoring
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Analyze and Optimize
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Resume
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Upload your PDF resume and get ATS-style scores, missing skills,
              improvement suggestions, and AI-generated keywords.
            </p>
          </section>
        )}

        <section className="mb-16">
          <ResumeUpload setAnalysis={setAnalysis} />
        </section>

        {analysis && (
          <section className="mb-16">
            <AnalysisDashboard analysis={analysis} />
          </section>
        )}

        <section>
          <ReportsHistory setAnalysis={setAnalysis} />
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2026 ResumePro. Built with React, Node.js, MongoDB, n8n and Gemini AI.
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Portfolio project by{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Dwipraj Dey
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;