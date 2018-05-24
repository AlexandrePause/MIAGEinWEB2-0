var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.listen(3000, function () {
	console.log('Fonctionne') ;
});

//permettre le cross-domain
app.options('/*', function(req, res){
	res.header('Access-Control-Allow-Origin', '*');
  	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
 	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	res.sendStatus(200);
});
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

require('./fonctionUser')(app);
require('./fonctionEvenement')(app);
require('./fonctionTypeParticipant')(app);
