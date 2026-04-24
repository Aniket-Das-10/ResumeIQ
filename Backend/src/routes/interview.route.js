const express = require("express");
const interviewRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

/**
 * @routes POST api/interview/generate
 * @desc Generate new interview report on the basis of user self description and job description
 * @access Private
 */
interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterview);

/**
 * @routes GET api/interview/history
 * @desc Get all interview reports for the current user
 * @access Private
 */
interviewRouter.get("/history", authMiddleware.authUser, interviewController.getInterviewHistory);

/**
 * @routes GET api/interview/:id
 * @desc Get a single interview report by ID
 * @access Private
 */
interviewRouter.get("/:id", authMiddleware.authUser, interviewController.getInterviewReport);

module.exports = interviewRouter;