const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/User");
const { MESSAGE } = require("../constants");

const login = async (req, res, next) => {
  const { email, nickname, photo } = req.body;

  try {
    let user = await User.findOneAndUpdate(
      { email },
      { email, nickname, photo },
      { upsert: true, new: true },
    );

    const accessToken = jwt.sign(
      { email, nickname, photo },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_MAX_AGE },
    );

    res.json({
      message: MESSAGE.OK,
      data: {
        accessToken,
        userInfo: user,
      },
    });
  } catch (err) {
    next(createError(500, MESSAGE.INTERNAL_SERVER_ERROR));
  }
};

module.exports = { login };
