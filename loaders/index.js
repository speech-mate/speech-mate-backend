const expressLoader = require("./express.js");
const mongooseLoader = require("./mongoose.js");

const initServer = async ({ expressApp }) => {
  await mongooseLoader();
  console.log("✅ MongoDB Intialized");
  await expressLoader({ app: expressApp });
  console.log("✅ Server Initialized");
};

module.exports = initServer;
