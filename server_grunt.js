//'use strict';

var express = require('express');
var path = require('path');
var app = express();
var mkdirp = require('mkdirp');
var bodyParser = require('body-parser')
var fs = require('fs');

var propertiesReader = require('properties-reader');
var properties = propertiesReader('user.properties');
var glob = require('glob');

const options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert: fs.readFileSync(__dirname + '/server.crt')
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//app.use(express.static(path.join(__dirname,'/SnapdealSellerFrontUI/local/stubs-ui/')));
app.use('/stubs', express.static('SnapdealSellerFrontUI/local/stubs-ui'));
var publicDir = path.join(properties.get('snapdeal.sellerfront.sfui.home'), '../..');


app.use(express.static(publicDir));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/stubs/index.html');
});

app.get('/allStubs', function(req, res) {
    glob('**/*.json*', {
        cwd: 'SnapdealSellerFrontUI/local/stubs',
    }, function(er, files) {
        res.json(files.map(function(loc) {
            return {
                name: path.basename(loc),
                path: path.dirname(loc),
                fullPath: loc
            };
        }));
    });
});
var jsonfile = require('jsonfile')
app.post('/saveData', function(req, res) {
    var file = 'SnapdealSellerFrontUI/local/stubs/' + req.body.path;
    var obj = req.body.data;
    var getDirName = require('path').dirname;
    mkdirp(getDirName(file), function(err) {
        if (err) return cb(err);
        jsonfile.writeFile(file, obj, {
            spaces: 2
        }, function(err) {
            console.error(err);
            res.json(err);
        });
    });
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
