# Stubs Server

This module is for creating and mocking API responses via json and stubs.

## Steps 

1. Install stubs-server usign `npm insall --save stubs-router`.
2. Create an index.js file 

```
//'use strict';

var express = require('express');
var path = require('path');
var app = express();

var stubsUi = require('stubs-router');
app.use("/stubs", stubsUi);

var publicDir = path.join('/Users/ankur.kushwaha/Documents/tomcat8/webapps/');
app.use(express.static(publicDir));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/stubs/index.html');
});

app.listen(9001, function() {
    console.log('server started on 9001');
});

//module.exports = app;
``` 