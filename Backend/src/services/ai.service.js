const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
const {zodToJsonSchema} = require("zod-to-json-schema");
const {z} = require("zod");


const genAI = new GoogleGenAI(process.env.GOOGLE_API_KEY);

const interviewReportSchema = z.object({
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question to the interviewee"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer the question, what points to cover, what approach to take, what keywords to use"),
    })).describe("5-7 technical questions relevant to the role and candidate's experience"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question to the interviewee"),
        intention: z.string().describe("The intention behind asking this question"),
        answer: z.string().describe("STAR method based guidance for answering"),
    })).describe("5-7 behavioral questions relevant to the role"),
    skillGap: z.array(z.object({
        skill: z.string().describe("The specific skill or experience missing or weak"),
        severity: z.string().describe("The severity level of the gap: low, medium, or high"),
        type: z.string().describe("The category of the gap (e.g., Technical, Leadership, Experience)"),
    })).describe("Identification of gaps between the resume and job requirements"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number (1-7)"),
        focus: z.string().describe("Title of what to focus on that day"),
        task: z.array(z.string().describe("Specific tasks/topics to cover")),
    })).describe("A structured 7-day plan to prepare for the interview"),
    matchScore: z.number().describe("Overall match percentage (0-100)"),
})  

async function generateInterviewReport({ resumeText, jobDescription, selfDescription }) {
    // Ensure resumeText is a string even if an object is passed
    const processedResumeText = typeof resumeText === 'object' ? JSON.stringify(resumeText, null, 2) : resumeText;

    const prompt = `
    You are an expert career coach and technical interviewer.
    Your task is to analyze the provided resume and generate a comprehensive interview preparation report.

    **Resume Text:**
    ${processedResumeText}

    **Job Description:**
    ${jobDescription}

    **Self Description:**
    ${selfDescription}

    Please generate the following in a structured JSON format:
    1. **technicalQuestions**: 5-7 relevant technical questions with intention and answer guidance.
    2. **behavioralQuestions**: 5-7 relevant behavioral questions with intention and answer guidance.
    3. **skillGap**: Identify gaps between the resume and job description (with skill, severity [low/medium/high], and type).
    4. **preparationPlan**: A 7-day study plan (with day, focus, and tasks).
    5. **matchScore**: A score from 0-100 representing the match between the candidate and the role.
    `;

    const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: interviewReportSchema,
        },
    });

    try {
        let text = "";
        if (result.response && typeof result.response.text === "function") {
            text = result.response.text();
        } else if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
            text = result.candidates[0].content.parts[0].text;
        } else {
            text = JSON.stringify(result);
        }

        // Sanitize the text: Remove markdown code blocks if present
        const jsonMatch = text.match(/```json\s?([\s\S]*?)\s?```/) || text.match(/```\s?([\s\S]*?)\s?```/);
        const sanitizedText = jsonMatch ? jsonMatch[1].trim() : text.trim();

        const reportData = JSON.parse(sanitizedText);
        console.log("AI Report Generated Successfully");
        return reportData;
    } catch (error) {
        console.error("Error parsing AI response:", error);
        throw new Error("Failed to generate interview report due to parsing error");
    }
}

module.exports = { generateInterviewReport };