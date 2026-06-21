import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const ScoreChart = ({ analysis }) => {
  if (!analysis) return null;

  const data = [
    {
      name: "Overall",
      score: analysis.overallScore,
    },
    {
      name: "ATS",
      score: analysis.atsScore,
    },
  ];

  const getColor = (score) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Score Overview
        </h2>

        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Compare your overall resume quality with ATS compatibility.
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis
              dataKey="name"
              tick={{
                fill: "#64748b",
                fontSize: 14,
                fontWeight: 600,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tick={{
                fill: "#64748b",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.1)" }}
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            />

            <Bar
              dataKey="score"
              radius={[12, 12, 0, 0]}
              maxBarSize={80}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={getColor(entry.score)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Overall Score
          </p>

          <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            {analysis.overallScore}%
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            ATS Score
          </p>

          <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">
            {analysis.atsScore}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreChart;