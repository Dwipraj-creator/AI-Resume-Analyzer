import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const ScoreDonut = ({ title, score = 0 }) => {
  const safeScore = Math.min(Math.max(score || 0, 0), 100);

  const data = [
    { name: "Score", value: safeScore },
    { name: "Remaining", value: 100 - safeScore },
  ];

  const getScoreColor = () => {
    if (safeScore >= 80) return "#22c55e";
    if (safeScore >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getStatus = () => {
    if (safeScore >= 80) return "Excellent";
    if (safeScore >= 60) return "Good";
    return "Needs Work";
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="text-center mb-6">
        <h3 className="text-xl font-black text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {getStatus()}
        </p>
      </div>

      <div className="h-56 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              <Cell fill={getScoreColor()} />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-5xl font-black text-slate-900 dark:text-white">
            {safeScore}
          </p>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            out of 100
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreDonut;