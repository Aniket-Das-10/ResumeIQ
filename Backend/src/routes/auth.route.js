const express = require("express");
const router = express.Router();
const { register, login, logout, getme, verifyOtp, resendOtp } = require("../controllers/auth.controller");
/**
 * /api/auth/register
 * /api/auth/login
 */
router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
/**
 * /api/auth/logout
 */
router.post("/logout", logout);

/**
 * @routes GET api/auth/get-me
 */
router.get("/get-me",getme)

module.exports = router;