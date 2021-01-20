const { UserAuthSchema } = require("./userAuthSchema");
const { connect } = require("./userMongoConnection");
const uniqid = require("uniqid");
const User = connect.model("authTest", UserAuthSchema);

const find = async (obj) => {
  try {
    return await User.findOne(obj).select("userId email password -_id");
  } catch (err) {
    return err;
  }
};

const create = async (obj) => {
  try {
    return new User(obj).save();
  } catch (err) {
    return err;
  }
};

const isExists = async (obj) => {
  try {
    return await User.exists(obj);
  } catch (err) {
    return err;
  }
};
module.exports = {
  find: find,
  create: create,
  isExists: isExists,
};
