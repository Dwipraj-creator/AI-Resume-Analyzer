import { useEffect, useState } from "react";
import { FiClock, FiChevronRight, FiTrash2 } from "react-icons/fi";
import { getReports, deleteReport } from "../api/resumeApi";

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatus = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Work";
  };

  const getStatusClass = (score) => {
    if (score >= 80) {
      return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800";
    }

    if (score >= 60) {
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800";
    }

    return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800";
  };

  const getCircleColor = (score) => {
    if (score >= 80) return "stroke-green-500";
    if (score >= 60) return "stroke-amber-500";
    return "stroke-red-500";
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete this report?");

      if (!confirmDelete) return;

      await deleteReport(id);

      setReports((prev) => prev.filter((report) => report._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
        <div className="animate-pulse space-y-5">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="h-56 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
            <div className="h-56 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <FiClock className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Resume History
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
            Previous Reports
          </h2>

          <p className="text-slate-600 dark:text-slate-400">
            {reports.length > 0
              ? `You have ${reports.length} ${
                  reports.length === 1 ? "analysis" : "analyses"
                } saved.`
              : "No reports yet. Upload a resume to get started."}
          </p>
        </div>
      </div>

      {reports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <div
              key={report._id}
              onClick={() => setAnalysis(report)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-5 mb-6">
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 flex items-center gap-2">
                    {report.fileName}
                    <FiChevronRight className="shrink-0 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </h3>

                  {report.createdAt && (
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      Created on {formatDate(report.createdAt)}
                    </p>
                  )}
                </div>

                <div className="relative w-20 h-20 shrink-0">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      className="fill-none stroke-slate-200 dark:stroke-slate-800"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      className={`fill-none ${getCircleColor(
                        report.overallScore
                      )}`}
                      strokeWidth="8"
                      strokeDasharray={`${
                        (report.overallScore || 0) * 2.76
                      } 276`}
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      {report.overallScore || 0}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                    Overall
                  </p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">
                    {report.overallScore || 0}%
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                    ATS
                  </p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">
                    {report.atsScore || 0}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-slate-200 dark:border-slate-800">
                <span
                  className={`px-3 py-1 rounded-full border text-sm font-semibold ${getStatusClass(
                    report.overallScore
                  )}`}
                >
                  {getStatus(report.overallScore)}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(report._id);
                  }}
                  className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/30 transition"
                  title="Delete report"
                >
                  <FiTrash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-14 text-center shadow-sm">
          <div className="mx-auto mb-6 w-fit rounded-2xl bg-slate-100 dark:bg-slate-800 p-5">
            <FiClock className="text-slate-500 dark:text-slate-400 text-4xl" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            No Reports Yet
          </h3>

          <p className="text-slate-600 dark:text-slate-400">
            Upload and analyze your first resume to see it here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportsHistory;