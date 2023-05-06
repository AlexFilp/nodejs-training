const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { HttpError } = require("../utils/HttpError");

// const tasksPath = path.join(__dirname, "..", "db", "tasks.json");
// const tasksPath = path.join(process.cwd(), "db", "tasks.json");
const tasksPath = path.join(process.cwd(), "db/tasks.json");

const getTasksService = async () => {
  const tasks = await fs.readFile(tasksPath);
  return JSON.parse(tasks);
};

const getTaskService = async (taskId) => {
  const tasks = await getTasksService();
  const task = tasks.find((item) => item.id === taskId);
  return task;
};

const createTaskService = async (data) => {
  const tasks = await getTasksService();
  const newTask = { id: crypto.randomUUID(), ...data };
  tasks.push(newTask);
  fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
  return newTask;
};

const updateTaskService = async (taskId, data) => {
  const tasks = await getTasksService();
  const updatedTask = tasks.find((task) => task.id === taskId);
  if (!updatedTask) {
    throw new HttpError(404, "Task not found!");
  }
  updatedTask.title = data.title || updatedTask.title;
  updatedTask.completed = data.completed || updatedTask.completed;
  fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
  return updatedTask;
};

const deleteTaskService = async (taskId) => {
  const tasks = await getTasksService();
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) {
    throw new HttpError(404, "Task not found!");
  }
  const [deletedTask] = tasks.splice(index, 1);
  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
  return deletedTask;
};

module.exports = {
  getTasksService,
  getTaskService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
};
