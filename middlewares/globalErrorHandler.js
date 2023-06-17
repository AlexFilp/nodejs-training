const globalErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    msg: err.message || "Something went wrong, please try again later",
  });
};

module.exports = { globalErrorHandler };
