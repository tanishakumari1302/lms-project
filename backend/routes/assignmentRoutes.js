const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find().populate("courseId", "title");
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/course/:courseId", async (req, res) => {
  try {
    const assignments = await Assignment.find({ courseId: req.params.courseId });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { courseId, title, dueDate } = req.body;
    const newAssignment = new Assignment({ courseId, title, dueDate });
    await newAssignment.save();
    res.status(201).json({ message: "Assignment created!", assignment: newAssignment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;