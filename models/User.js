const mongoose = require("mongoose");

const subThemeSchema = new mongoose.Schema({
  time: Number,
  title: String,
  isAchieved: Boolean,
});

const fileSchema = new mongoose.Schema({
  title: String,
  length: Number,
  url: String,
  subThemes: [subThemeSchema],
  selectedPitch: {
    type: String,
    enum: ["C", "D", "E", "F", "G"],
  },
  dominantNode: {
    type: String,
    enum: ["C", "D", "E", "F", "G"],
  },
  createdAt: String,
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  nickname: String,
  photo: String,
  files: [fileSchema],
});

module.exports = mongoose.model("User", userSchema);
