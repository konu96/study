const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const databaseConfig = require('./databaseConfig');
const app = express();
app.use(morgan('short'));

const { dbUrl, options } = databaseConfig();
mongoose.connect(dbUrl, options);

// server
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./controllers'));

app.listen(process.env.PORT || 3000, () => {});
