const mongoose = require("mongoose");

const subThemeSchema = new mongoose.Schema({
  min: Number,
  sec: Number,
  text: String,
  isAchieved: Boolean,
});

const fileSchema = new mongoose.Schema({
  title: String,
  min: Number,
  sec: Number,
  url: String,
  subThemes: [subThemeSchema],
  selectedTone: Object,
  userPitch: Object,
  pitchStatus: Object,
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
