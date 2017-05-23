// create an express app
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 80;
var config = require('./config/const.js');

console.log(port);

var bodyParser = require('body-parser');
var router = require('./router/router');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static', express.static(config.outputRoot + 'capture'));
console.log(config.outputRoot + 'capture');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port);

console.log('server started on port %s', port);