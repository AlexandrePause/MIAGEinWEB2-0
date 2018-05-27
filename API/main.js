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





//*** TEST ****//

var typeParticipant = require('./TypeParticipant');
var evenement = require('./Evenement');
var users = require('./User');

typeParticipant.creerTypePart("Etudiant", 2);

typeParticipant.creerTypePart("Professeur", 3);

evenement.creerEvt("EVT1", "Evenement 1", "Premier evenemnt", "10/10/2017", "10/11/2017", "Lycée st Pierre", "30", "0");

evenement.creerEvt("EVT2", "Evenement 2", "Second evenemnt", "02/05/2018", "10/07/2018", "Salle Robert Piteu", "50", "0");


users.creerUser("yanekcolonge@hotmail.fr", "Colonge", "Yanek", "06", "0", "-1");
users.creerUser("jeanbon@hotmail.fr", "Bon", "Jean", "06", "0", "-1");
users.creerUser("guilhemquintoch@hotmail.fr", "Quintoch", "Guilhem", "06", "0", "-1");
users.creerUser("alexpausey@hotmail.fr", "Pausey", "Alex", "06", "0", "yanekcolonge@hotmail.fr");

evenement.ajouterParticipant("0", "alexpausey@hotmail.fr");