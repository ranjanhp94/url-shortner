const express = require('express');
const app = express();

var fs = require('fs');
var morgan = require('morgan');
var path = require('path');


// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'))

 // setup the logger
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('combined'));