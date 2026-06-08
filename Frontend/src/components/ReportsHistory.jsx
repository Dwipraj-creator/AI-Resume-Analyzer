import { useEffect, useState } from "react";
import { FiClock, FiBarChart2, FiTarget, FiChevronRight } from "react-icons/fi";
import { getReports } from "../api/resumeApi";

const ReportsHistory = ({ setAnalysis }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const result = await getReports();
      setReports(result.data || []);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const getScoreBadgeColor = (score) => {
    if (score >= 80) return "badge-success";
    if (score >= 60) return "badge-warning";
    return "badge-error";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="card p-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-4 w-1/3 mx-auto"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="space-y-3">
        <h2 className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-4">
          <div className="p-3 bg-linear-to-br from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/40 rounded-xl shadow-lg shadow-primary-500/20">
            <FiClock className="text-primary-600 dark:text-primary-400 text-3xl" />
          </div>
          Previous Reports
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {reports.length > 0
            ? `You have ${reports.length} ${reports.length === 1 ? "analysis" : "analyses"} saved`
            : "No reports yet. Upload a resume to get started!"}
        </p>
      </div>

      {/* Reports List */}
      {reports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <div
              key={report._id}
              onClick={() => setAnalysis(report)}
              className="card p-8 cursor-pointer hover:shadow-2xl dark:hover:shadow-2xl group transition-all duration-300 transform hover:-translate-y-2 bg-linear-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900/50 border border-slate-200 dark:border-slate-700/50"
            >
              {/* Score Indicator Circle */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  {/* File Name */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex items-center gap-2 line-clamp-2">
                    {report.fileName}
                    <FiChevronRight className="text-slate-400 dark:text-slate-600 group-hover:translate-x-1 transition-transform shrink-0" />
                  </h3>
                </div>

                <div className="relative w-24 h-24 shrink-0 ml-4">
                  <svg
                    className="w-full h-full transform -rotate-90 drop-shadow-lg"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      className="fill-none stroke-slate-200 dark:stroke-slate-700"
                      strokeWidth="6"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      className={`fill-none transition-all ${
                        report.overallScore >= 80
                          ? "stroke-green-500"
                          : report.overallScore >= 60
                            ? "stroke-yellow-500"
                            : "stroke-red-500"
                      }`}
                      strokeWidth="6"
                      strokeDasharray={`${report.overallScore * 2.83} 283`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-primary-600 dark:text-primary-400">
                      {report.overallScore}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* Scores Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-lg">
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1">
                    Overall Score
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {report.overallScore}%
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-1">
                    ATS Score
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {report.atsScore}%
                  </p>
                </div>
              </div>

              {/* Status Badge & Date */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                <span
                  className={`badge ${getScoreBadgeColor(report.overallScore)}`}
                >
                  {report.overallScore >= 80
                    ? "✨ Excellent"
                    : report.overallScore >= 60
                      ? "⭐ Good"
                      : "⚠️ Needs Work"}
                </span>
                {report.createdAt && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {formatDate(report.createdAt)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card p-16 text-center border-2 border-dashed border-slate-300 dark:border-slate-600 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900/30 dark:to-slate-800/30">
          <div className="p-5 bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-2xl mx-auto w-fit mb-6 shadow-lg">
            <FiClock className="text-slate-600 dark:text-slate-400 text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            No Reports Yet
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-1">
            Upload and analyze your first resume to see it here
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Your analysis history will be displayed as you analyze resumes
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportsHistory;
