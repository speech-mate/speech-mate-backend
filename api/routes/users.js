const express = require("express");
const {
  readFiles,
  createFile,
  updateFile,
  deleteFile,
} = require("../../services/userService");
const { uploadAudio, deleteAudio } = require("../middlewares/uploadAudio");

const router = express.Router();

router.get("/:id/files/", readFiles);

router.post("/:id/files/", uploadAudio, createFile);

router.put("/:id/files/:fileId", updateFile);

router.delete("/:id/files/:fileId", deleteAudio, deleteFile);

module.exports = router;
