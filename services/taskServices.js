const HttpError = require("../utils/HttpError");
const Task = require("../models/Task");

const getTasksService = async (page, limit, completed) => {
  const skip = (page - 1) * limit;
  const filter = {};
  if (completed === "true") {
    filter.completed = true;
  } else if (completed === "false") {
    filter.completed = false;
  }
  return await Task.find(filter).limit(limit).skip(skip);
};

const getTaskService = async (taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new HttpError(404, "Task not found");
  }
  return task;
};

const createTaskService = async (data) => {
  return await Task.create(data);
};

const updateTaskService = async (taskId, data) => {
  const updatedTask = await Task.findByIdAndUpdate(taskId, data, { new: true });
  if (!updatedTask) {
    throw new HttpError(404, "Task not found");
  }
  return updatedTask;
};

const deleteTaskService = async (taskId) => {
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    throw new HttpError(404, "Task not found");
  }
  return task;
};

module.exports = {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
