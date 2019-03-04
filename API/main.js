var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use('/', express.static('public'));

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
typeParticipant.creerTypePart("Diplômé", 3);
typeParticipant.creerTypePart("Professeur", 6);
typeParticipant.creerTypePart("Professionnel", 5);
typeParticipant.creerTypePart("Administratif", 8);

var tab = [];
tab.push("0");tab.push("1");tab.push("2");tab.push("3");tab.push("4");
evenement.creerEvt("AL3C2019", "Forum AL3C 2019", "Le forum de l'AL3c est ouvert !", "10/10/2017", "10/11/2017", "UT3 PAUL SABATIER", "15", tab);
tab = [];
tab.push("0");tab.push("1");tab.push("3");
evenement.creerEvt("EVT2", "Evenement 2", "Second evenemnt", "02/05/2018", "10/07/2018", "Salle Robert Piteu", "50", tab);
tab = [];
tab.push("0");tab.push("3");
evenement.creerEvt("EVT3", "Evenement 3", "Troisieme evenemnt", "08/05/2018", "10/07/2018", "Salle Robert Piteu", "10", tab);
tab = [];
tab.push("2");tab.push("3");
evenement.creerEvt("EVT4", "Evenement 4", "Quatrieme evenemnt", "02/05/2018", "10/08/2018", "Salle à définir", "23", tab);
tab = [];
tab.push("0");tab.push("1");tab.push("3");
evenement.creerEvt("EVT5", "Evenement Magique", "Q evenemnt", "08/05/2018", "10/07/2018", "Salle à choisir", "50", tab);
tab = [];
tab.push("2");
evenement.creerEvt("EVT PROF 6", "Apprendre", "S evenemnt", "02/05/2018", "10/07/2018", "Salle à choisir", "2", tab);
tab = [];
tab.push("2");
evenement.creerEvt("EVT2 PROF 6", "Comprendre", "Trentieme evenemnt", "02/05/2018", "10/07/2018", "Salle à choisir", "5", tab);
tab = [];


users.creerUser("pourEmpecherLeFalse", "Colongerrrr", "Yanek", "06", "0", "-1", "user");
users.creerUser("yanekcolonge@hotmail.fr", "Colonge", "Yanek", "06", "1", "-1", "user");
users.creerUser("jeanbon@hotmail.fr", "Bon", "Jean", "06", "2", "-1", "user");
users.creerUser("guilhemquintoch@hotmail.fr", "Quintoch", "Guilhem", "06", "0", "-1", "user");
users.creerUser("alexpausey@hotmail.fr", "Pausey", "Alex", "06", "3", "yanekcolonge@hotmail.fr", "user");
users.creerUser("test1@hotmail.fr", "MIAGE", "master", "06", "2", "-1", "user");
users.creerUser("test2@hotmail.fr", "Marc", "Lavoine", "06", "2", "-1", "user");
users.creerUser("test3@hotmail.fr", "Colonger", "YaneckLaConlonge", "06", "0", "-1", "user");
users.creerUser("test4@hotmail.fr", "Lavoine", "Alex", "06", "0", "-1", "user");
users.creerUser("admin", "Administrateur", "du Service", "06", "A", "-1", "admin");

evenement.ajouterParticipant("0", "alexpausey@hotmail.fr");
evenement.ajouterParticipant("0", "test3@hotmail.fr");
evenement.ajouterParticipant("0", "test4@hotmail.fr");
evenement.ajouterParticipant("0", "jeanbon@hotmail.fr");
evenement.ajouterParticipant("0", "guilhemquintoch@hotmail.fr");
evenement.ajouterParticipant("0", "yanekcolonge@hotmail.fr");
evenement.ajouterParticipant("3", "test2@hotmail.fr");
evenement.ajouterParticipant("4", "test1@hotmail.fr");
evenement.ajouterParticipant("4", "test2@hotmail.fr");
evenement.ajouterParticipant("1", "test4@hotmail.fr");
evenement.ajouterParticipant("1", "test3@hotmail.fr");
evenement.ajouterParticipant("1", "guilhemquintoch@hotmail.fr");
evenement.ajouterParticipant("1", "alexpausey@hotmail.fr");
evenement.ajouterParticipant("2", "guilhemquintoch@hotmail.fr");
evenement.ajouterParticipant("2", "alexpausey@hotmail.fr");
evenement.ajouterParticipant("5", "test2@hotmail.fr");
evenement.ajouterParticipant("5", "test1@hotmail.fr");
evenement.ajouterParticipant("6", "test1@hotmail.fr");