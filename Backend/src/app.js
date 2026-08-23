const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const reminderRoutes = require("./routes/reminderRoutes");

require("./config/passport");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoutes);
app.use("/api/reminders", reminderRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;
