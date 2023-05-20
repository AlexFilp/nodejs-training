const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
} = require("../controllers/authControllers");

const authenticate = require("../middlewares/authenticate");
const validateBody = require("../utils/validateBody");
const joiSchemas = require("../utils/validation/authValidationSchemas");

const router = express.Router();

router.post(
  "/register",
  validateBody(joiSchemas.createUserValidationSchema),
  register
);
router.post("/login", validateBody(joiSchemas.loginValidationSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

module.exports = {
  authRouter: router,
};
