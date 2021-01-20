module.exports.sendErrorResponse = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
