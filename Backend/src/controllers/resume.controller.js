const axios = require("axios");
const ResumeAnalysis = require("../models/ResumeAnalysis");
const extractPdfText = require("../utils/extractPdfText");

const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume",
      });
    }

    const resumeText = await extractPdfText(req.file.path);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        message: "Could not extract enough text from the PDF",
      });
    }
    console.log("N8N URL:", process.env.N8N_WEBHOOK_URL);

    const n8nResponse = await axios.post(process.env.N8N_WEBHOOK_URL, {
      fileName: req.file.originalname,
      resumeText,
    });

    console.log("N8N RESPONSE:", JSON.stringify(n8nResponse.data, null, 2));

    const analysis = Array.isArray(n8nResponse.data)
      ? n8nResponse.data[0]
      : n8nResponse.data;
    if (!analysis || !analysis.overallScore) {
      return res.status(500).json({
        message: "Invalid response from n8n workflow",
      });
    }

    const savedAnalysis = await ResumeAnalysis.create({
      fileName: req.file.originalname,
      resumeText,
      overallScore: analysis.overallScore,
      atsScore: analysis.atsScore,
      strengths: analysis.strengths,
      weaknesses: analysis.weaknesses,
      missingSkills: analysis.missingSkills,
      improvementSuggestions: analysis.improvementSuggestions,
      suggestedSummary: analysis.suggestedSummary,
      recommendedKeywords: analysis.recommendedKeywords,
      skillsScore: analysis.skillsScore,
      projectScore: analysis.projectScore,
      experienceScore: analysis.experienceScore,
      educationScore: analysis.educationScore,
      formattingScore: analysis.formattingScore,
    });

    res.status(201).json({
      message: "Resume analyzed successfully",
      data: savedAnalysis,
    });
  } catch (error) {
    console.log("Analyze resume error:", error.message);

    res.status(500).json({
      message: "Something went wrong while analyzing resume",
      error: error.message,
    });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await ResumeAnalysis.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Reports fetched successfully",
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch reports",
      error: error.message,
    });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await ResumeAnalysis.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.status(200).json({
      message: "Report deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete report",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
  getAllReports,
  deleteReport,
};
