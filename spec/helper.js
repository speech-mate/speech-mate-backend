const User = require("../models/User");
const { mockUser } = require("./mockdata");

const createMockUser = async () => {
  await User.create(mockUser);
};

const removeMockUser = async () => {
  await User.deleteOne({ email: mockUser.email });
};

module.exports = { createMockUser, removeMockUser };
