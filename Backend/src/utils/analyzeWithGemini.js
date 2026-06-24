const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeWithGemini = async (resumeText) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  const prompt = `
You are an expert ATS resume analyzer and technical recruiter.

Analyze this resume for a junior full-stack developer role.

Resume:
${resumeText}

Return ONLY valid JSON. No markdown.

{
  "overallScore": 0,
  "atsScore": 0,
  "skillsScore": 0,
  "projectScore": 0,
  "experienceScore": 0,
  "educationScore": 0,
  "formattingScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "improvementSuggestions": [],
  "suggestedSummary": "",
  "recommendedKeywords": []
}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedText);
};

module.exports = analyzeWithGemini;