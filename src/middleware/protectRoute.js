const { sendErrorResponse } = require("../helper/response/sendErrorResponse");
const AppError = require("../helper/response/appError");
const { config } = require("../configuration/config");
const { verifyToken } = require("../helper/jwt/jwtAuth");
const { isExists } = require("../model/userMongoCrud");

module.exports.protectRoute = async (req, res, next) => {
  if (!req.headers.authorization) {
    return sendErrorResponse(
      new AppError(401, "Unsucessfull", "Please Login or Signup "),
      res
    );
  }

  let jwtToken = req.headers.authorization.split(" ")[1];
  let decode;

  try {
    decode = await verifyToken(jwtToken, config.JWT_SECRET);
  } catch (err) {
    return sendErrorResponse(
      new AppError(401, "Unsucessfull", "Invalid Token"),
      res
    );
  }

  let currentUser = await isExists({ email: decode.email });
  if (!currentUser) {
    return sendErrorResponse(
      new AppError(400, "unsucesfull", "Signup or SignIn first"),
      res
    );
  }
  next();
};

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.headers.authorization) {
    return sendErrorResponse(
      new AppError(401, "Unsucessfull", "Please Login or Signup "),
      res
    );
  }
  next();
};

module.exports.verifyRoute = async (req, res, next) => {
  if (!req.headers.authorization) {
    return sendErrorResponse(
      new AppError(401, "Unsucessfull", "Please Login or Signup "),
      res
    );
  }

  let jwtToken = req.headers.authorization.split(" ")[1];
  let decode;

  try {
    decode = await verifyToken(jwtToken, config.JWT_SECRET);
  } catch (err) {
    return sendErrorResponse(
      new AppError(401, "Unsucessfull", "Invalid Token"),
      res
    );
  }

  let currentUser = await isExists({ email: decode.email });
  if (!currentUser) {
    return sendErrorResponse(
      new AppError(400, "unsucesfull", "Signup or SignIn first"),
      res
    );
  }
  next();
};
