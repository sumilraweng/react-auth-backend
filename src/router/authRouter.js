const express = require("express");
const router = express.Router();
const {
  checkBodyRequest,
  isEmailValid,
  checkConfirmPassword,
  isEmailUnique,
  hashPassword,
  isRegistered,
} = require("../middleware/UserAuthMiddleware");
const { verifyRoute, isLoggedIn } = require("../middleware/protectRoute");
const {
  signupUser,
  login,
  logout,
  verifyUser,
} = require("../controller/authController");

router
  .route("/signup")
  .post(
    checkBodyRequest,
    isEmailValid,
    checkConfirmPassword,
    isEmailUnique,
    hashPassword,
    signupUser
  );
router
  .route("/login")
  .post(checkBodyRequest, isEmailValid, isRegistered, login);

router.route("/verifyUser").get(verifyRoute, verifyUser);

router.route("/logout").get(isLoggedIn, logout);

module.exports = router;
