const Joi = require("joi");

const createTaskValidationSchema = Joi.object({
  title: Joi.string().min(5).max(50).required(),
  completed: Joi.boolean().required(),
});
const updateTaskValidationSchema = Joi.object()
  .keys({
    title: createTaskValidationSchema.extract("title").optional(),
    completed: createTaskValidationSchema.extract("completed").optional(),
  })
  .or("title", "completed");

const JoiSchemas = {
  createTaskValidationSchema,
  updateTaskValidationSchema,
};

module.exports = JoiSchemas;
