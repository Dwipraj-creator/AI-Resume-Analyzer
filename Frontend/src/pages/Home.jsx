import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ResumeUpload from "../components/ResumeUpload";
import Navbar from "../components/Navbar";
import AnalysisDashboard from"../components/AnalysisDashboard"

const headFont = "'Space Grotesk','Inter Tight','Helvetica Neue',Arial,sans-serif";
const monoFont = "'JetBrains Mono','IBM Plex Mono','SFMono-Regular',Menlo,Consolas,monospace";

const Home = () => {
  const [analysis, setAnalysis] = useState(null);
  const location = useLocation();

  // Picks up a report selected from the /reports page
  useEffect(() => {
    if (location.state?.analysis) {
      setAnalysis(location.state.analysis);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-[#0A0C0E]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!analysis && (
          <section className="mb-10">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-sm bg-[#14171A] border border-[#262B30]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A3D]" />
              <span className="text-xs text-[#7A828A]" style={{ fontFamily: monoFont }}>
                ai · n8n automation · ats scoring
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl text-[#E8E6E1] mb-3 leading-tight max-w-2xl"
              style={{ fontFamily: headFont, fontWeight: 700 }}
            >
              Scan your resume for what's holding it back.
            </h2>

            <p className="text-[#7A828A] max-w-xl">
              Upload a PDF and get ATS-style scoring, missing skills, and AI-generated
              improvements — below.
            </p>
          </section>
        )}

        <section className="mb-16">
          <ResumeUpload setAnalysis={setAnalysis} />
        </section>

        {analysis && (
          <section>
            <AnalysisDashboard analysis={analysis} />
          </section>
        )}
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

export default Home;