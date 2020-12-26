const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const databaseConfig = require("./databaseConfig");
const app = express();

app.use(morgan("short"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("./controllers"));

const { dbUrl, options } = databaseConfig();
mongoose.connect(dbUrl, options);

app.listen(process.env.PORT || 3000, () => {});
