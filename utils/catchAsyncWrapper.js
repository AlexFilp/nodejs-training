const catchAsyncWrapper = (cntrl) => {
  return (req, res, next) => {
    cntrl(req, res).catch(next);
  };
};

module.exports = catchAsyncWrapper;
