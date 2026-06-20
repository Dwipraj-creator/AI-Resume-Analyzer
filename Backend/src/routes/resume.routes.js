const express = require("express");
const upload = require("../middleware/upload.middleware");
const {
  analyzeResume,
  getAllReports,
  deleteReport,
} = require("../controllers/resume.controller");
const protect = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/analyze", protect,upload.single("resume"), analyzeResume);

router.get("/reports", protect,getAllReports);
router.delete("/reports/:id",protect,deleteReport)

module.exports = router;