const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const Lawyer = require("../models/Lawyer.model");

// ======================================
// AUTH MIDDLEWARE
// ======================================

// Protects private routes

exports.isLoggedIn = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ======================================
    // TOKEN FROM COOKIE
    // ======================================
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    // ======================================
    // NO TOKEN FOUND
    // ======================================

    if (!token) {
      return res.status(401).json({
        success: false,

        message: "No token found",
      });
    }

    // ======================================
    // VERIFY JWT TOKEN
    // ======================================

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ======================================
    // LOAD THE FULL USER PROFILE
    // ======================================

    const user = await User.findById(decoded.id).select(
      "name email googleId phoneNumber profilePicture",
    );

    if (!user) {
      return res.status(401).json({
        success: false,

        message: "User not found",
      });
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      googleId: user.googleId,
      phoneNumber: user.phoneNumber,
      profilePicture: user.profilePicture,
    };

    // ======================================
    // MOVE TO NEXT MIDDLEWARE/CONTROLLER
    // ======================================

    next();
  } catch (error) {
    // ======================================
    // INVALID TOKEN
    // ======================================

    return res.status(401).json({
      success: false,

      message: "Invalid token",
    });
  }
};

exports.isLoggedInLawyer = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return res.status(401).json({
        success: false,

        message: "No token found",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const lawyer = await Lawyer.findById(decoded.id).select(
      "name email phone primaryPracticeArea yearsOfExperience BarCouncilEnrollment profilePicture",
    );

    if (!lawyer) {
      return res.status(401).json({
        success: false,

        message: "Lawyer not found",
      });
    }

    req.lawyer = {
      id: lawyer._id,
      name: lawyer.name,
      email: lawyer.email,
      phone: lawyer.phone,
      primaryPracticeArea: lawyer.primaryPracticeArea,
      yearsOfExperience: lawyer.yearsOfExperience,
      BarCouncilEnrollment: lawyer.BarCouncilEnrollment,
      profilePicture: lawyer.profilePicture,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,

      message: "Invalid token",
    });
  }
};
