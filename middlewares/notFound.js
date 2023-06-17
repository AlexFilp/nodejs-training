const notFoundHandler = (error, req, res, next) => {
  res.status(404).json({
    message: "This route does not exist. Please, check codumentation",
  });
};

module.exports = {
  notFoundHandler,
};
