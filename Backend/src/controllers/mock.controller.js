const MockInterview = require("../models/MockInterview.model");
const InterviewReport = require("../models/interview.model");
const { evaluateMockAnswer, generateOverallSummary, chatWithAI } = require("../services/mock.service");

const startSession = async (req, res) => {
    try {
        const { reportId } = req.body;
        const report = await InterviewReport.findById(reportId);

        if (!report) {
            return res.status(404).json({ error: "Original report not found" });
        }

        const session = await MockInterview.create({
            user: req.user._id,
            report: reportId,
            status: "in-progress",
            interactions: []
        });

        res.status(201).json({ 
            message: "Mock interview session started", 
            sessionId: session._id,
            questions: {
                technical: report.technicalQuestions,
                behavioral: report.behavioralQuestions
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const submitAnswer = async (req, res) => {
    try {
        const { sessionId, question, answer, role } = req.body;
        const session = await MockInterview.findById(sessionId).populate("report");

        if (!session || session.status === "completed") {
            return res.status(404).json({ error: "Active session not found" });
        }

        const evaluation = await evaluateMockAnswer({
            question,
            answer,
            jobDescription: session.report.jobDescription,
            context: role
        });

        session.interactions.push({
            question,
            userAnswer: answer,
            feedback: evaluation?.feedback || "Evaluation temporarily unavailable.",
            score: typeof evaluation?.score === "number" ? evaluation.score : 5,
            suggestions: Array.isArray(evaluation?.suggestions) ? evaluation.suggestions : ["Practice this topic further."],
            role
        });

        await session.save();

        res.status(200).json({ 
            message: "Answer evaluated", 
            evaluation: {
                ...evaluation,
                suggestions: Array.isArray(evaluation?.suggestions) ? evaluation.suggestions : ["Practice this topic further."]
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const followUpChat = async (req, res) => {
    try {
        const { sessionId, message, history } = req.body;
        const session = await MockInterview.findById(sessionId).populate("report");

        if (!session) return res.status(404).json({ error: "Session not found" });

        const reply = await chatWithAI({
            message,
            history,
            jobDescription: session.report.jobDescription
        });

        res.status(200).json({ reply });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const completeSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await MockInterview.findById(sessionId);

        if (!session) return res.status(404).json({ error: "Session not found" });

        const summary = await generateOverallSummary(session.interactions);
        
        const totalScore = session.interactions.reduce((acc, curr) => acc + curr.score, 0);
        const avgScore = (totalScore / (session.interactions.length * 10)) * 100;

        session.status = "completed";
        session.overallPerformance = summary;
        session.finalScore = Math.round(avgScore);
        await session.save();

        res.status(200).json({ 
            message: "Session completed", 
            summary,
            finalScore: session.finalScore
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSessionHistory = async (req, res) => {
    try {
        const history = await MockInterview.find({ user: req.user._id })
            .populate("report", "jobDescription")
            .sort({ createdAt: -1 });
        res.status(200).json({ history });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { startSession, submitAnswer, followUpChat, completeSession, getSessionHistory };
