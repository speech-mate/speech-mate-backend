const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return next(createError(401, "Unauthorized"));

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_SECRET, async (error) => {
    if (error) {
      return next(createError(403, "Forbidden"));
    }

    next();
  });
};

module.exports = verifyAccessToken;
