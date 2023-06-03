const catchAsyncWrapper = require("../utils/catchAsyncWrapper");
const {
  loginService,
  registerService,
  logoutService,
} = require("../services/authServises");

const register = catchAsyncWrapper(async (req, res) => {
  const newUser = await registerService(req.body);
  res.status(201).json({
    email: newUser.email,
  });
});

const login = catchAsyncWrapper(async (req, res) => {
  const { user, accessToken } = await loginService(req.body);
  res.json({
    accessToken,
    email: user.email,
  });
});

const getCurrent = catchAsyncWrapper(async (req, res) => {
  const { email } = req.user;
  res.json({ email });
});

const logout = catchAsyncWrapper(async (req, res) => {
  const { _id } = req.user;
  await logoutService(_id);
  res.status(204).json();
});

module.exports = {
  register,
  login,
  getCurrent,
  logout,
};
