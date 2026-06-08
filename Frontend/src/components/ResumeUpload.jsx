import { useState, useRef } from "react";
import {
  FiUploadCloud,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import { analyzeResume } from "../api/resumeApi";

const ResumeUpload = ({ setAnalysis }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Please select a valid PDF file");
        setFile(null);
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      const changeEvent = {
        target: { files: e.dataTransfer.files },
      };
      handleFileChange(changeEvent);
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
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message ||
        "Failed to analyze resume. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Premium Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="card p-12 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-lg transition-all cursor-pointer group bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800/30 dark:to-slate-900/30"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            disabled={loading}
          />

          <div className="flex flex-col items-center justify-center gap-6">
            <div className="p-6 bg-linear-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-2xl group-hover:scale-110 transition-transform">
              <FiUploadCloud className="text-primary-600 dark:text-primary-400 text-6xl" />
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Upload Your Resume
              </h3>
              <p className="text-base text-slate-700 dark:text-slate-400 font-medium">
                Drag and drop your PDF or click to browse
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-500 mt-1">
                Supported format: PDF (Max 10MB)
              </p>
            </div>

            <div className="flex gap-4 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                Instant Analysis
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                AI Powered
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Secure
              </span>
            </div>
          </div>
        </div>

        {/* File Info */}
        {file && (
          <div className="card p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 flex items-center justify-between animate-slideInUp">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                <FiCheckCircle className="text-blue-600 dark:text-blue-400 text-2xl" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {file.name}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            >
              <FiX size={20} className="text-blue-600 dark:text-blue-400" />
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="card p-5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex gap-4 animate-slideInUp">
            <FiAlertCircle className="text-red-600 dark:text-red-400 text-2xl shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900 dark:text-red-200">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="card p-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex gap-4 animate-slideInUp">
            <FiCheckCircle className="text-green-600 dark:text-green-400 text-2xl shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900 dark:text-green-200">
                Resume analyzed successfully! 🎉
              </p>
              <p className="text-sm text-green-800 dark:text-green-300 mt-1">
                Scroll down to view detailed insights and recommendations.
              </p>
            </div>
          </div>
        )}

        {/* Premium Submit Button */}
        <button
          type="submit"
          disabled={!file || loading}
          className="w-full relative group bg-linear-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-2xl disabled:shadow-none hover:-translate-y-1 disabled:hover:translate-y-0 flex items-center justify-center gap-3 text-lg"
        >
          {loading ? (
            <>
              <div className="animate-spin">
                <FiUploadCloud size={24} />
              </div>
              <span>Analyzing Resume...</span>
            </>
          ) : (
            <>
              <FiUploadCloud size={24} />
              <span>Analyze Resume with AI</span>
            </>
          )}
        </button>

        {/* Trust Badges */}
        <div className="flex justify-center items-center gap-8 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              10K+
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Resumes Analyzed
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent-600 dark:text-accent-400">
              94%
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Success Rate
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              &lt;2s
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Analysis Time
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResumeUpload;
