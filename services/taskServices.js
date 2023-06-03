const HttpError = require("../utils/HttpError");
const Task = require("../models/task");

const getTasksService = async (page, limit, completed, userId) => {
  const skip = (page - 1) * limit;
  const filter = {
    owner: userId,
  };
  if (completed === "true") {
    filter.completed = true;
  } else if (completed === "false") {
    filter.completed = false;
  }
  return await Task.find(filter).skip(skip).limit(limit);
};

const getTaskService = async (taskId, userId) => {
  const task = await Task.findOne({ _id: taskId, owner: userId });
  if (!task) {
    throw new HttpError(404, "Task not found");
  }
  return task;
};

const createTaskService = async (body, userId) => {
  return await Task.create({ ...body, owner: userId });
};

const updateTaskService = async (taskId, data, userId) => {
  const updatedTask = await Task.findByIdAndUpdate(
    { _id: taskId, owner: userId },
    data,
    { new: true }
  );
  if (!updatedTask) {
    throw new HttpError(404, "Task not found");
  }
  return updatedTask;
};

const deleteTaskService = async (taskId, userId) => {
  const task = await Task.findByIdAndDelete({ _id: taskId, owner: userId });
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
