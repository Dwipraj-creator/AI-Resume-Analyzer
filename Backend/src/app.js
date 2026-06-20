const express = require("express");
const cors = require("cors");
const resumeRoutes = require("./routes/resume.routes");
const authRoutes =
  require("./routes/auth.routes");



const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Resume Analyzer API is running");
});

app.use("/api/resume", resumeRoutes);
app.use("/api/auth",authRoutes)

module.exports = app;