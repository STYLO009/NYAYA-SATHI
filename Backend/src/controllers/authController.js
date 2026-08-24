const User = require("../models/User.model");
const Lawyer = require("../models/Lawyer.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================================
// SIGNUP CONTROLLER
// ======================================

// Creates a new user account

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,

        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

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
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

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

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
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
    const allowedFields = ["name", "phoneNumber"];
    const updates = Object.fromEntries(
      allowedFields
        .filter((field) => req.body[field] !== undefined)
        .map((field) => [field, req.body[field]]),
    );

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Error updating profile",
    });
  }
};

exports.lawyerSignup = async (req, res) => {
  try {
    const { name, email, phone, password, primaryPracticeArea, yearsOfExperience, BarCouncilEnrollment } = req.body;

    const existingLawyer = await Lawyer.findOne({ email });

    if (existingLawyer) {
      return res.status(400).json({
        success: false,
        message: "Lawyer already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newLawyer = new Lawyer({
      name,
      email,
      phone,
      password: hashedPassword,
      primaryPracticeArea,
      yearsOfExperience,
      BarCouncilEnrollment,
    });

    await newLawyer.save();
    const token = jwt.sign(
      {
        id: newLawyer._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Lawyer created successfully",
      token,
      user: {
        id: newLawyer._id,
        name: newLawyer.name,
        email: newLawyer.email,
        phone: newLawyer.phone,
        primaryPracticeArea: newLawyer.primaryPracticeArea,
        yearsOfExperience: newLawyer.yearsOfExperience,
        BarCouncilEnrollment: newLawyer.BarCouncilEnrollment,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating lawyer",
    });
  }
};

exports.lawyerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const lawyer = await Lawyer.findOne({ email });

    if (!lawyer) {
      return res.status(404).json({
        success: false,
        message: "Lawyer not found",
      });
    }

    const isMatch = await bcrypt.compare(password, lawyer.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: lawyer._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: lawyer._id,
        name: lawyer.name,
        email: lawyer.email,
        phone: lawyer.phone,
        primaryPracticeArea: lawyer.primaryPracticeArea,
        yearsOfExperience: lawyer.yearsOfExperience,
        BarCouncilEnrollment: lawyer.BarCouncilEnrollment,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in lawyer",
    });
  }
};

exports.lawyerDashboard = async (req, res) => {
  res.status(200).json({
    success: true,

    message: "Welcome to dashboard",

    lawyer: req.lawyer,
  });
}

exports.lawyerLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging out lawyer",
    });
  }
};

exports.updateProfileLawyer = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "phone",
      "primaryPracticeArea",
      "yearsOfExperience",
    ];
    const updates = Object.fromEntries(
      allowedFields
        .filter((field) => req.body[field] !== undefined)
        .map((field) => [field, req.body[field]]),
    );

    const lawyer = await Lawyer.findByIdAndUpdate(req.lawyer.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!lawyer) {
      return res.status(404).json({
        success: false,
        message: "Lawyer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: lawyer._id,
        name: lawyer.name,
        email: lawyer.email,
        phone: lawyer.phone,
        primaryPracticeArea: lawyer.primaryPracticeArea,
        yearsOfExperience: lawyer.yearsOfExperience,
        BarCouncilEnrollment: lawyer.BarCouncilEnrollment,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Error updating profile",
    });
  }
};
