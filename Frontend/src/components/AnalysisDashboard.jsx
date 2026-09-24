import {
  FiCheckCircle,
  FiAlertCircle,
  FiTrendingUp,
  FiTarget,
  FiInfo,
  FiBookmark,
  FiDownload,
} from "react-icons/fi";

import ScoreDonut from "./ScoreDonut";
import { generateResumeReportPdf } from "../utils/ExportResumeReportPdf"
import { useToast } from "../context/ToastContext";

const headFont = "'Space Grotesk','Inter Tight','Helvetica Neue',Arial,sans-serif";
const monoFont = "'JetBrains Mono','IBM Plex Mono','SFMono-Regular',Menlo,Consolas,monospace";

// Corner-bracket frame — used only on the two focal score panels
const Bracket = ({ className }) => (
  <span
    className={`absolute w-3 h-3 border-[#FF8A3D] ${className}`}
    aria-hidden="true"
  />
);

const ScanPanel = ({ children }) => (
  <div className="relative bg-[#14171A] border border-[#262B30] rounded-md p-7">
    <Bracket className="top-0 left-0 border-t-2 border-l-2 -translate-x-px -translate-y-px" />
    <Bracket className="top-0 right-0 border-t-2 border-r-2 translate-x-px -translate-y-px" />
    <Bracket className="bottom-0 left-0 border-b-2 border-l-2 -translate-x-px translate-y-px" />
    <Bracket className="bottom-0 right-0 border-b-2 border-r-2 translate-x-px translate-y-px" />
    {children}
  </div>
);

const AnalysisDashboard = ({ analysis }) => {
  const { showToast } = useToast();

  if (!analysis) return null;

  const handleExport = () => {
    try {
      const baseName = analysis.fileName
        ? analysis.fileName.replace(/\.pdf$/i, "")
        : "resume";
      generateResumeReportPdf(analysis, `${baseName}-analysis-report.pdf`);
      showToast("Report downloaded.", "success");
    } catch (error) {
      showToast("Couldn't generate the PDF. Please try again.", "error");
    }
  };

  const card = "bg-[#14171A] border border-[#262B30] rounded-md p-7 space-y-6";
  const listItem = "flex gap-3 p-4 rounded-sm bg-[#1C2024] border border-[#262B30]";

  const SectionHeader = ({ icon: Icon, index, title, subtitle }) => (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-sm border border-[#262B30] bg-[#1C2024] flex items-center justify-center shrink-0">
        <Icon className="text-[#FF8A3D] text-base" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {index && (
            <span className="text-xs text-[#4A5158]" style={{ fontFamily: monoFont }}>
              {index}
            </span>
          )}
          <h3 className="text-base text-[#E8E6E1]" style={{ fontFamily: headFont, fontWeight: 600 }}>
            {title}
          </h3>
        </div>
        <p className="text-sm text-[#7A828A]">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="space-y-2">
          <h2 className="text-2xl text-[#E8E6E1]" style={{ fontFamily: headFont, fontWeight: 700 }}>
            Resume analysis report
          </h2>
          <p className="text-[#7A828A]">
            Detailed insights and actionable recommendations to improve your resume.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#14171A] border border-[#262B30] text-[#C7C1B4] hover:text-[#FF8A3D] hover:border-[#FF8A3D]/40 transition-colors text-sm shrink-0"
        >
          <FiDownload size={15} />
          Export PDF
        </button>
      </div>

      {/* Score dials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScanPanel>
          <ScoreDonut title="Overall score" score={analysis.overallScore} />
        </ScanPanel>
        <ScanPanel>
          <ScoreDonut title="ATS score" score={analysis.atsScore} />
        </ScanPanel>
      </div>

      {/* Detailed breakdown */}
      <div className={card}>
        <SectionHeader icon={FiTrendingUp} index="01" title="Detailed score breakdown" subtitle="Category-wise resume performance." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["Skills score", analysis.skillsScore],
            ["Project score", analysis.projectScore],
            ["Experience score", analysis.experienceScore],
            ["Education score", analysis.educationScore],
            ["Formatting score", analysis.formattingScore],
          ].map(([label, score], index) => (
            <div key={index} className="p-4 rounded-sm bg-[#1C2024] border border-[#262B30]">
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-[#C7C1B4]">{label}</span>
                <span className="text-[#E8E6E1]" style={{ fontFamily: monoFont }}>
                  {score || 0}%
                </span>
              </div>
              <div className="w-full h-1 bg-[#262B30] overflow-hidden">
                <div
                  className="h-full bg-[#FF8A3D]"
                  style={{ width: `${score || 0}%`, transition: "width 0.6s ease-out" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className={card}>
        <SectionHeader icon={FiCheckCircle} index="02" title="Strengths" subtitle="What's working well in your resume." />
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.strengths?.map((item, index) => (
            <li key={index} className={listItem}>
              <FiCheckCircle className="text-[#5FD3A0] mt-0.5 shrink-0" size={15} />
              <span className="text-[#C7C1B4] text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className={card}>
        <SectionHeader icon={FiAlertCircle} index="03" title="Areas for improvement" subtitle="Focus on these points to strengthen your resume." />
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.weaknesses?.map((item, index) => (
            <li key={index} className={listItem}>
              <FiAlertCircle className="text-[#FF5D5D] mt-0.5 shrink-0" size={15} />
              <span className="text-[#C7C1B4] text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Missing skills */}
      <div className={card}>
        <SectionHeader icon={FiInfo} index="04" title="Missing skills" subtitle="High-demand skills you can add." />
        <div className="flex flex-wrap gap-2">
          {analysis.missingSkills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-sm bg-[#1C2024] text-[#FF5D5D] border border-[#262B30] text-sm"
              style={{ fontFamily: monoFont }}
            >
              + {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Improvement suggestions */}
      {analysis.improvementSuggestions?.length > 0 && (
        <div className={card}>
          <SectionHeader icon={FiTrendingUp} index="05" title="Improvement suggestions" subtitle="Practical actions to improve your resume." />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysis.improvementSuggestions.map((item, index) => (
              <li key={index} className={listItem}>
                <span className="text-[#FF8A3D] mt-0.5 shrink-0" style={{ fontFamily: monoFont }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[#C7C1B4] text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested summary */}
      {analysis.suggestedSummary && (
        <div className={card}>
          <SectionHeader icon={FiBookmark} index="06" title="Suggested professional summary" subtitle="AI-optimized summary for your resume." />
          <p className="text-[#C7C1B4] leading-relaxed p-5 bg-[#1C2024] rounded-sm border border-[#262B30]">
            {analysis.suggestedSummary}
          </p>
        </div>
      )}

      {/* Recommended keywords */}
      {analysis.recommendedKeywords?.length > 0 && (
        <div className={card}>
          <SectionHeader icon={FiTarget} index="07" title="Recommended keywords" subtitle="ATS-friendly keywords to include." />
          <div className="flex flex-wrap gap-2">
            {analysis.recommendedKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-sm bg-[#1C2024] text-[#FF8A3D] border border-[#262B30] text-sm"
                style={{ fontFamily: monoFont }}
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