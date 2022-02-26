const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../routes/auth");
const usersRouter = require("../routes/users");

const initExpress = ({ app }) => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(helmet());
  app.use(cors());

  app.use("/auth", authRouter);
  app.use("/users", usersRouter);

  app.use((req, res, next) => {
    res.sendStatus(createError(404));
  });

  app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500);
    res.json({
      message: err.message,
      data: null,
    });
  });
};

module.exports = initExpress;