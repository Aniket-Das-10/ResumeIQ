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

    // Check if a verified user already exists with this email or username
    const userExists = await User.findOne({ $or: [{ userName }, { email }] });
    if (userExists) {
      return res.status(400).json({ error: "User already exists and is verified" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    
    // Store pending registration data in the Otp collection
    await Otp.findOneAndUpdate(
      { email },
      { 
        otp, 
        userName, 
        password: hashedPassword, 
        expiresAt 
      },
      { upsert: true, new: true }
    );
    
    await sendEmail(email, "OTP Verification", getOTPHtml(email, otp));

    res.status(201).json({ 
      message: "Verification code sent to your email. Please verify to complete registration.",
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

    // Now create the actual User document from the pending data
    const user = await User.create({
      userName: otpEntry.userName,
      email: otpEntry.email,
      password: otpEntry.password,
      isVerified: true
    });

    // Delete the OTP after successful verification and user creation
    await Otp.deleteMany({ email });

    // Generate token and log user in
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
      message: "Registration complete and email verified successfully",
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

    // Find the existing OTP entry to ensure we preserve userName and password
    const existingOtp = await Otp.findOne({ email });
    if (!existingOtp) {
      return res.status(404).json({ error: "Registration session not found. Please sign up again." });
    }

    existingOtp.otp = otp;
    existingOtp.expiresAt = expiresAt;
    await existingOtp.save();

    await sendEmail(email, "OTP Verification", getOTPHtml(email, otp));
    res.status(200).json({ message: "OTP resent successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.forgetPassword = forgetPassword;




