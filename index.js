var express = require('express')
var router = express.Router()
var jsonfile = require('jsonfile');
var mkdirp = require('mkdirp');
var path = require('path');
var glob=require('glob');

router.use('/', express.static(path.join(__dirname, 'stubs-ui')));

router.get('/allStubs', function(req, res) {
    console.log('all stubs');
    glob('**/*.json*', {
        cwd: 'stubs',
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

router.post('/saveData', function(req, res) {
    var file = 'stubs/' + req.body.path;
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

router.use('/*', function(req, res) {
    console.log('getting ' + req.baseUrl);
    var file = path.join(process.cwd()+req.baseUrl + '.json');
    setTimeout(function(){
        console.log('return file',file);
        res.sendFile(file);
    },500);
});

router.use(function(err, req, res, next) {
    console.log(err);
    res.status(502).send('');
});

module.exports = router;