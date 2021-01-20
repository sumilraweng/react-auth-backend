const { sendErrorResponse } = require("../helper/response/sendErrorResponse");
const AppError = require("../helper/response/appError");
const { sendResponse } = require("../helper/response/sendResponse");
const { create, find } = require("../model/userMongoCrud");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helper/jwt/jwtAuth");
const { config } = require("../configuration/config");

module.exports.signupUser = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    await create(user);
    sendResponse(201, "success", `${req.body.email} created`, res);
  } catch (err) {
    sendErrorResponse(new AppError(400, "unsuccessful", "bad request"), res);
  }
};

module.exports.login = async (req, res) => {
  try {
    let result = await bcrypt.compare(
      req.body.password,
      req.currentUser.password
    );

    if (!result) {
      sendErrorResponse(
        new AppError(401, "Unsucessfull", "Password is incorrect"),
        res
      );
    }
    // -- Assigning  the  jwt Token

    const jwtToken = await generateToken(
      {
        email: req.currentUser.email,
      },
      config.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("jwt", jwtToken);

    sendResponse(200, "succcesfull", [{ jwt: jwtToken }], res);
  } catch (err) {
    sendErrorResponse(new AppError(500, "Unsucessfull", "Internal Error"), res);
  }
};

module.exports.verifyUser = (req, res) => {
  sendResponse(200, "succcesfull", { verified: true }, res);
};

module.exports.logout = (req, res) => {
  res.clearCookie("jwt", { path: "/logout" });
  return sendResponse(200, "succcesfull", "logout", res);
};
