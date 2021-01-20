const AppError = require("../helper/response/appError");
const { sendErrorResponse } = require("../helper/response/sendErrorResponse");
const bcrypt = require("bcryptjs");
const { isExists, find } = require("../model/userMongoCrud");

module.exports.checkBodyRequest = (req, res, next) => {
  let validationArray;
  switch (req.url) {
    case "/signup":
      validationArray = ["email", "password", "confirmPassword"];
      break;
    case "/login":
      validationArray = ["email", "password"];
      break;

    default:
      return sendErrorResponse(
        new AppError(404, "unscusseful", "requested request not found"),
        res
      );
  }
  const result = validationArray.every((key) => {
    return req.body[key] && req.body[key].trim().length;
  });
  if (!result) {
    return sendErrorResponse(
      new AppError(400, "Unsucessfull", "Invalid Request Body"),
      res
    );
  }
  next();
};

module.exports.isEmailValid = (req, res, next) => {
  if (!(req.body.email.includes("@") && req.body.email.includes("."))) {
    return sendErrorResponse(
      new AppError(400, "Unsucessfull", "email is not valid"),
      res
    );
  }
  next();
};

module.exports.checkConfirmPassword = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return sendErrorResponse(
      new AppError(
        400,
        "Unsucessfull",
        "password and confirm password do not match"
      ),
      res
    );
  }
  next();
};

module.exports.isEmailUnique = async (req, res, next) => {
  let isEmailExists = await isExists({ email: req.body.email });
  if (isEmailExists) {
    return sendErrorResponse(
      new AppError(400, "Unsucessfull", "Email is already exists"),
      res
    );
  }
  next();
};

module.exports.hashPassword = async (req, res, next) => {
  try {
    let salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    next();
  } catch (err) {
    console.log("hashPassword-->", err);
    return sendErrorResponse(
      new AppError(500, "Unsucessfull", "Internal Error"),
      res
    );
  }
};

//Login

module.exports.isRegistered = async (req, res, next) => {
  try {
    const email = await find({ email: req.body.email });
    if (!email) {
      return sendErrorResponse(
        new AppError(400, "Unsucessfull", "Email is not exists"),
        res
      );
    }
    req.currentUser = email;
    next();
  } catch (err) {
    console.log("isRegistred-->", err);
    return sendErrorResponse(
      new AppError(500, "Unsucessfull", "Internal error"),
      res
    );
  }
};
