const catchAsyncWrapper = require("../utils/catchAsyncWrapper");
const {
  loginService,
  registerService,
  logoutService,
} = require("../services/authServises");

const register = catchAsyncWrapper(async (req, res) => {
  const newUser = await registerService(req.body);
  res.status(201).json(newUser);
});

const login = catchAsyncWrapper(async (req, res) => {});

const logout = catchAsyncWrapper(async (req, res) => {});

module.exports = {
  register,
  login,
  logout,
};
