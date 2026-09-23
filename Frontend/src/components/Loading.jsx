import { FiFileText, FiCpu, FiBarChart2, FiCheckCircle } from "react-icons/fi";

const headFont = "'Space Grotesk','Inter Tight','Helvetica Neue',Arial,sans-serif";
const monoFont = "'JetBrains Mono','IBM Plex Mono','SFMono-Regular',Menlo,Consolas,monospace";

const steps = [
  { icon: FiFileText, label: "Extracting resume content" },
  { icon: FiCpu, label: "Analyzing skills & experience" },
  { icon: FiBarChart2, label: "Calculating ATS score" },
  { icon: FiCheckCircle, label: "Preparing final report" },
];

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-full max-w-md bg-[#14171A] border border-[#262B30] rounded-md p-8">
        <div className="flex justify-center mb-7">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-[3px] border-[#262B30]" />
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#FF8A3D] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <FiCpu className="text-[#FF8A3D] text-2xl" />
            </div>
          </div>
        </div>

        <div className="text-center mb-8 space-y-1.5">
          <h2 className="text-xl text-[#E8E6E1]" style={{ fontFamily: headFont, fontWeight: 600 }}>
            Analyzing your resume
          </h2>
          <p className="text-[#7A828A] text-sm" style={{ fontFamily: monoFont }}>
            est. 5–15s
          </p>
        </div>

        <div className="space-y-2">
          {steps.map(({ icon: Icon, label }, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-sm bg-[#1C2024] border border-[#262B30]"
            >
              <span
                className="text-xs text-[#4A5158] w-5 shrink-0"
                style={{ fontFamily: monoFont }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <Icon className="text-[#FF8A3D] shrink-0" size={15} />
              <span className="text-sm text-[#E8E6E1]">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-7 w-full h-[3px] bg-[#262B30] overflow-hidden">
          <div className="h-full w-2/3 bg-[#FF8A3D] animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Loading;