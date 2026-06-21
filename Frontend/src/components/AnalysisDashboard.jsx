import {
  FiCheckCircle,
  FiAlertCircle,
  FiTrendingUp,
  FiTarget,
  FiInfo,
  FiBookmark,
} from "react-icons/fi";

import ScoreDonut from "./ScoreDonut";

const AnalysisDashboard = ({ analysis }) => {
  if (!analysis) return null;

  const sectionCard =
    "card p-8 space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm";

  const listItem =
    "flex gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all";

  const sectionHeader = "flex items-center gap-4";

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
            Analysis Complete
          </span>
        </div>

        <h2 className="text-4xl font-black text-slate-900 dark:text-white">
          Resume Analysis Report
        </h2>

        <p className="text-lg text-slate-600 dark:text-slate-400">
          Detailed insights and actionable recommendations to improve your
          resume.
        </p>
      </div>

      {/* Score Donuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ScoreDonut title="Overall Score" score={analysis.overallScore} />
        <ScoreDonut title="ATS Score" score={analysis.atsScore} />
      </div>

      {/* Extra Scores */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <FiTrendingUp className="text-blue-600 dark:text-blue-400 text-3xl" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Detailed Score Breakdown
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Category-wise resume performance.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            ["Skills Score", analysis.skillsScore],
            ["Project Score", analysis.projectScore],
            ["Experience Score", analysis.experienceScore],
            ["Education Score", analysis.educationScore],
            ["Formatting Score", analysis.formattingScore],
          ].map(([label, score], index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex justify-between mb-2">
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  {label}
                </p>
                <p className="font-bold text-slate-900 dark:text-white">
                  {score || 0}%
                </p>
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${score || 0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl">
            <FiCheckCircle className="text-green-600 dark:text-green-400 text-3xl" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Strengths
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              What is working well in your resume.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.strengths?.map((item, index) => (
            <li key={index} className={listItem}>
              <span className="text-green-600 dark:text-green-400 font-bold">
                ✓
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-xl">
            <FiAlertCircle className="text-red-600 dark:text-red-400 text-3xl" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Areas for Improvement
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Focus on these points to strengthen your resume.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.weaknesses?.map((item, index) => (
            <li key={index} className={listItem}>
              <span className="text-red-600 dark:text-red-400 font-bold">
                ⚠
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Missing Skills */}
      <div className={sectionCard}>
        <div className={sectionHeader}>
          <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
            <FiInfo className="text-amber-600 dark:text-amber-400 text-3xl" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Missing Skills
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              High-demand skills you can add.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {analysis.missingSkills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-sm font-semibold"
            >
              + {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Improvement Suggestions */}
      {analysis.improvementSuggestions?.length > 0 && (
        <div className={sectionCard}>
          <div className={sectionHeader}>
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <FiTrendingUp className="text-blue-600 dark:text-blue-400 text-3xl" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Improvement Suggestions
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Practical actions to improve your resume.
              </p>
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.improvementSuggestions.map((item, index) => (
              <li key={index} className={listItem}>
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  →
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested Summary */}
      {analysis.suggestedSummary && (
        <div className={sectionCard}>
          <div className={sectionHeader}>
            <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <FiBookmark className="text-purple-600 dark:text-purple-400 text-3xl" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Suggested Professional Summary
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                AI-optimized summary for your resume.
              </p>
            </div>
          </div>

          <p className="text-base md:text-lg text-slate-800 dark:text-slate-200 leading-relaxed p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
            {analysis.suggestedSummary}
          </p>
        </div>
      )}

      {/* Recommended Keywords */}
      {analysis.recommendedKeywords?.length > 0 && (
        <div className={sectionCard}>
          <div className={sectionHeader}>
            <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
              <FiTarget className="text-indigo-600 dark:text-indigo-400 text-3xl" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Recommended Keywords
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                ATS-friendly keywords to include.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {analysis.recommendedKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-sm font-semibold"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisDashboard;