const Joi = require("joi");

const createUserValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is a required field",
    "string.pattern.base": "Incorrect type of email",
    "string.empty": "Email is not allowed to be empty",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password is a required field",
    "string.min": "Password length must be at least {{#limit}} characters long",
    "string.empty": "Password is not allowed to be empty",
  }),
});

const loginValidationSchema = Joi.object().keys({
  email: createUserValidationSchema.extract("email"),
  password: createUserValidationSchema.extract("password"),
});

const JoiSchemas = {
  createUserValidationSchema,
  loginValidationSchema,
};

module.exports = JoiSchemas;
