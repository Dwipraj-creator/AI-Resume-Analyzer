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

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Score Overview
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />

            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.score >= 80
                      ? "#22c55e"
                      : entry.score >= 60
                      ? "#eab308"
                      : "#ef4444"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreChart;