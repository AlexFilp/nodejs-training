const HttpError = require("../utils/HttpError");
const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { taskId } = req.params;

  if (!isValidObjectId(taskId)) {
    next(new HttpError(400, `${taskId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
