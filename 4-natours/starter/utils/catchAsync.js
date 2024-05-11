module.exports = catchAsync = (fn) => {
  return (req, res, next) => {
    // new try catch block
    fn(req, res, next).catch(next);
  };
};
