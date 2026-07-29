const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);
const quizRoutes = require("./routes/quizRoutes");
app.use("/api/quizzes", quizRoutes);
const assignmentRoutes = require("./routes/assignmentRoutes");
app.use("/api/assignments", assignmentRoutes);

console.log("MONGO_URI value:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB ! ✅"))
  .catch((err) => console.error("MongoDB did not connect ❌:", err));

app.get("/", (req, res) => {
  res.send("LMS Backend is running!");
});

app.listen(PORT, () => {
  console.log(`The server is running : http://localhost:${PORT}`);
});