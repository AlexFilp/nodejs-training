const express = require("express");
const { tasksRouter } = require("./routes/tasksRouter");
const { authRouter } = require("./routes/authRouter");

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    msg: err.message || "Something went wrong, please try again later",
  });
});

module.exports = {
  app,
};
