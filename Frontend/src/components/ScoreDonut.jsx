import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const monoFont = "'JetBrains Mono','IBM Plex Mono','SFMono-Regular',Menlo,Consolas,monospace";

const ScoreDonut = ({ title, score = 0 }) => {
  const safeScore = Math.min(Math.max(score || 0, 0), 100);

  const data = [
    { name: "Score", value: safeScore },
    { name: "Remaining", value: 100 - safeScore },
  ];

  const getColor = () => {
    if (safeScore >= 80) return "#5FD3A0";
    if (safeScore >= 60) return "#FF8A3D";
    return "#FF5D5D";
  };

  const getStatus = () => {
    if (safeScore >= 80) return "Excellent";
    if (safeScore >= 60) return "Good";
    return "Needs work";
  };

  // Tick marks around the dial, like an instrument gauge
  const ticks = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    const r1 = 92;
    const r2 = i % 6 === 0 ? 86 : 89;
    const cx = 100 + r1 * Math.cos(rad);
    const cy = 100 + r1 * Math.sin(rad);
    const cx2 = 100 + r2 * Math.cos(rad);
    const cy2 = 100 + r2 * Math.sin(rad);
    return { x1: cx, y1: cy, x2: cx2, y2: cy2, major: i % 6 === 0 };
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-[#E8E6E1]" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600 }}>
          {title}
        </h3>
        <span
          className="text-xs px-2 py-0.5 rounded-sm border"
          style={{ color: getColor(), borderColor: `${getColor()}40`, fontFamily: monoFont }}
        >
          {getStatus()}
        </span>
      </div>

      <div className="h-52 relative">
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="#262B30"
              strokeWidth={t.major ? 1.5 : 1}
            />
          ))}
        </svg>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={62}
              outerRadius={78}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              <Cell fill={getColor()} />
              <Cell fill="#1C2024" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-4xl text-[#E8E6E1]" style={{ fontFamily: monoFont }}>
            {safeScore}
          </p>
          <p className="text-xs text-[#7A828A] mt-1" style={{ fontFamily: monoFont }}>
            / 100
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreDonut;