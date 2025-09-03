const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Fake in-memory DB
let tasks = [];
let idCounter = 1;

// Routes
app.get("/", (req, res) => {
  res.send("✅ Task Manager Backend is Running (Fake DB)");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = { id: idCounter++, ...req.body };
  tasks.push(task);
  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id != id);
  res.json({ message: "Task deleted" });
});

// Port
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});


