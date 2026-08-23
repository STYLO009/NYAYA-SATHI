const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User.model");

// ======================================
// GOOGLE STRATEGY
// ======================================

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,

      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },

    // ======================================
    // GOOGLE CALLBACK FUNCTION
    // ======================================

    async (accessToken, refreshToken, profile, done) => {
      try {
        // ======================================
        // CHECK IF USER EXISTS
        // ======================================

        let user = await User.findOne({
          googleId: profile.id,
        });

        // ======================================
        // CREATE USER IF NOT EXISTS
        // ======================================

        if (!user) {
          user = await User.create({
            name: profile.displayName,

            email: profile.emails[0].value,

            googleId: profile.id,
          });
          console.log("New user created:", user);
        }

        // ======================================
        // LOGIN SUCCESS
        // ======================================

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    },
  ),
);

// ======================================
// SERIALIZE USER
// ======================================

// Stores user ID in session

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ======================================
// DESERIALIZE USER
// ======================================

// Gets full user from session ID

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
