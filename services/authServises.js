const HttpError = require("../utils/HttpError");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const asignTokens = require("../utils/asignTokens");

const registerService = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user) {
    throw new HttpError(409, "Email already in use");
  }

  const hashPass = await bcrypt.hash(body.password, 12);

  return await User.create({ ...body, password: hashPass });
};

const loginService = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const { accessToken, refreshToken } = asignTokens(user);

  await User.findByIdAndUpdate(
    user._id,
    { refreshToken: refreshToken },
    { new: true }
  );

  return {
    user,
    accessToken,
  };
};

const logoutService = async (id) => {
  return await User.findByIdAndUpdate(id, { refreshToken: null });
};

module.exports = {
  registerService,
  loginService,
  logoutService,
};
