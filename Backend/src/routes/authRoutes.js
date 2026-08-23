const express = require("express");

const router = express.Router();

const passport = require("passport");

const {
  signup,
  login,
  dashboard,
  logout,
  updateProfile,
} = require("../controllers/authController");

const { isLoggedIn } = require("../middleware/authMiddleware");

router.post("/signup", signup);

router.post("/login", login);
router.get("/dashboard", isLoggedIn, dashboard);
router.get("/logout", logout);
router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);
router.get("/google/callback",passport.authenticate("google", {
    failureRedirect: "/login",
  }), (req, res) => {
    // ======================================
    // IMPORT JWT
    // ======================================

    const jwt = require("jsonwebtoken");

    // ======================================
    // CREATE JWT TOKEN
    // ======================================

    const token = jwt.sign(
      {
        id: req.user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    // ======================================
    // STORE JWT IN COOKIE
    // ======================================

    res.cookie("token", token, {
      httpOnly: true,

      secure: false,

      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ======================================
    // REDIRECT USER
    // ======================================

    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  },
);
router.put("/update-profile", isLoggedIn, updateProfile);

module.exports = router;
