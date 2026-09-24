import { useEffect, useState } from "react";
import { FiClock, FiChevronRight, FiTrash2 } from "react-icons/fi";
import { getReports, deleteReport } from "../api/resumeApi";
import { useToast } from "../context/ToastContext";
import ConfirmDialog from "./ConfirmDialog";

const headFont = "'Space Grotesk','Inter Tight','Helvetica Neue',Arial,sans-serif";
const monoFont = "'JetBrains Mono','IBM Plex Mono','SFMono-Regular',Menlo,Consolas,monospace";

const ReportsHistory = ({ setAnalysis }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const { showToast } = useToast();

  const fetchReports = async () => {
    try {
      const result = await getReports();
      setReports(result.data || []);
    } catch (error) {
      showToast("Couldn't load your reports. Please try again.", "error");
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getStatus = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs work";
  };

  const getTierColor = (score) => {
    if (score >= 80) return "#5FD3A0";
    if (score >= 60) return "#FF8A3D";
    return "#FF5D5D";
  };

  const pendingReport = reports.find((r) => r._id === pendingDeleteId);

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;

    try {
      setDeleting(true);
      await deleteReport(pendingDeleteId);
      setReports((prev) => prev.filter((report) => report._id !== pendingDeleteId));
      showToast("Report deleted.", "success");
    } catch (error) {
      showToast("Couldn't delete this report. Please try again.", "error");
    } finally {
      setDeleting(false);
      setPendingDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="rounded-md bg-[#14171A] border border-[#262B30] p-8">
        <div className="animate-pulse space-y-5">
          <div className="h-6 bg-[#1C2024] rounded-sm w-1/3" />
          <div className="h-4 bg-[#1C2024] rounded-sm w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
            <div className="h-44 bg-[#1C2024] rounded-sm" />
            <div className="h-44 bg-[#1C2024] rounded-sm" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-[#7A828A] text-sm">
          <FiClock size={13} />
          <span style={{ fontFamily: monoFont }}>report_history</span>
        </div>

        <h2 className="text-2xl text-[#E8E6E1]" style={{ fontFamily: headFont, fontWeight: 700 }}>
          Previous reports
        </h2>

        <p className="text-[#7A828A]">
          {reports.length > 0
            ? `${reports.length} ${reports.length === 1 ? "analysis" : "analyses"} saved.`
            : "No reports yet. Upload a resume to get started."}
        </p>
      </div>

      {reports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reports.map((report) => (
            <div
              key={report._id}
              onClick={() => setAnalysis(report)}
              className="group cursor-pointer rounded-md bg-[#14171A] border border-[#262B30] p-6 hover:border-[#FF8A3D]/40 transition-colors duration-200"
            >
              <div className="flex items-start justify-between gap-5 mb-5">
                <div className="min-w-0">
                  <h3
                    className="text-[#E8E6E1] group-hover:text-[#FF8A3D] transition-colors line-clamp-2 flex items-center gap-1.5"
                    style={{ fontFamily: monoFont, fontSize: 14 }}
                  >
                    {report.fileName}
                    <FiChevronRight
                      className="shrink-0 text-[#4A5158] group-hover:translate-x-0.5 transition-transform"
                      size={14}
                    />
                  </h3>

                  {report.createdAt && (
                    <p className="mt-1.5 text-sm text-[#7A828A]">
                      Created {formatDate(report.createdAt)}
                    </p>
                  )}
                </div>

                <div className="relative w-16 h-16 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#262B30" strokeWidth="6" />
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      stroke={getTierColor(report.overallScore)}
                      strokeWidth="6"
                      strokeDasharray={`${(report.overallScore || 0) * 2.76} 276`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm" style={{ fontFamily: monoFont }}>
                      {report.overallScore || 0}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-sm bg-[#1C2024] border border-[#262B30] p-3">
                  <p className="text-xs text-[#7A828A] mb-1">Overall</p>
                  <p className="text-lg text-[#E8E6E1]" style={{ fontFamily: monoFont }}>
                    {report.overallScore || 0}%
                  </p>
                </div>
                <div className="rounded-sm bg-[#1C2024] border border-[#262B30] p-3">
                  <p className="text-xs text-[#7A828A] mb-1">ATS</p>
                  <p className="text-lg text-[#E8E6E1]" style={{ fontFamily: monoFont }}>
                    {report.atsScore || 0}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#262B30]">
                <span
                  className="px-3 py-1 rounded-sm border text-sm"
                  style={{
                    color: getTierColor(report.overallScore),
                    borderColor: `${getTierColor(report.overallScore)}40`,
                  }}
                >
                  {getStatus(report.overallScore)}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPendingDeleteId(report._id);
                  }}
                  className="p-2 rounded-sm bg-[#1C2024] text-[#7A828A] hover:text-[#FF5D5D] border border-[#262B30] transition-colors"
                  title="Delete report"
                >
                  <FiTrash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-[#262B30] bg-[#14171A] p-14 text-center">
          <div className="mx-auto mb-6 w-fit rounded-full bg-[#1C2024] border border-[#262B30] p-5">
            <FiClock className="text-[#7A828A] text-2xl" />
          </div>

          <h3 className="text-lg text-[#E8E6E1] mb-2" style={{ fontFamily: headFont, fontWeight: 600 }}>
            No reports yet
          </h3>

          <p className="text-[#7A828A]">Upload and analyze your first resume to see it here.</p>
        </div>
      )}

      <ConfirmDialog
        open={!!pendingDeleteId}
        title="Delete this report?"
        message={pendingReport ? `"${pendingReport.fileName}" will be permanently removed.` : undefined}
        confirmLabel={deleting ? "Deleting..." : "Delete"}
        cancelLabel="Cancel"
        destructive
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
};

export default ReportsHistory;