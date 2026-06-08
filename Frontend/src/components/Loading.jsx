const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center py-16 space-y-6">
      {/* Animated Loader */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-600 dark:border-t-primary-400 border-r-accent-600 dark:border-r-accent-400 animate-spin"></div>
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Analyzing Your Resume
        </h2>
        <p className="text-slate-700 dark:text-slate-400">
          Please wait while we process your document...
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex gap-2">
        <div
          className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400 animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 rounded-full bg-primary-600 dark:bg-primary-400 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
