const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  signup,
  login,
  dashboard,
  logout,
  updateProfile,
  lawyerSignup,
  lawyerLogin,
  lawyerDashboard,
  lawyerLogout,
  updateProfileLawyer,
} = require("../controllers/authController");

const {
  isLoggedIn,
  isLoggedInLawyer,
} = require("../middleware/authMiddleware");
const upload = require("../config/multer");

// User Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard", isLoggedIn, dashboard);
router.get("/logout", logout);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      {
        id: req.user._id,
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

    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  },
);
router.put(
  "/update-profile",
  isLoggedIn,
  upload.single("profilePicture"),
  updateProfile,
);

// Lawyer Routes
router.post("/signup-lawyer", lawyerSignup);
router.post("/login-lawyer", lawyerLogin);
router.get("/dashboard-lawyer", isLoggedInLawyer, lawyerDashboard);
router.get("/logout-lawyer", lawyerLogout);
router.put(
  "/update-profile-lawyer",
  isLoggedInLawyer,
  upload.single("profilePicture"),
  updateProfileLawyer,
);

module.exports = router;
