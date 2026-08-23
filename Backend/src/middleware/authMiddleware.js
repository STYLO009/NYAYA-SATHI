const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

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

    const user = await User.findById(decoded.id).select("name email googleId phoneNumber");

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
