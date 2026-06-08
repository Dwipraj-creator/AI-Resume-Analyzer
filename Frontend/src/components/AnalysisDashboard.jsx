import {
  FiCheckCircle,
  FiAlertCircle,
  FiTrendingUp,
  FiTarget,
  FiInfo,
  FiBookmark,
} from "react-icons/fi";

import ScoreChart from "./ScoreChart";
import ScoreDonut from "./ScoreDonut";

const AnalysisDashboard = ({ analysis }) => {
  if (!analysis) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return "from-green-500 to-emerald-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const ScoreCard = ({ label, score, icon: Icon, gradient }) => {
    const scoreStatus =
      score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Work";
    const bgClass =
      score >= 80
        ? "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800"
        : score >= 60
          ? "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800"
          : "from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800";

    return (
      <div className={`card p-8 space-y-6 bg-linear-to-br ${bgClass} border`}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="score-label text-sm font-semibold uppercase tracking-wide">
              {label}
            </p>
            <p
              className={`score-value text-5xl font-black bg-linear-to-r ${gradient} bg-clip-text text-transparent`}
            >
              {score}%
            </p>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {scoreStatus}
            </p>
          </div>
          <div
            className={`p-4 bg-linear-to-br ${gradient} rounded-2xl shadow-lg shadow-${gradient.split("-")[1]}-500/20`}
          >
            <Icon className="text-3xl text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="w-full bg-slate-300 dark:bg-slate-600 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full bg-linear-to-r ${gradient} transition-all duration-500 rounded-full`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">Progress</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Premium Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse-soft"></span>
          <span className="text-sm font-semibold text-green-700 dark:text-green-300">
            Analysis Complete
          </span>
        </div>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white">
          Resume Analysis Report
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Detailed insights and actionable recommendations to improve your
          resume
        </p>
      </div>

      {/* Score Cards Grid - Premium Layout */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <ScoreDonut
    title="Overall Score"
    score={analysis.overallScore}
  />

  <ScoreDonut
    title="ATS Score"
    score={analysis.atsScore}
  />
</div>



      {/* Strengths Section */}
      <div className="card p-10 space-y-8 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-200 dark:border-green-800/30">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-green-100 dark:bg-green-900/40 rounded-xl shadow-lg shadow-green-500/20">
            <FiCheckCircle className="text-green-600 dark:text-green-400 text-3xl" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              Strengths
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              What's working well in your resume
            </p>
          </div>
        </div>
        <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.strengths?.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-green-100 dark:border-green-900/30 hover:shadow-md transition-all"
            >
              <span className="text-green-600 dark:text-green-400 font-bold text-xl shrink-0 mt-0">
                ✓
              </span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses Section */}
      <div className="card p-10 space-y-8 bg-linear-to-br from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 border border-red-200 dark:border-red-800/30">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-red-100 dark:bg-red-900/40 rounded-xl shadow-lg shadow-red-500/20">
            <FiAlertCircle className="text-red-600 dark:text-red-400 text-3xl" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              Areas for Improvement
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Focus on these to strengthen your resume
            </p>
          </div>
        </div>
        <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.weaknesses?.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-red-100 dark:border-red-900/30 hover:shadow-md transition-all"
            >
              <span className="text-red-600 dark:text-red-400 font-bold text-xl shrink-0 mt-0">
                ⚠
              </span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Missing Skills Section */}
      <div className="card p-10 space-y-8 bg-linear-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border border-yellow-200 dark:border-yellow-800/30">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900/40 rounded-xl shadow-lg shadow-yellow-500/20">
            <FiInfo className="text-yellow-600 dark:text-yellow-400 text-3xl" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              Missing Skills
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              High-demand skills to add to your resume
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {analysis.missingSkills?.map((skill, index) => (
            <span
              key={index}
              className="badge badge-warning font-semibold text-sm"
            >
              + {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Improvement Suggestions */}
      {analysis.improvementSuggestions &&
        analysis.improvementSuggestions.length > 0 && (
          <div className="card p-10 space-y-8 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border border-blue-200 dark:border-blue-800/30">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/40 rounded-xl shadow-lg shadow-blue-500/20">
                <FiTrendingUp className="text-blue-600 dark:text-blue-400 text-3xl" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Improvement Suggestions
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Actionable tips to enhance your resume
                </p>
              </div>
            </div>
            <ul className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.improvementSuggestions.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-3 p-4 rounded-xl bg-white dark:bg-slate-800/50 border border-blue-100 dark:border-blue-900/30 hover:shadow-md transition-all"
                >
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xl shrink-0 mt-0">
                    →
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* Suggested Summary */}
      {analysis.suggestedSummary && (
        <div className="card p-10 space-y-6 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border border-purple-200 dark:border-purple-800/30">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/40 rounded-xl shadow-lg shadow-purple-500/20">
              <FiBookmark className="text-purple-600 dark:text-purple-400 text-3xl" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                Suggested Professional Summary
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Improve your resume with this AI-optimized summary
              </p>
            </div>
          </div>
          <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-medium p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-purple-100 dark:border-purple-900/30">
            {analysis.suggestedSummary}
          </p>
        </div>
      )}

      {/* Recommended Keywords */}
      {analysis.recommendedKeywords &&
        analysis.recommendedKeywords.length > 0 && (
          <div className="card p-10 space-y-8 bg-linear-to-br from-accent-50 to-purple-50 dark:from-accent-900/10 dark:to-purple-900/10 border border-accent-200 dark:border-accent-800/30">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-accent-100 dark:bg-accent-900/40 rounded-xl shadow-lg shadow-accent-500/20">
                <FiTarget className="text-accent-600 dark:text-accent-400 text-3xl" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Recommended Keywords
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Essential ATS keywords to include
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {analysis.recommendedKeywords.map((keyword, index) => (
                <span
                  key={index}
                  className="badge badge-purple font-semibold text-sm"
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
