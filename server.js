'use strict';
var express = require('express');
var path = require('path');
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var stubsUi = require('./index.js')(app);

app.listen(9001, function () {
    console.log('server started on 9001');
});

//module.exports = app;