var restify = require('restify');
var propertiesReader = require('properties-reader');
var properties = propertiesReader('user.properties');
var path = require('path');	
var server = restify.createServer();
var jsonfile = require('jsonfile')

server.get('/', restify.serveStatic({
  directory: __dirname + "/stubs/",
  file: 'index.html'
}));

server.get(/\/static\/sfui\/?.*/, restify.serveStatic({
  directory: path.join(properties.get('snapdeal.sellerfront.sfui.home'),'../../'),
  default: 'index.html'
}));

function respond(req,res){


var file = __dirname + "/stubs/" +req.path()+".json";

	 try {
		 
		jsonfile.readFile(file, function(err, obj) {
			setTimeout(function(){
					res.send(obj);
			},1000);
		})
    } catch (e) {
		console.log(e);
        res.send(502);
        console.log('status: 502','path: '+req.url);
    }
}

server.get(/\/?.*/, respond);
server.post(/\/?.*/, respond);

server.listen(9001, function() {
  console.log('%s listening at %s', server.name, server.url);
});