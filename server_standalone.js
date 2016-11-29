var express = require('express');
var port = process.env.PORT || 3000;
var path = require('path');
var app = express();
var read = require('utils-fs-read-json5');
var mkdirp = require('mkdirp');
var bodyParser = require('body-parser')
const http2 = require('http2');
var fs=require('fs');

var propertiesReader = require('properties-reader');
var properties = propertiesReader('user.properties');
var glob=require('glob');

const options = {
    key: fs.readFileSync(__dirname + '/server.key'),
    cert:  fs.readFileSync(__dirname + '/server.crt'),
	  ca: fs.readFileSync(__dirname + '/server.csr')
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
    res.sendFile(__dirname + '/index.html');
});

app.get('/allStubs',function(req,res){
    glob('**/*.json*',{
        cwd :'SnapdealSellerFrontUI/local/stubs',
    },function(er,files){
        res.json(files.map(function(loc){
            return {
                name:path.basename(loc),
                path:path.dirname(loc),
                fullPath:loc
            };
        }));
    });
});
    var jsonfile = require('jsonfile')
app.post('/saveData',function(req,res){
	var file = 'SnapdealSellerFrontUI/local/stubs/'+req.body.path;
	var obj = req.body.data;
	/*fs.writeFile(file, obj, 'utf8', function (err) {
        console.error(err);
        res.json(err);
    });
	*/
	var getDirName = require('path').dirname;
	mkdirp(getDirName(file), function (err) {
		if (err) return cb(err);
		jsonfile.writeFile(file, obj,{
			spaces:2
		}, function (err) {
			console.error(err);
			res.json(err);
		});
	});
  
    
	
    //res.json("");
})


app.use('/*', function(req, res) {
    try {
        // var
        // json=require(path.normalize(__dirname+"/stubs/"+req.baseUrl.substring(1)));
        var data = read.sync(path.normalize(__dirname + "/stubs/" + req.baseUrl.substring(1)) + ".json5", 'utf8');
        if (data instanceof Error) {
            data = read.sync(path.normalize(__dirname + "/stubs/" + req.baseUrl.substring(1)) + ".json", 'utf8');
            if (data instanceof Error) {
                throw data;
            }
        }
		setTimeout(function(){
			res.json(data);
		},1000);
		
    } catch (e) {
        res.status(502).send('');
        console.log('status: 502','path: '+e.path);
    }
});


http2
  .createServer(options, app)
  .listen(port, (error) => {
    if (error) {
      console.error(error)
      return process.exit(1)
    } else {
      console.log('Listening on port.............: ' + port + '.')
    }
  })

  
//module.exports = app;