const express = require("express");
const router = express.Router();
const { register, login, logout, getme } = require("../controllers/auth.controler");
/**
 * /api/auth/register
 * /api/auth/login
 */
router.post("/register", register);
router.post("/login", login);
/**
 * /api/auth/logout
 */
router.post("/logout", logout);

/**
 * @routes GET api/auth/get-me
 */
router.get("/get-me",getme)

module.exports = router;