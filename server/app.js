const helmet = require("helmet");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/dist"));

module.exports = app;
