import { useState, useRef } from "react";
import {
  FiUploadCloud,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
  FiFileText,
  FiShield,
  FiZap,
} from "react-icons/fi";
import { analyzeResume } from "../api/resumeApi";
import Loading from "./Loading";

const headFont = "'Space Grotesk','Inter Tight','Helvetica Neue',Arial,sans-serif";
const monoFont = "'JetBrains Mono','IBM Plex Mono','SFMono-Regular',Menlo,Consolas,monospace";

const Bracket = ({ className }) => (
  <span className={`absolute w-4 h-4 border-[#FF8A3D] transition-colors ${className}`} aria-hidden="true" />
);

const ResumeUpload = ({ setAnalysis }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (selectedFile) => {
    if (selectedFile.type !== "application/pdf") {
      return "Please select a valid PDF file";
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      return "File size must be less than 10MB";
    }
    return null;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError(null);
    setSuccess(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;

    const validationError = validateFile(droppedFile);
    if (validationError) {
      setError(validationError);
      setFile(null);
      return;
    }

    setFile(droppedFile);
    setError(null);
    setSuccess(false);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    try {
      setLoading(true);
      const result = await analyzeResume(file);

      setAnalysis(result.data);
      setSuccess(true);
      removeFile();

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to analyze resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const bracketColor = dragActive ? "border-[#FF8A3D]" : "border-[#262B30]";

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Scan target dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="relative cursor-pointer bg-[#14171A] p-10 md:p-14 transition-colors"
        >
          <Bracket className={`top-0 left-0 border-t-2 border-l-2 -translate-x-px -translate-y-px ${bracketColor}`} />
          <Bracket className={`top-0 right-0 border-t-2 border-r-2 translate-x-px -translate-y-px ${bracketColor}`} />
          <Bracket className={`bottom-0 left-0 border-b-2 border-l-2 -translate-x-px translate-y-px ${bracketColor}`} />
          <Bracket className={`bottom-0 right-0 border-b-2 border-r-2 translate-x-px translate-y-px ${bracketColor}`} />

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            disabled={loading}
          />

          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6 w-16 h-16 rounded-full bg-[#1C2024] border border-[#262B30] flex items-center justify-center">
              <FiUploadCloud className="text-[#FF8A3D] text-2xl" />
            </div>

            <h3 className="text-xl text-[#E8E6E1] mb-2" style={{ fontFamily: headFont, fontWeight: 600 }}>
              Drop resume to scan
            </h3>

            <p className="text-[#7A828A] max-w-md text-sm">
              Drag and drop a PDF here, or click to choose a file from your device.
            </p>

            <p className="mt-3 text-xs text-[#4A5158]" style={{ fontFamily: monoFont }}>
              .pdf only — max 10MB
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl">
              {[
                [FiFileText, "PDF parsing"],
                [FiZap, "AI analysis"],
                [FiShield, "Private report"],
              ].map(([Icon, label], index) => (
                <div
                  key={index}
                  className="rounded-sm bg-[#1C2024] border border-[#262B30] p-3 flex items-center justify-center gap-2"
                >
                  <Icon className="text-[#FF8A3D]" size={14} />
                  <span className="text-sm text-[#C7C1B4]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected file */}
        {file && (
          <div className="rounded-md bg-[#14171A] border border-[#262B30] p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="rounded-sm bg-[#1C2024] border border-[#262B30] p-3">
                <FiCheckCircle className="text-[#5FD3A0] text-xl" />
              </div>
              <div className="min-w-0">
                <p className="text-[#E8E6E1] truncate" style={{ fontFamily: monoFont, fontSize: 14 }}>
                  {file.name}
                </p>
                <p className="text-sm text-[#7A828A]">
                  {(file.size / 1024 / 1024).toFixed(2)} MB · ready to analyze
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="shrink-0 p-2 rounded-sm bg-[#1C2024] text-[#7A828A] hover:text-[#FF5D5D] border border-[#262B30] transition-colors"
              title="Remove file"
            >
              <FiX size={17} />
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-md bg-[#14171A] border border-[#FF5D5D]/40 p-4 flex gap-3">
            <FiAlertCircle className="text-[#FF5D5D] text-lg shrink-0 mt-0.5" />
            <p className="text-[#E8E6E1] text-sm">{error}</p>
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="rounded-md bg-[#14171A] border border-[#5FD3A0]/40 p-4 flex gap-3">
            <FiCheckCircle className="text-[#5FD3A0] text-lg shrink-0 mt-0.5" />
            <div>
              <p className="text-[#E8E6E1] text-sm">Resume analyzed successfully.</p>
              <p className="text-sm text-[#7A828A] mt-0.5">Scroll down to view your detailed report.</p>
            </div>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!file || loading}
          className="w-full rounded-sm bg-[#FF8A3D] px-8 py-4 text-[#0A0C0E] text-base hover:bg-[#FFA05E] transition-colors disabled:bg-[#262B30] disabled:text-[#4A5158] disabled:cursor-not-allowed flex items-center justify-center gap-3"
          style={{ fontFamily: headFont, fontWeight: 600 }}
        >
          <FiUploadCloud size={19} />
          <span>Analyze resume with AI</span>
        </button>
      </form>
    </div>
  );
};

export default ResumeUpload;