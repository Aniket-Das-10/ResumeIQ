const { PDFParse } = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");
const interviewReportModel = require("../models/interview.model");
const generateInterview = async (req, res) => {
  try {
    const resumefile = req.file;
    const parser = new PDFParse({ data: resumefile.buffer });
    const resumeContent = await parser.getText();
    await parser.destroy();

    const { selfDescription, jobDescription } = req.body;
    const interviewReportbyAI = await generateInterviewReport({
      resumeText: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    // Data Sanitization
    const sanitizeReport = (data) => {
      const sanitized = { ...data };

      // Fix Preparation Plan
      if (Array.isArray(sanitized.preparationPlan)) {
        sanitized.preparationPlan = sanitized.preparationPlan.map((p) => ({
          ...p,
          day:
            typeof p.day === "string"
              ? parseInt(p.day.match(/\d+/)?.[0] || "0")
              : typeof p.day === "number"
                ? p.day
                : 0,
        }));
      } else {
        sanitized.preparationPlan = [];
      }

      // Fix Skill Gap
      if (Array.isArray(sanitized.skillGap)) {
        sanitized.skillGap = sanitized.skillGap.map((s) => ({
          ...s,
          severity: (s.severity || "medium").toLowerCase(),
        }));
      } else {
        sanitized.skillGap = [];
      }

      // Fix Questions
      const ensureAnswer = (q) => ({
        ...q,
        answer: q.answer || q.guidance || "No specific answer guidance provided.",
        intention: q.intention || "General assessment.",
        question: q.question || "N/A",
      });

      sanitized.technicalQuestions = Array.isArray(sanitized.technicalQuestions)
        ? sanitized.technicalQuestions.map(ensureAnswer)
        : [];

      sanitized.behavioralQuestions = Array.isArray(sanitized.behavioralQuestions)
        ? sanitized.behavioralQuestions.map(ensureAnswer)
        : [];

      // Fix Optimization Suggestions
      if (Array.isArray(sanitized.optimizationSuggestions)) {
        sanitized.optimizationSuggestions = sanitized.optimizationSuggestions.map((o) => ({
          ...o,
          type: (o.type || "keyword").toLowerCase(),
          suggestion: o.suggestion || "N/A",
          reason: o.reason || "Matches requirement.",
        }));
      } else {
        sanitized.optimizationSuggestions = [];
      }

      sanitized.potentialScore = typeof sanitized.potentialScore === "number" ? sanitized.potentialScore : 0;

      return sanitized;
    };

    const sanitizedReport = sanitizeReport(interviewReportbyAI);

    const interviewReport = await interviewReportModel.create({
      user: req.user._id,
      resumeText: resumeContent.text,
      selfDescription,
      jobDescription,
      ...sanitizedReport,
    });
    res.status(200).json({
      message: "Interview report generated successfully",
      interviewReport,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInterviewReport = async (req, res) => {
  try {
    const report = await interviewReportModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    res.status(200).json({ interviewReport: report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInterviewHistory = async (req, res) => {
  try {
    const reports = await interviewReportModel.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select("matchScore createdAt jobDescription selfDescription");
    
    res.status(200).json({ reports });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateInterview, getInterviewReport, getInterviewHistory };
