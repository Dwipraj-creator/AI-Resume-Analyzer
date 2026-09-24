import jsPDF from "jspdf";

// Print-friendly palette — separate from the app's dark UI colors,
// since this document is meant to be read/printed on paper.
const COLORS = {
  text: [26, 29, 33],
  muted: [110, 118, 125],
  accent: [199, 108, 33],
  good: [40, 130, 86],
  warn: [199, 108, 33],
  bad: [190, 58, 58],
  line: [225, 227, 230],
};

const MARGIN = 18;
const PAGE_WIDTH = 210; // A4, mm
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const tierColor = (score) => {
  if (score >= 80) return COLORS.good;
  if (score >= 60) return COLORS.warn;
  return COLORS.bad;
};

const tierLabel = (score) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  return "Needs work";
};

// Starts a new page if the next block won't fit, and returns the y to draw at.
function ensureSpace(doc, y, needed) {
  if (y + needed > PAGE_HEIGHT - MARGIN) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

function sectionTitle(doc, title, y) {
  y = ensureSpace(doc, y, 14);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...COLORS.text);
  doc.text(title, MARGIN, y);
  doc.setDrawColor(...COLORS.line);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y + 2, PAGE_WIDTH - MARGIN, y + 2);
  return y + 9;
}

function bulletList(doc, items, y, dotColor = COLORS.accent) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  items.forEach((item) => {
    const lines = doc.splitTextToSize(item, CONTENT_WIDTH - 6);
    y = ensureSpace(doc, y, lines.length * 5 + 3);
    doc.setFillColor(...dotColor);
    doc.circle(MARGIN + 1, y - 1.3, 0.8, "F");
    doc.setTextColor(...COLORS.text);
    doc.text(lines, MARGIN + 5, y);
    y += lines.length * 5 + 3;
  });
  return y;
}

export function generateResumeReportPdf(analysis, fileName = "resume-analysis-report.pdf") {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  // --- Header ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...COLORS.text);
  doc.text("Resume Analysis Report", MARGIN, y);
  y += 7;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.muted);
  doc.text(
    `Generated ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
    MARGIN,
    y
  );
  y += 10;

  doc.setDrawColor(...COLORS.accent);
  doc.setLineWidth(0.8);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 10;

  // --- Score summary boxes ---
  const boxWidth = (CONTENT_WIDTH - 6) / 2;
  [
    ["Overall score", analysis.overallScore],
    ["ATS score", analysis.atsScore],
  ].forEach(([label, score], i) => {
    const x = MARGIN + i * (boxWidth + 6);
    doc.setDrawColor(...COLORS.line);
    doc.setLineWidth(0.3);
    doc.rect(x, y, boxWidth, 22);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(...tierColor(score || 0));
    doc.text(`${score || 0}%`, x + 5, y + 13);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.muted);
    doc.text(label, x + 5, y + 19);

    doc.setFontSize(9);
    doc.setTextColor(...tierColor(score || 0));
    doc.text(tierLabel(score || 0), x + boxWidth - 5, y + 13, { align: "right" });
  });
  y += 32;

  // --- Detailed breakdown ---
  const breakdown = [
    ["Skills", analysis.skillsScore],
    ["Project", analysis.projectScore],
    ["Experience", analysis.experienceScore],
    ["Education", analysis.educationScore],
    ["Formatting", analysis.formattingScore],
  ];
  y = sectionTitle(doc, "Detailed Score Breakdown", y);
  breakdown.forEach(([label, score]) => {
    y = ensureSpace(doc, y, 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...COLORS.text);
    doc.text(label, MARGIN, y);
    doc.text(`${score || 0}%`, PAGE_WIDTH - MARGIN, y, { align: "right" });

    const barY = y + 1.5;
    doc.setFillColor(...COLORS.line);
    doc.rect(MARGIN, barY, CONTENT_WIDTH, 1.6, "F");
    doc.setFillColor(...COLORS.accent);
    doc.rect(MARGIN, barY, (CONTENT_WIDTH * (score || 0)) / 100, 1.6, "F");

    y += 8;
  });
  y += 4;

  // --- Strengths ---
  if (analysis.strengths?.length) {
    y = sectionTitle(doc, "Strengths", y);
    y = bulletList(doc, analysis.strengths, y, COLORS.good);
    y += 4;
  }

  // --- Weaknesses ---
  if (analysis.weaknesses?.length) {
    y = sectionTitle(doc, "Areas for Improvement", y);
    y = bulletList(doc, analysis.weaknesses, y, COLORS.bad);
    y += 4;
  }

  // --- Missing skills ---
  if (analysis.missingSkills?.length) {
    y = sectionTitle(doc, "Missing Skills", y);
    y = bulletList(doc, analysis.missingSkills, y, COLORS.bad);
    y += 4;
  }

  // --- Improvement suggestions ---
  if (analysis.improvementSuggestions?.length) {
    y = sectionTitle(doc, "Improvement Suggestions", y);
    y = bulletList(doc, analysis.improvementSuggestions, y, COLORS.accent);
    y += 4;
  }

  // --- Suggested summary ---
  if (analysis.suggestedSummary) {
    y = sectionTitle(doc, "Suggested Professional Summary", y);
    const lines = doc.splitTextToSize(analysis.suggestedSummary, CONTENT_WIDTH);
    y = ensureSpace(doc, y, lines.length * 5 + 4);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.text);
    doc.text(lines, MARGIN, y);
    y += lines.length * 5 + 8;
  }

  // --- Recommended keywords (wrapping pill layout) ---
  if (analysis.recommendedKeywords?.length) {
    y = sectionTitle(doc, "Recommended Keywords", y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    let x = MARGIN;
    analysis.recommendedKeywords.forEach((keyword) => {
      const textWidth = doc.getTextWidth(keyword) + 6;
      if (x + textWidth > PAGE_WIDTH - MARGIN) {
        x = MARGIN;
        y += 8;
        y = ensureSpace(doc, y, 8);
      }
      doc.setDrawColor(...COLORS.accent);
      doc.setTextColor(...COLORS.accent);
      doc.roundedRect(x, y - 4.5, textWidth, 6, 1, 1);
      doc.text(keyword, x + 3, y);
      x += textWidth + 3;
    });
    y += 10;
  }

  // --- Footer on every page ---
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.muted);
    doc.text("Generated by ResumePro", MARGIN, PAGE_HEIGHT - 10);
    doc.text(`Page ${i} of ${pageCount}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 10, {
      align: "right",
    });
  }

  doc.save(fileName);
}