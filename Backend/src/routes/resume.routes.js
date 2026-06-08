const express = require("express");
const upload = require("../middleware/upload.middleware");
const {
  analyzeResume,
  getAllReports,
} = require("../controllers/resume.controller");

const router = express.Router();

router.post("/analyze", upload.single("resume"), analyzeResume);

router.get("/reports", getAllReports);

module.exports = router;