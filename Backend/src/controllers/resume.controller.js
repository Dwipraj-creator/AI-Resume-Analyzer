const axios = require("axios");
const path = require("path");
const ResumeAnalysis = require("../models/ResumeAnalysis");
const extractPdfText = require("../utils/extractPdfText");
const analyzeWithGemini = require("../utils/analyzeWithGemini");
const redis = require("../config/redisClient");

const REPORTS_CACHE_TTL = 300; // seconds — safety net in case invalidation is ever missed
const getReportsCacheKey = (userId) => `reports:${userId}`;

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

    // A new report exists now, so the cached list for this user is stale — clear it.
    // Non-blocking: if Redis is unreachable, the upload still succeeds.
    redis
      .del(getReportsCacheKey(req.user._id))
      .catch((error) => console.log("Redis invalidate failed:", error.message));

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
  const cacheKey = getReportsCacheKey(req.user._id);

  // 1. Try the cache first
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.status(200).json({
        message: "Reports fetched successfully",
        data: JSON.parse(cached),
      });
    }
  } catch (error) {
    console.log("Redis read failed, falling back to database:", error.message);
  }

  // 2. Cache miss (or Redis unavailable) — fall back to MongoDB
  try {
    const reports = await ResumeAnalysis.find({
      user: req.user._id,
    })
      .select("-resumeText")
      .sort({
        createdAt: -1,
      })
      .lean();

    // 3. Populate the cache for next time — non-blocking, never fails the request
    redis
      .set(cacheKey, JSON.stringify(reports), "EX", REPORTS_CACHE_TTL)
      .catch((error) => console.log("Redis write failed:", error.message));

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

    // A report is gone, so the cached list for this user is stale — clear it.
    redis
      .del(getReportsCacheKey(req.user._id))
      .catch((error) => console.log("Redis invalidate failed:", error.message));

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