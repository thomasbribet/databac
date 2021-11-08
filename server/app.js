const helmet = require("helmet");
const cors = require("cors");
const history = require("connect-history-api-fallback");
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(history());
app.use(express.static(__dirname + "/dist"));

mongoose
  .connect(process.env.DB_CONNSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection: OK"))
  .catch((error) => handleError(error));

module.exports = app;
