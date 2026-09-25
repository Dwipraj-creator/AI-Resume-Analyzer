const mongoose = require("mongoose");

const resumeAnalysisSchema = new mongoose.Schema(
  {
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
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
    skillsScore: {
  type: Number,
  default: 0,
},

projectScore: {
  type: Number,
  default: 0,
},

experienceScore: {
  type: Number,
  default: 0,
},

educationScore: {
  type: Number,
  default: 0,
},

formattingScore: {
  type: Number,
  default: 0,
},
  },
  { timestamps: true }
);

// Speeds up "find this user's reports, newest first" — exactly what getAllReports does.
// Without it, Mongo scans every document in the collection on every request.
resumeAnalysisSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);