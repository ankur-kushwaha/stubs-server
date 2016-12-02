//'use strict';

var express = require('express');
var path = require('path');
var app = express();

var stubsUi = require('./index.js');
app.use("/stubs", stubsUi);

var publicDir = path.join('/Users/ankur.kushwaha/Documents/tomcat8/webapps/');
app.use(express.static(publicDir));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/stubs/index.html');
});

app.listen(3000, function() {
    console.log('server started on 3000');
});

//module.exports = app;