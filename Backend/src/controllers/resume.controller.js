const axios = require("axios");
const ResumeAnalysis = require("../models/ResumeAnalysis");
const extractPdfText = require("../utils/extractPdfText");
const analyzeWithGemini = require("../utils/analyzeWithGemini");

const getAnalysisFromN8n = async (fileName, resumeText) => {
  const n8nResponse = await axios.post(process.env.N8N_WEBHOOK_URL, {
    fileName,
    resumeText,
  });

  const firstItem = Array.isArray(n8nResponse.data)
    ? n8nResponse.data[0]
    : n8nResponse.data;

  return firstItem.json ? firstItem.json : firstItem;
};

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

    let analysis;

    if (process.env.AI_PROVIDER === "gemini") {
      analysis = await analyzeWithGemini(resumeText);
    } else {
      analysis = await getAnalysisFromN8n(req.file.originalname, resumeText);
    }

    if (!analysis || analysis.overallScore === undefined) {
      return res.status(500).json({
        message: "Invalid response from AI analysis service",
      });
    }

    const savedAnalysis = await ResumeAnalysis.create({
      user: req.user._id,
      fileName: req.file.originalname,
      resumeText,

      overallScore: analysis.overallScore || 0,
      atsScore: analysis.atsScore || 0,
      skillsScore: analysis.skillsScore || 0,
      projectScore: analysis.projectScore || 0,
      experienceScore: analysis.experienceScore || 0,
      educationScore: analysis.educationScore || 0,
      formattingScore: analysis.formattingScore || 0,

      strengths: analysis.strengths || [],
      weaknesses: analysis.weaknesses || [],
      missingSkills: analysis.missingSkills || [],
      improvementSuggestions: analysis.improvementSuggestions || [],
      suggestedSummary: analysis.suggestedSummary || "",
      recommendedKeywords: analysis.recommendedKeywords || [],
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
    const reports = await ResumeAnalysis.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

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

    const report = await ResumeAnalysis.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

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