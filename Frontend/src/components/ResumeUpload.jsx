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

const ResumeUpload = ({ setAnalysis }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
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
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

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
        err.response?.data?.message ||
          "Failed to analyze resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="group cursor-pointer rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-10 md:p-14 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-300"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            disabled={loading}
          />

          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-5 group-hover:scale-105 transition-transform">
              <FiUploadCloud className="text-blue-600 dark:text-blue-400 text-5xl" />
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">
              Upload Your Resume
            </h3>

            <p className="text-slate-600 dark:text-slate-400 max-w-xl">
              Drag and drop your PDF resume here, or click to choose a file from
              your device.
            </p>

            <p className="mt-3 text-sm text-slate-500 dark:text-slate-500">
              PDF only • Maximum file size 10MB
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 flex items-center justify-center gap-2">
                <FiFileText className="text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  PDF Parsing
                </span>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 flex items-center justify-center gap-2">
                <FiZap className="text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  AI Analysis
                </span>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 flex items-center justify-center gap-2">
                <FiShield className="text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Private Report
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected File */}
        {file && (
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-3">
                <FiCheckCircle className="text-blue-600 dark:text-blue-400 text-2xl" />
              </div>

              <div className="min-w-0">
                <p className="font-bold text-slate-900 dark:text-white truncate">
                  {file.name}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="shrink-0 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition"
              title="Remove file"
            >
              <FiX size={20} />
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-5 flex gap-4">
            <FiAlertCircle className="text-red-600 dark:text-red-400 text-2xl shrink-0 mt-0.5" />

            <p className="font-semibold text-red-800 dark:text-red-200">
              {error}
            </p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-5 flex gap-4">
            <FiCheckCircle className="text-green-600 dark:text-green-400 text-2xl shrink-0 mt-0.5" />

            <div>
              <p className="font-semibold text-green-900 dark:text-green-200">
                Resume analyzed successfully.
              </p>
              <p className="text-sm text-green-800 dark:text-green-300 mt-1">
                Scroll down to view your detailed report.
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
       <button
  type="submit"
  disabled={!file || loading}
  className="w-full rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-6 text-white font-bold text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-4"
>
  <FiUploadCloud size={30} />
  <span>Analyze Resume with AI</span>
</button>
      </form>
    </div>
  );
};

export default ResumeUpload;