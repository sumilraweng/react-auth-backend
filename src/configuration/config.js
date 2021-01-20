const DEV = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
Object.freeze(DEV);
const config = { DEV: DEV };
Object.freeze(config);

module.exports.config = config[process.env.NODE_ENV];
