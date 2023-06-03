const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksControllers");

const isValidId = require("../middlewares/isValidId");
const authenticate = require("../middlewares/authenticate");
const validateBody = require("../utils/validateBody");
const joiSchemas = require("../utils/validation/taskValidationSchemas");

const router = express.Router();
// router.use(authenticate);

router
  .route("/")
  .get(authenticate, getTasks)
  .post(
    authenticate,
    validateBody(joiSchemas.createTaskValidationSchema),
    createTask
  );
router
  .route("/:taskId")
  .get(authenticate, isValidId, getTask)
  .patch(
    authenticate,
    isValidId,
    validateBody(joiSchemas.updateTaskValidationSchema),
    updateTask
  )
  .delete(authenticate, isValidId, deleteTask);

module.exports = {
  tasksRouter: router,
};
