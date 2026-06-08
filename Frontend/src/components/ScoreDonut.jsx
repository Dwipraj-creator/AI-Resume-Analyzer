import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const ScoreDonut = ({ title, score }) => {
  const data = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score },
  ];

  const scoreColor =
    score >= 80
      ? "#22c55e"
      : score >= 60
      ? "#eab308"
      : "#ef4444";

  return (
    <div className="card p-6 relative">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        {title}
      </h3>

      <div className="h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={75}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              <Cell fill={scoreColor} />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {score}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreDonut;