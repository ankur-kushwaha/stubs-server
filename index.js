var express = require('express')
var router = express.Router()
var jsonfile = require('jsonfile');
var mkdirp = require('mkdirp');
var path = require('path');
var glob = require('glob');
var bodyParser = require('body-parser')

module.exports = function (app,contextPath="/stubs") {
    'use strict';

    // parse application/x-www-form-urlencoded
    router.use(bodyParser.urlencoded({
        extended: false
    }));

    // parse application/json
    router.use(bodyParser.json());

    router.use(contextPath, express.static(path.join(__dirname, 'stubs-ui')));

    router.get('/stubs/allStubs', function (req, res) {
        glob('**/*.json*', {
            cwd: 'stubs',
        }, function (er, files) {
            res.json(files.map(function (loc) {
                return {
                    name: path.basename(loc),
                    path: path.dirname(loc),
                    fullPath: loc
                };
            }));
        });
    });

    router.post('/stubs/saveData', function (req, res) {
        var file = 'stubs/' + req.body.path;
        var obj = req.body.data;
        var getDirName = require('path').dirname;
        mkdirp(getDirName(file), function (err) {
            if (err) return cb(err);
            jsonfile.writeFile(file, obj, {
                spaces: 2
            }, function (err) {
                console.error(err);
                res.json(err);
            });
        });
    });

    router.use(function (err, req, res, next) {
        res.status(404).send('');
    });

    app.use("/", router);

    app.use('/*', function (req, res) {
        var file = path.join(process.cwd() + '/stubs' + req.baseUrl + '.json');
        setTimeout(function () {
            res.sendFile(file);
        }, 500);
    });
}