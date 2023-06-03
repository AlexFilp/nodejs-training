const HttpError = require("./HttpError");

const validateBody = (schema) => {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new HttpError(422, error.message));
      return;
    }
    next();
  };
};

module.exports = validateBody;
