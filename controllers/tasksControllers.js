const {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/taskServices");

const catchAsyncWrapper = require("../utils/catchAsyncWrapper");

const getTasks = catchAsyncWrapper(async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10, completed } = req.query;
  const tasks = await getTasksService(page, limit, completed, userId);
  res.status(200).json(tasks);
});

const getTask = catchAsyncWrapper(async (req, res) => {
  const userId = req.user._id;
  const { taskId } = req.params;
  const task = await getTaskService(taskId, userId);
  res.status(200).json(task);
});

const createTask = catchAsyncWrapper(async (req, res) => {
  const userId = req.user._id;
  const newTask = await createTaskService(req.body, userId);
  res.status(201).json(newTask);
});

const updateTask = catchAsyncWrapper(async (req, res) => {
  const userId = req.user._id;
  const { taskId } = req.params;
  const updatedTask = await updateTaskService(taskId, req.body, userId);
  res.status(200).json(updatedTask);
});

const deleteTask = catchAsyncWrapper(async (req, res) => {
  const userId = req.user._id;
  const { taskId } = req.params;
  const deletedTask = await deleteTaskService(taskId, userId);
  //   res.sendStatus(204);
  res.status(200).json({
    message: `Task with id ${taskId} was deleted`,
    deletedTask: { title: deletedTask.title, completed: deletedTask.completed },
  });
});

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
