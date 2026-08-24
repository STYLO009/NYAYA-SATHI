const mongoose = require("mongoose");

const lawyerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
    BarCouncilEnrollment: {
      type: String,
      unique: true,
      required: true,
    },
    primaryPracticeArea: {
      type: String,
      required: true,
      enum: [
        "Criminal Law",
        "Civil Law",
        "Family / Matrimonial",
        "Property / Real Estate",
        "Consumer Law",
        "Labour / Employment",
        "Constitutional / PIL",
        "Cyber Crime",
        "Tax Law",
        "Intellectual Property",
        "Other",
      ],
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Lawyer = mongoose.model("Lawyers", lawyerSchema);
module.exports = Lawyer;
