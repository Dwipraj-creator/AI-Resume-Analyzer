const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-8">

        {/* Animated Circle */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>

            <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl">🤖</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
            AI Resume Analysis
          </h2>

          <p className="text-slate-600 dark:text-slate-400">
            Generating ATS insights and recommendations...
          </p>
        </div>

        {/* Pipeline Steps */}
        <div className="space-y-4">

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
            <span className="text-xl">📄</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Extracting Resume Content
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
            <span className="text-xl">🤖</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              AI Analyzing Skills & Experience
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
            <span className="text-xl">📊</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Calculating ATS Score
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
            <span className="text-xl">✨</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">
              Preparing Final Report
            </span>
          </div>

        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3">
            This usually takes 5–15 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;