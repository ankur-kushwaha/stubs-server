var express = require('express')
var router = express.Router()
var jsonfile = require('jsonfile')

//app.use(express.static(path.join(__dirname,'/SnapdealSellerFrontUI/local/stubs-ui/')));
router.use('/', express.static('stubs-ui'));

router.get('/allStubs', function(req, res) {
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
    var file = path.join('stubs', req.baseUrl + '.json');
    setTimeout(function(){
        res.sendFile(file);
    },500);
});

router.use(function(err, req, res, next) {
    res.status(502).send('');
});

module.exports = router