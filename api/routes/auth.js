const express = require("express");
const { login, refreshToken } = require("../../services/authService");

const router = express.Router();

router.post("/login", login);

router.get("/refresh", refreshToken);

module.exports = router;
