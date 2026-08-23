// ======================================
// IMPORT USER MODEL
// ======================================

const User = require("../models/User.model");

// ======================================
// IMPORT BCRYPT
// ======================================

// Used for password hashing

const bcrypt = require("bcryptjs");

// ======================================
// IMPORT JWT
// ======================================

// Used for generating authentication tokens

const jwt = require("jsonwebtoken");

// ======================================
// SIGNUP CONTROLLER
// ======================================

// Creates a new user account

exports.signup = async (req, res) => {
  try {
    // ======================================
    // GET DATA FROM FRONTEND
    // ======================================

    const { name, email, password } = req.body;

    // ======================================
    // CHECK IF USER ALREADY EXISTS
    // ======================================

    const existingUser = await User.findOne({ email });

    // ======================================
    // IF USER EXISTS
    // ======================================

    if (existingUser) {
      return res.status(400).json({
        success: false,

        message: "User already exists",
      });
    }

    // ======================================
    // HASH PASSWORD
    // ======================================

    const hashedPassword = await bcrypt.hash(password, 10);

    // ======================================
    // CREATE USER IN DATABASE
    // ======================================

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ======================================
    // GENERATE JWT TOKEN
    // ======================================

    const token = jwt.sign(
      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    // ======================================
    // STORE TOKEN IN COOKIE
    // ======================================

    res.cookie("token", token, {
      httpOnly: true,

      secure: false,

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ======================================
    // SEND RESPONSE
    // ======================================

    res.status(201).json({
      success: true,

      message: "User created successfully",

      token,

      user: {
        id: user._id,

        name: user.name,

        email: user.email,
      },
    });
  } catch (error) {
    // ======================================
    // SERVER ERROR
    // ======================================

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================
// LOGIN CONTROLLER
// ======================================

// Verifies existing user credentials

exports.login = async (req, res) => {
  try {
    // ======================================
    // GET LOGIN DATA
    // ======================================

    const { email, password } = req.body;

    // ======================================
    // FIND USER IN DATABASE
    // ======================================

    const user = await User.findOne({ email });

    // ======================================
    // USER NOT FOUND
    // ======================================

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    // ======================================
    // COMPARE PASSWORDS
    // ======================================

    const isMatch = await bcrypt.compare(password, user.password);

    // ======================================
    // INVALID PASSWORD
    // ======================================

    if (!isMatch) {
      return res.status(400).json({
        success: false,

        message: "Invalid credentials",
      });
    }

    // ======================================
    // GENERATE JWT TOKEN
    // ======================================

    const token = jwt.sign(
      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    // ======================================
    // STORE TOKEN IN COOKIE
    // ======================================

    res.cookie("token", token, {
      httpOnly: true,

      secure: false,

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ======================================
    // SEND LOGIN RESPONSE
    // ======================================

    res.status(200).json({
      success: true,

      message: "Login successful",

      token,

      user: {
        id: user._id,

        name: user.name,

        email: user.email,
      },
    });
  } catch (error) {
    // ======================================
    // SERVER ERROR
    // ======================================

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================
// PROTECTED DASHBOARD ROUTE
// ======================================

// Only accessible with valid JWT token

exports.dashboard = async (req, res) => {
  res.status(200).json({
    success: true,

    message: "Welcome to dashboard",

    user: req.user,
  });
};
// ======================================
// LOGOUT CONTROLLER
// ======================================

exports.logout = async (req, res) => {
  try {
    // ======================================
    // CLEAR AUTH COOKIE
    // ======================================

    res.clearCookie("token", {
      httpOnly: true,

      secure: false,
    });

    // ======================================
    // SEND RESPONSE
    // ======================================

    res.status(200).json({
      success: true,

      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating profile",
    });
  }
};
