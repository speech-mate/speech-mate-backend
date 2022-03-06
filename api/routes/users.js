const express = require("express");
const { createFile } = require("../../services/userService");
const { uploadFile } = require("../middlewares/uploadAudio");

const router = express.Router();

router.post("/:id/files/", uploadFile, createFile);

router.put("/:id/files/:fileId", (req, res, next) => {
  console.log(req.body);
});

router.delete("/:id/files/:fileId", (req, res, next) => {
  console.log(req.body);
});

module.exports = router;
