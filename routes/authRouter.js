const express = require("express");
const { register, login, logout } = require("../controllers/authControllers");

const validateBody = require("../utils/validateBody");
const joiSchemas = require("../utils/validation/authValidationSchemas");

const router = express.Router();

router.post(
  "/register",
  validateBody(joiSchemas.createUserValidationSchema),
  register
);
router.post("/login", validateBody(joiSchemas.loginValidationSchema), login);
router.post("/logout", logout);

module.exports = {
  authRouter: router,
};
