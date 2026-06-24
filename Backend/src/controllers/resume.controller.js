const axios = require("axios");
const path = require("path");
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

    const filePath = req.file.path.startsWith("/")
      ? req.file.path
      : path.join(process.cwd(), req.file.path);

    const resumeText = await extractPdfText(filePath);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        message: "Could not extract enough text from the PDF",
      });
    }

    let analysis;

if (process.env.AI_PROVIDER === "gemini") {
  try {
    analysis = await analyzeWithGemini(resumeText);
  } catch (error) {
    console.log("Gemini failed:", error.message);
    console.log("Falling back to n8n...");

    if (!process.env.N8N_WEBHOOK_URL) {
      throw new Error("N8N_WEBHOOK_URL is missing. Gemini failed and n8n fallback is not configured.");
    }

    analysis = await getAnalysisFromN8n(
      req.file.originalname,
      resumeText
    );
  }
} else {
  analysis = await getAnalysisFromN8n(
    req.file.originalname,
    resumeText
  );
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
  console.log("Analyze resume full error:", error);

  res.status(500).json({
    message: "Something went wrong while analyzing resume",
    error:
      error.response?.data ||
      error.message ||
      JSON.stringify(error),
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
  console.log("Analyze resume full error:", error);

  res.status(500).json({
    message: "Something went wrong while analyzing resume",
    error:
      error.response?.data ||
      error.message ||
      JSON.stringify(error),
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
  console.log("Analyze resume full error:", error);

  res.status(500).json({
    message: "Something went wrong while analyzing resume",
    error:
      error.response?.data ||
      error.message ||
      JSON.stringify(error),
  });
}
};

module.exports = {
  analyzeResume,
  getAllReports,
  deleteReport,
};