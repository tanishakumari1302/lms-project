const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  questions: [
    {
      q: String,
      options: [String],
      answer: Number
    }
  ]
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;