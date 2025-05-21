const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  executor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["open", "in_progress", "completed"],
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  skillsRequired: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Task", TaskSchema);
