//'use strict';

var express = require('express');
var path = require('path');
var app = express();
var mkdirp = require('mkdirp');
var bodyParser = require('body-parser')
var fs = require('fs');

var propertiesReader = require('properties-reader');
//var properties = propertiesReader('user.properties');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//app.use(express.static(path.join(__dirname,'/SnapdealSellerFrontUI/local/stubs-ui/')));

var publicDir = path.join('/Users/ankur.kushwaha/Documents/tomcat8/webapps/');

app.use(express.static(publicDir));

var stubsUi=require('./stubs.routes.js');

app.use('/stubs', stubsUi);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/stubs/index.html');
});

app.use('/*', function(req, res) {
    console.log('getting ' + req.baseUrl);
    var file = path.join(__dirname, 'stubs', req.baseUrl + '.json');
    setTimeout(function(){
        res.sendFile(file);
    },500);
});
app.use(function(err, req, res, next) {
    res.status(502).send('');
});

module.exports = app;
