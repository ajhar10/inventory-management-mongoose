const User = require("../models/User");

exports.signupServices = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};
exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
