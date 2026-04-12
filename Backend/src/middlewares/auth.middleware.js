const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user.model");
const Blacklist = require("../models/blacklist.model");

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        const isBlacklisted = await Blacklist.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ error: "Token is blacklisted. Please login again." });
        }

        const decoded = jwt.verify(token, config.jwt_secret);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token." });
    }
};

module.exports = { authUser };
