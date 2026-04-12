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

module.exports = interviewRouter;