#!/usr/bin/env node

var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var stubsServer=require('../index');
var https = require('https');
var options = {
  cert: fs.readFileSync(path.join(__dirname,'../certificates/server.crt')),
  key: fs.readFileSync(path.join(__dirname,'../certificates/server.key'))
};


// Below lines are required only if you want to enable cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Just add the below line to add stubs-server in your express app
stubsServer(app);

//you can also pass the context name here 
//stubsServer(app,'/contextNameForStubs');
// by default it is available on '/stubs'

//start the server on port 9001 or any port of your choice
var server = https.createServer(options, app);

server.listen(9001, function(){
  console.log("server running at https://localhost:9001/")
});

app.listen(9000, function(){
  console.log("server running at http://localhost:9000/")
});

//module.exports = app;