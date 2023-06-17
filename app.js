const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { rootRouter } = require("./routes");
const { globalErrorHandler } = require("./middlewares/globalErrorHandler");
const { notFoundHandler } = require("./middlewares/notFound");

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use("/", rootRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: "This route does not exist. Please, check codumentation",
  });
});

app.use(globalErrorHandler);

module.exports = {
  app,
};
