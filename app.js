const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

if (process.env.NODE_ENV != "PROD") {
  dotenv.config({ path: "./config.env" });
}
const authRouter = require("./src/router/authRouter");
const blogRouter = require("./src/router/blogRouter");
const { config } = require("./src/configuration/config");

const PORT = config.PORT || 3000;
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/blog", blogRouter);
app.use("/api", authRouter);

app.listen(PORT, console.log(`listening to the PORT ${PORT}`));
