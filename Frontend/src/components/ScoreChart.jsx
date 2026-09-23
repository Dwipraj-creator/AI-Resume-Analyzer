import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

const headFont = "'Space Grotesk','Inter Tight','Helvetica Neue',Arial,sans-serif";
const monoFont = "'JetBrains Mono','IBM Plex Mono','SFMono-Regular',Menlo,Consolas,monospace";

const ScoreChart = ({ analysis }) => {
  if (!analysis) return null;

  const data = [
    { name: "Overall", score: analysis.overallScore },
    { name: "ATS", score: analysis.atsScore },
  ];

  const getColor = (score) => {
    if (score >= 80) return "#5FD3A0";
    if (score >= 60) return "#FF8A3D";
    return "#FF5D5D";
  };

  return (
    <div className="rounded-md bg-[#14171A] border border-[#262B30] p-7">
      <div className="mb-6">
        <h2 className="text-lg text-[#E8E6E1]" style={{ fontFamily: headFont, fontWeight: 600 }}>
          Score overview
        </h2>
        <p className="text-[#7A828A] text-sm mt-1">
          Overall resume quality compared with ATS compatibility.
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#1C2024" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#7A828A", fontSize: 12, fontFamily: monoFont }}
              axisLine={{ stroke: "#262B30" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#7A828A", fontSize: 11, fontFamily: monoFont }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,138,61,0.06)" }}
              contentStyle={{
                borderRadius: "4px",
                border: "1px solid #262B30",
                backgroundColor: "#1C2024",
                color: "#E8E6E1",
                fontFamily: monoFont,
                fontSize: 13,
              }}
              labelStyle={{ color: "#7A828A" }}
            />
            <Bar dataKey="score" radius={[2, 2, 0, 0]} maxBarSize={64}>
              {data.map((entry, index) => (
                <Cell key={index} fill={getColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="rounded-sm bg-[#1C2024] border border-[#262B30] p-4 text-center">
          <p className="text-xs text-[#7A828A]">Overall score</p>
          <p className="text-2xl text-[#E8E6E1] mt-1" style={{ fontFamily: monoFont }}>
            {analysis.overallScore}%
          </p>
        </div>
        <div className="rounded-sm bg-[#1C2024] border border-[#262B30] p-4 text-center">
          <p className="text-xs text-[#7A828A]">ATS score</p>
          <p className="text-2xl text-[#E8E6E1] mt-1" style={{ fontFamily: monoFont }}>
            {analysis.atsScore}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScoreChart;