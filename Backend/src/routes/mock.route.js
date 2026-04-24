const express = require("express");
const mockRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const mockController = require("../controllers/mock.controller");

mockRouter.post("/start", authMiddleware.authUser, mockController.startSession);
mockRouter.post("/submit", authMiddleware.authUser, mockController.submitAnswer);
mockRouter.post("/chat", authMiddleware.authUser, mockController.followUpChat);
mockRouter.post("/complete/:sessionId", authMiddleware.authUser, mockController.completeSession);
mockRouter.get("/history", authMiddleware.authUser, mockController.getSessionHistory);

module.exports = mockRouter;
