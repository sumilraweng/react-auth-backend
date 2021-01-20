const express = require("express");
const { dashBoard } = require("../controller/blogController");
const router = express.Router();
const { protectRoute } = require("../middleware/protectRoute");

router.route("/dashboard").get(protectRoute, dashBoard);

module.exports = router;
