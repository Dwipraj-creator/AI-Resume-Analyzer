const express = require("express");
const upload = require("../middleware/upload.middleware");
const {
  analyzeResume,
  getAllReports,
  deleteReport,
} = require("../controllers/resume.controller");

const router = express.Router();

router.post("/analyze", upload.single("resume"), analyzeResume);

router.get("/reports", getAllReports);
router.delete("/reports/:id",deleteReport)

module.exports = router;