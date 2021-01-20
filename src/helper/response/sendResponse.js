module.exports.sendResponse = (statusCode, status, data, res) => {
  res.status(statusCode).json({
    status: status,
    data: data,
  });
};
