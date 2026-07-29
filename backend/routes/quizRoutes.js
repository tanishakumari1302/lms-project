const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

router.get("/course/:courseId", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ courseId: req.params.courseId });
    if (!quiz) {
      return res.status(404).json({ message: "I couldn't find the quiz for this course!" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { courseId, title, questions } = req.body;
    const newQuiz = new Quiz({ courseId, title, questions });
    await newQuiz.save();
    res.status(201).json({ message: "Quiz created!", quiz: newQuiz });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;