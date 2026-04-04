const mongoose = require("mongoose");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const cookieParser = require("cookie-parser");
const Blacklist = require("../models/blacklist.model"); 
const { sendEmail } = require("../services/email.service");
const { generateOTP, getOTPHtml } = require("../utils/util");
const Otp = require("../models/OTP.model");


exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userExists = await User.findOne({ $or: [{ userName }, { email }] });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const otp = generateOTP();
    // Expiration set to 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    
    // Clear any previous OTPs for this email to avoid confusion
    await Otp.deleteMany({ email });
    
    await Otp.create({ email, otp, expiresAt });
    await sendEmail(email, "OTP Verification", getOTPHtml(email, otp));

    res.status(201).json({ 
      message: "User registered successfully. Please verify your email.",
      email: email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const exsistingUser = await User.findOne({ email });
    if (!exsistingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const hashedPassword = exsistingUser.password;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: exsistingUser._id }, config.jwt_secret, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({
        message: "User logged in successfully",
        user:{
          _id: exsistingUser._id,
          userName: exsistingUser.userName,
          email: exsistingUser.email,
          createdAt: exsistingUser.createdAt,
          updatedAt: exsistingUser.updatedAt,
        }
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "No token found" });
    }
    const blacklist = await Blacklist.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getme = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "No token found" });
    }
    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ error: "Token is blacklisted" });
    }
    const decodedToken = jwt.verify(token, config.jwt_secret);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    
    await Otp.deleteMany({ email });
    await Otp.create({ email, otp, expiresAt });
    
    await sendEmail(email, "Reset Password", getOTPHtml(email, otp));
    res.status(200).json({ message: "OTP sent successfully", email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const otpEntry = await Otp.findOne({ email, otp });
    if (!otpEntry) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.isVerified = true;
    await user.save();

    // Delete the OTP after successful verification
    await Otp.deleteMany({ email });

    // Generate token and log user in after verification
    const token = jwt.sign({ id: user._id }, config.jwt_secret, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ 
      message: "Email verified successfully",
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        isVerified: user.isVerified
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.deleteMany({ email });
    await Otp.create({ email, otp, expiresAt });

    await sendEmail(email, "OTP Verification", getOTPHtml(email, otp));
    res.status(200).json({ message: "OTP resent successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.forgetPassword = forgetPassword;




