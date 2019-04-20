const express = require('express');
const app = express();
const mongoose = require('./config/db');
const { routes } = require('./config/routes');
const port = 3001;
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');

app.use(express.json());



// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'))
 // setup the logger
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('combined'));

app.use('/', routes);

app.use(function (req, res, next) {
    res.status(404).send('The resource you are looking for doesn’t exist.')
  });

app.listen(port, () =>{
    console.log('Listening on port', port);
});