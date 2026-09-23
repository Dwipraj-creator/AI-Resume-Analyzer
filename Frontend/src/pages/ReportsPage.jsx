import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ReportsHistory from "../components/ReportsHistory";

const ReportsPage = () => {
  const navigate = useNavigate();

  // Selecting a report takes you to the scan page to view its full breakdown
  const handleSelect = (report) => {
    navigate("/", { state: { analysis: report } });
  };

  return (
    <div className="min-h-screen bg-[#0A0C0E]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ReportsHistory setAnalysis={handleSelect} />
      </main>

      <footer className="border-t border-[#262B30]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#7A828A]">
            © 2026 ResumePro. Built with React, Node.js, MongoDB, n8n and Gemini AI.
          </p>
          <p className="text-sm text-[#7A828A]">
            Portfolio project by <span className="text-[#C7C1B4]">Dwipraj Dey</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ReportsPage;