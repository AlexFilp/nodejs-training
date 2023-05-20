const {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} = require("../services/taskServices");

const catchAsyncWrapper = require("../utils/catchAsyncWrapper");

const getTasks = catchAsyncWrapper(async (req, res) => {
  const { page = 1, limit = 10, completed } = req.query;
  const tasks = await getTasksService(page, limit, completed);
  res.status(200).json(tasks);
});

const getTask = catchAsyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const task = await getTaskService(taskId);
  res.status(200).json(task);
});

const createTask = catchAsyncWrapper(async (req, res) => {
  const newTask = await createTaskService(req.body);
  res.status(201).json(newTask);
});

const updateTask = catchAsyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const updatedTask = await updateTaskService(taskId, req.body);
  res.status(200).json(updatedTask);
});

const deleteTask = catchAsyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const deletedTask = await deleteTaskService(taskId);
  //   res.sendStatus(204);
  res.status(200).json(deletedTask);
});

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
