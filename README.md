# Stubs Server

UI interface for creating and mocking API responses via json stubs.

## Steps 

1. Install stubs-server usign `npm insall --save stubs-router`.
2. Create an index.js file 

```
//'use strict';

var express = require('express');
var path = require('path');
var app = express();
var stubsServer=require('stubs-server');

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

...
// add your routes........
... 

//start the server on port 9001 or any port of your choice
app.listen(9001, function() {
    console.log('server started on 9001');
});

//module.exports = app;
``` 

3. Run the server using `node index.js`
4. Open the stubs server UI on `http://localhost:9001/stubs`
5. Create new stubs by clicking 'Create New Stub'.
6. Type the 'api name'(e.g "test") and enter valid json and Click 'Add API'.
7. Search for API, edit and save.
8. Test your mock api by going to browser "http://localhost:9001/test".
9. Your other routes will work as normal.

## UI Screenshot
![stubs-server](https://cloud.githubusercontent.com/assets/4962816/21962452/93464bac-db4c-11e6-82a9-65a73c9f9ce8.PNG)

![image](https://cloud.githubusercontent.com/assets/4962816/22116568/e5f187fc-de96-11e6-84c0-7452835960ae.png)

![image](https://cloud.githubusercontent.com/assets/4962816/22116652/2c460dd6-de97-11e6-8046-df4a5b40811e.png)