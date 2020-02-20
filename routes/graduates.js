const express = require("express");
const router = express.Router();
const Graduate = require("../models/graduate");

//Getting all graduates
router.get("/", async (req, res) => {
  try {
    const graduates = await Graduate.find();
    res.json(graduates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting one graduate
router.get("/:id", getGraduate, (req, res) => {
  res.json(res.graduate);
});

//Creating one graduate
router.post("/", async (req, res) => {
  const graduate = new Graduate({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    graduationYear: req.body.graduationYear,
    jobTitle: req.body.jobTitle,
    companyName: req.body.companyName,
    keySkills: req.body.keySkills,
    gitHub: req.body.gitHub,
    linkedIn: req.body.linkedIn,
    twitter: req.body.twitter
  });
  try {
    const newGraduate = await graduate.save();
    res.status(201).json(newGraduate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Updating one graduate
router.patch("/:id", getGraduate, async (req, res) => {
  if (req.body.firstName != null) {
    res.graduate.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.graduate.lastName = req.body.lastName;
  }
  if (req.body.graduationYear != null) {
    res.graduate.graduationYear = req.body.graduationYear;
  }
  if (req.body.jobTitle != null) {
    res.graduate.jobTitle = req.body.jobTitle;
  }
  if (req.body.companyName != null) {
    res.graduate.companyName = req.body.companyName;
  }
  if (req.body.keySkills != null) {
    res.graduate.keySkills = req.body.keySkills;
  }
  if (req.body.gitHub != null) {
    res.graduate.gitHub = req.body.gitHub;
  }
  if (req.body.linkedIn != null) {
    res.graduate.linkedIn = req.body.linkedIn;
  }
  if (req.body.twitter != null) {
    res.graduate.twitter = req.body.twitter;
  }

  try {
    const updatedGraduate = await res.graduate.save();
    res.json(updatedGraduate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Deleting one graduate
router.delete("/:id", getGraduate, async (req, res) => {
  try {
    await res.graduate.remove();
    res.json({ message: "Deleted graduate" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getGraduate(req, res, next) {
  let graduate;
  try {
    graduate = await Graduate.findById(req.params.id);
    if (graduate == null) {
      return res.status(404).json({ message: "Cannot find graduate" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.graduate = graduate;
  next();
}
module.exports = router;

//
