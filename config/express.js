const express = require('express');
const log = require('morgan')('dev');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(log);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors);

require('./routes')(app, limiter);

module.exports = app;