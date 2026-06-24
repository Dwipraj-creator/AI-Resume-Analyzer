const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

const analyzeWithGemini = async (resumeText) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
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

  let result;

  for (let i = 0; i < 3; i++) {
    try {
      result = await model.generateContent(prompt);
      break;
    } catch (error) {
      console.log(
        `Gemini attempt ${i + 1} failed:`,
        error.message
      );

      if (
        error.message.includes("503") &&
        i < 2
      ) {
        console.log(
          "Gemini busy. Retrying in 5 seconds..."
        );

        await sleep(5000);
        continue;
      }

      throw error;
    }
  }

  const text = result.response.text();

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedText);
};

module.exports = analyzeWithGemini;