const mongoose = require("mongoose");

const resumeAnalysisSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },

    resumeText: {
      type: String,
      required: true,
    },

    overallScore: {
      type: Number,
      required: true,
    },

    atsScore: {
      type: Number,
      required: true,
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    improvementSuggestions: {
      type: [String],
      default: [],
    },

    suggestedSummary: {
      type: String,
      default: "",
    },

    recommendedKeywords: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);