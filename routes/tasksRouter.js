const express = require("express");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksControllers");
const validateBody = require("../utils/validateBody");
const joiSchemas = require("../utils/validation/taskValidationSchemas");

const router = express.Router();

router
  .route("/")
  .get(getTasks)
  .post(validateBody(joiSchemas.createTaskValidationSchema), createTask);
router
  .route("/:taskId")
  .get(getTask)
  .patch(validateBody(joiSchemas.updateTaskValidationSchema), updateTask)
  .delete(deleteTask);

// router.get("/", getTasks);

// router.get("/:taskId", getTask);

// router.post(
//   "/",
//   (req, res, next) => {
//     console.log("HELLO FROM MIDDLEWARE!");
//     next();
//   },
//   createTask
// );

// router.patch("/:taskId", updateTask);

// router.delete("/:taskId", deleteTask);

module.exports = {
  tasksRouter: router,
};
