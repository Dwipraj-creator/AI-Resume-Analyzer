const fs = require("fs");
const pdfParse = require("pdf-parse");

console.log(pdfParse)

const extractPdfText = async (filePath) => {
  const pdfBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(pdfBuffer);

  return pdfData.text;
};

module.exports = extractPdfText;