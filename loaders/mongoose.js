const mongoose = require("mongoose");

const initMongoose = async () => {
  const connection = await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  });
  return connection.connection.db;
};

module.exports = initMongoose;
