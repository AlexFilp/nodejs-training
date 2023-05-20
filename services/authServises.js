const HttpError = require("../utils/HttpError");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const registerService = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user) {
    throw new HttpError(409, "Email already in use");
  }

  return await User.create(body);
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

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  return await User.findByIdAndUpdate(
    user._id,
    { refreshToken: token },
    { new: true }
  );
};

const logoutService = async (id) => {
  return await User.findByIdAndUpdate(id, { refreshToken: null });
};

module.exports = {
  registerService,
  loginService,
  logoutService,
};
