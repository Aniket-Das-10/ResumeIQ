# 🚀 ResumeIQ - AI-Powered Career Accelerator

ResumeIQ is a premium, AI-driven platform designed to help job seekers optimize their resumes and master their interviews. Using state-of-the-art **Google Gemini 2.5 Flash** models, it provides real-time feedback and actionable career advice.

## ✨ Key Features

### 🎙️ Interactive AI Mock Interview
- **Real-Time Conversational AI**: Engage in a natural, multi-turn interview session tailored to your resume and the job description.
- **Live Feedback & Scoring**: Get instant evaluation on every answer, including a score (1-10) and specific improvement tips.
- **Dynamic Context**: The AI remembers your previous answers and can respond to follow-up questions or requests for clarification.

### 📈 AI Resume Optimizer
- **Match Score Analysis**: Instantly see how well your resume matches a job description.
- **Power Bullet Points**: AI-generated experience descriptions designed to beat the ATS (Applicant Tracking Systems).
- **Keyword Suggester**: Identifies critical technical and behavioral keywords missing from your profile.
- **Potential Score Tracking**: Visualize how your match score will improve after implementing our suggestions.

### 📅 Smart Preparation Plan
- **7-Day Study Guide**: A personalized roadmap to prepare for your specific interview, day by day.
- **Skill Gap Identification**: Clearly see which technical or leadership areas need more focus.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion (for animations).
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose).
- **AI**: Google Gemini 1.5 Flash (via `@google/genai`).
- **Validation**: Zod (Structured JSON output).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aniket-Das-10/ResumeIQ.git
   cd ResumeIQ
   ```

2. **Setup Backend**
   ```bash
   cd Backend
   npm install
   # Create a .env file with:
   # PORT=5000
   # MONGO_URI=your_mongodb_uri
   # JWT_SECRET=your_secret
   # GOOGLE_API_KEY=your_gemini_key
   ```

3. **Setup Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Run the Project**
   Go back to the root directory:
   ```bash
   npm run dev
   ```

## 🎨 Design Philosophy
ResumeIQ uses a **Premium Dark UI** with glassmorphism and smooth animations. The interface is designed to feel alive, responsive, and high-value, ensuring a professional experience for all users.

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
