# AI-Resume-Analyzer


AI Resume Analyzer is a full-stack MERN application that analyzes PDF resumes using AI and generates ATS-style insights, resume scores, missing skills, improvement suggestions, and recommended keywords.

The project includes authentication, PDF upload, AI-powered analysis, report history, user-specific dashboards, charts, and delete functionality.

---

## Live Demo

Frontend: https://ai-resume-analyzer-zeta-one.vercel.app
Backend API: https://ai-resume-analyzer-npxu.onrender.com

---

## Project Overview

This application allows users to upload a PDF resume and receive an AI-generated resume analysis report. The system extracts text from the uploaded resume, sends it to an AI analysis service, saves the result in MongoDB, and displays the report in a clean dashboard.

The project supports two AI analysis modes:

1. **n8n Workflow Mode**
   Express backend sends resume text to an n8n webhook, where AI analysis is handled.

2. **Direct Gemini Mode**
   Express backend directly calls the Gemini API without depending on n8n.

This makes the project suitable for both automation-based workflows and production deployment.

---

## Features

### Authentication

* User registration
* User login
* JWT-based authentication
* Protected routes
* User-specific reports
* Logout functionality

### Resume Upload

* PDF resume upload
* File validation
* Drag and drop upload
* Multer-based backend file handling
* PDF text extraction

### AI Resume Analysis

* Overall resume score
* ATS compatibility score
* Skills score
* Project score
* Experience score
* Education score
* Formatting score
* Strengths
* Weaknesses
* Missing skills
* Improvement suggestions
* Suggested professional summary
* Recommended ATS keywords

### Dashboard

* Modern responsive UI
* Score donut charts
* Detailed score breakdown
* Resume history
* Delete report functionality
* Dark mode support
* Loading and error states

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* React Icons
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* JWT
* bcryptjs
* pdf-parse
* Axios

### AI / Automation

* Gemini API
* n8n workflow support

---

## Folder Structure

```bash
AI-Resume-Analyzer
│
├── Backend
│   ├── src
│   │   ├── config
│   │   │   └── db.js
│   │   │
│   │   ├── controllers
│   │   │   ├── auth.controller.js
│   │   │   └── resume.controller.js
│   │   │
│   │   ├── middleware
│   │   │   ├── auth.middleware.js
│   │   │   └── upload.middleware.js
│   │   │
│   │   ├── models
│   │   │   ├── User.js
│   │   │   └── ResumeAnalysis.js
│   │   │
│   │   ├── routes
│   │   │   ├── auth.routes.js
│   │   │   └── resume.routes.js
│   │   │
│   │   ├── utils
│   │   │   ├── extractPdfText.js
│   │   │   ├── generateToken.js
│   │   │   └── analyzeWithGemini.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── uploads
│   ├── package.json
│   └── .env
│
├── Frontend
│   ├── src
│   │   ├── api
│   │   │   ├── authApi.js
│   │   │   └── resumeApi.js
│   │   │
│   │   ├── components
│   │   │   ├── AnalysisDashboard.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ReportsHistory.jsx
│   │   │   ├── ResumeUpload.jsx
│   │   │   └── ScoreDonut.jsx
│   │   │
│   │   ├── context
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## Backend Setup

### 1. Navigate to backend folder

```bash
cd Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000

MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/ai-resume-analyzer?retryWrites=true&w=majority

JWT_SECRET=your_jwt_secret

AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key

N8N_WEBHOOK_URL=http://localhost:5678/webhook/resume-analyzer
```

### 4. Start backend server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## Frontend Setup

### 1. Navigate to frontend folder

```bash
cd Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## API Routes

### Auth Routes

#### Register User

```http
POST /api/auth/register
```

Request body:

```json
{
  "name": "Dwipraj Dey",
  "email": "dwipraj@example.com",
  "password": "123456"
}
```

#### Login User

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "dwipraj@example.com",
  "password": "123456"
}
```

---

### Resume Routes

All resume routes are protected and require JWT token.

Header:

```http
Authorization: Bearer YOUR_TOKEN
```

#### Analyze Resume

```http
POST /api/resume/analyze
```

Body type:

```bash
form-data
```

Field:

```bash
resume: resume.pdf
```

#### Get Reports

```http
GET /api/resume/reports
```

#### Delete Report

```http
DELETE /api/resume/reports/:id
```

---

## AI Provider Modes

### Direct Gemini Mode

Use this for deployment:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key
```

Flow:

```bash
React → Express → Gemini API → MongoDB
```

### n8n Workflow Mode

Use this for local automation workflow:

```env
AI_PROVIDER=n8n
N8N_WEBHOOK_URL=http://localhost:5678/webhook/resume-analyzer
```

Flow:

```bash
React → Express → n8n → AI → MongoDB
```

---

## n8n Workflow Design

The n8n workflow contains:

1. Webhook Trigger
2. Set/Edit Fields Node
3. Gemini/OpenAI AI Node
4. Code Node to clean AI response
5. Respond to Webhook Node

### Expected Webhook Input

```json
{
  "fileName": "resume.pdf",
  "resumeText": "Extracted resume text here"
}
```

### Expected AI Output

```json
{
  "overallScore": 85,
  "atsScore": 88,
  "skillsScore": 90,
  "projectScore": 84,
  "experienceScore": 75,
  "educationScore": 80,
  "formattingScore": 86,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "improvementSuggestions": [],
  "suggestedSummary": "",
  "recommendedKeywords": []
}
```

---

## Environment Variables

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key
N8N_WEBHOOK_URL=your_n8n_webhook_url
```

---

## Key Learning Outcomes

This project demonstrates:

* Full-stack MERN architecture
* JWT authentication
* Protected routes
* PDF upload and parsing
* AI API integration
* n8n automation workflow
* MongoDB data modeling
* User-specific data access
* REST API design
* Dashboard UI development
* Data visualization with Recharts
* Error handling and validation
* Deployment-ready architecture

---

## Portfolio Description

Built an AI-powered Resume Analyzer using React, Node.js, Express, MongoDB, Gemini API, and n8n. The application allows users to upload PDF resumes, extracts resume text, analyzes it using AI, generates ATS-style scores and improvement suggestions, and stores user-specific reports in MongoDB. Implemented JWT authentication, protected routes, report history, delete functionality, dark mode, and interactive score dashboards.

---

## Future Improvements

* Download analysis report as PDF
* Resume comparison feature
* Job description matching
* Role-specific resume scoring
* Admin dashboard
* Email report delivery
* Deployment with Vercel, Render, and MongoDB Atlas

---

## Author

**Dwipraj Dey**

* Full Stack Developer
* MERN Stack Developer
* Portfolio: Add your portfolio link
* GitHub: Add your GitHub link
* LinkedIn: Add your LinkedIn link

---

## License

This project is open-source and available for learning and portfolio purposes.
