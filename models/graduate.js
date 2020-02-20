const mongoose = require("mongoose");

const graduateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  graduationYear: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  keySkills: {
    type: String,
    required: true
  },
  gitHub: {
    type: String,
    required: true
  },
  linkedIn: {
    type: String,
    required: true
  },
  twitter: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Graduate", graduateSchema);
