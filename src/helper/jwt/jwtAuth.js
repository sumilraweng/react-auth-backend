const jwt = require("jsonwebtoken");
const util = require("util");

module.exports.generateToken = util.promisify(jwt.sign);
module.exports.verifyToken = util.promisify(jwt.verify);
