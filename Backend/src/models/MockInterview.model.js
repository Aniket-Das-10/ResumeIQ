const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    userAnswer: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      default: "No specific feedback available.",
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    role: {
      type: String,
      enum: ["technical", "behavioral"],
      required: true,
    },
  },
  { _id: false, timestamps: true },
);

const mockInterviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewReport",
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },
    interactions: [interactionSchema],
    overallPerformance: {
      type: String,
    },
    finalScore: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("MockInterview", mockInterviewSchema);
