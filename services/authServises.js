const HttpError = require("../utils/HttpError");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerService = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user) {
    throw new HttpError(409, "Email already in use");
  }

  //   body.password = await bcrypt.hash(body.password, 12);
  return await User.create(body);
};

const loginService = () => {};

const logoutService = () => {};

module.exports = {
  registerService,
  loginService,
  logoutService,
};
