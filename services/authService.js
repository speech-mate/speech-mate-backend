const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/User");
const { MESSAGE } = require("../constants");

const login = async (req, res, next) => {
  const { email, nickname, photo } = req.body;
  const userInfo = {
    email,
    nickname,
    photo,
  };

  try {
    let user = await User.findOneAndUpdate({ email }, userInfo, {
      upsert: true,
      new: true,
    });

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_MAX_AGE,
    });

    const refreshToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_MAX_AGE,
    });

    res.json({
      message: MESSAGE.OK,
      data: {
        accessToken,
        refreshToken,
        userInfo: user,
      },
    });
  } catch (err) {
    next(createError(500, MESSAGE.INTERNAL_SERVER_ERROR));
  }
};

const refreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  const refreshToken = cookies.jwt;

  if (!refreshToken) return next(createError(401, "Unauthorized"));

  try {
    jwt.verify(
      refreshToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (error, decoded) => {
        if (error?.name === "TokenExpiredError") {
          return next(createError(401, "Unauthorized"));
        }

        if (!decoded) return next(createError(403, "Forbidden"));
        const { email, nickname, photo } = decoded;
        const user = await User.findOne({ email });

        if (error || !user) return next(createError(403, "Forbidden"));

        const accessToken = jwt.sign(
          { email, nickname, photo },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.REFRESH_TOKEN_MAX_AGE },
        );

        res.json({
          message: MESSAGE.OK,
          data: {
            accessToken,
            userInfo: user,
          },
        });
      },
    );
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { login, refreshToken };
