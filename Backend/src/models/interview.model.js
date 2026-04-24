const mongoose = require("mongoose");

const technicalQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
},
{_id: false},
)

const behavioralQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
},
{_id: false},
)

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true,
        enum: ["low", "medium", "high"],
        lowercase: true,
        trim: true
    },
    type: {
        type: String,
        required: true
    }
},
{_id: false},
)

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true
    },
    focus: {
        type: String,
        required: true
    },
    task: [{
        type: String,
        required: true
    }]
},
{_id: false},
)

const optimizationSuggestionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["bullet-point", "keyword"],
        required: true
    },
    suggestion: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
},
{_id: false},
)


const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"]
    },
    resumeText: {
        type: String,
        required: [true, "Resume text is required"]
    },
    selfDescription: {
        type: String,
        required: true
    },
    matchScore: {
        type: Number,
        min:0,
        max:100
    },
    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behavioralQuestionsSchema],
    skillGap: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    optimizationSuggestions: [optimizationSuggestionSchema],
    potentialScore: {
        type: Number,
        min: 0,
        max: 100
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("InterviewReport", interviewReportSchema);

