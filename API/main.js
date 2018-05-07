var express = require('express');
var bodyParser = require('body-parser');
var evenement = require('./Evenement');
var typeParticipant = require('./TypeParticipant');

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.listen(3000, function () {
	console.log('Fonctionne') ;
});

//Creer un evenement
app.post('/evenement', function(req, res){
	
	var id = parseInt(req.body.id, 10);
	var acro = req.body.acro;
	var nom = req.body.nom;
	var desc = req.body.desc;
	var datOuvr = req.body.datOuvr;
	var datFerm = req.body.datFerm;
	var lieu = req.body.lieu;
	var nbPartMax = req.body.nbPartMax;
	var typePart = req.body.typePart;
	
	if(!isNaN(id)){
		if(evenement.creerEvt(id, acro, nom, desc, datOuvr, datFerm, lieu, nbPartMax, typePart))
			res.status(201).send("Votre evenement a été ajouté.");
		else
			res.status(409).send("L'id existe deja ou le type de particpant n'existe pas. Votre evenement n'a pas été ajouté.");
	}
	else
		res.status(400).send("L'id passé en parametre n'est pas conforme. Votre evenement n'a pas été ajouté.");
});


//Recupere un evenement
app.get('/evenement/id=:id', function(req, res){
	
	var id = parseInt(req.params.id, 10);
	if(!isNaN(id))
		res.json(evenement.recupEvenement(req.params.id));
	else
		res.status(400).send("L'id passé en parametre n'est pas conforme.");
	
});

//Modifier un evenement
app.put('/evenement/id=:id', function(req, res){

	var id = parseInt(req.params.id, 10);
	var acro = req.body.acro;
	var nom = req.body.nom;
	var desc = req.body.desc;
	var datOuvr = req.body.datOuvr;
	var datFerm = req.body.datFerm;
	var lieu = req.body.lieu;
	var nbPartMax = req.body.nbPartMax;
	var typePart = req.body.typePart;
	
	if(!isNaN(id)){
		if(evenement.modifEvenement(id, acro, nom, desc, datOuvr, datFerm, lieu, nbPartMax, typePart))
			res.status(200).send("Evenement modifié");
		else
			res.status(404).send("Evenement non trouvé");
	}
	else
		res.status(400).send("L'id passé en parametre n'est pas conforme.");
});

app.delete('/evenement/id=:id', function(req,res){

	var id = parseInt(req.params.id, 10);
	if(!isNaN(id)){
		if(evenement.supprEvenement(id))
			res.status(200).send("Evenement supprimer");
		else
			res.status(404).send("Evenement non trouvé");
	}
	else
		res.status(400).send("L'id passé en parametre n'est pas conforme.");
});





//Creer un type de participant
app.post('/typePart', function(req, res){
	
	var id = parseInt(req.body.id, 10);
	var denom = req.body.denom;
	var nbMax = req.body.nbMax;
	
	if(!isNaN(id)){
		if(typeParticipant.creerTypePart(id, denom, nbMax))
			res.status(201).send("Votre type de participant a été ajouté.");
		else
			res.status(409).send("L'id existe deja. Le type de participant n'a pas été ajouté.");
	} 
	else
		res.status(400).send("L'id passé en parametre n'est pas conforme. Le type de participant n'a pas été ajouté.");
});


//Recupere un evenement
app.get('/typePart/id=:id', function(req, res){
	
	var id = parseInt(req.params.id, 10);
	if(!isNaN(id))
		res.json(typeParticipant.recupTypePart(req.params.id));
	else
		res.status(400).send("L'id passé en parametre n'est pas conforme.");
	
});

//Modifier un evenement
app.put('/typePart/id=:id', function(req, res){

	var id = parseInt(req.params.id, 10);
	var denom = req.body.denom;
	var nbMax = req.body.nbMax;
	
	if(!isNaN(id)){
		if(typeParticipant.modifTypePart(id, denom, nbMax))
			res.status(200).send("Type de participant modifié");
		else
			res.status(404).send("Type de participant non trouvé");
	}
	else
		res.status(400).send("L'id passé en parametre n'est pas conforme.");

});

app.delete('/typePart/id=:id', function(req,res){

	var id = parseInt(req.params.id, 10);
	if(!isNaN(id)){
		if(typeParticipant.supprTypePart(id))
			res.status(200).send("Type de participant supprimé");
		else
			res.status(404).send("Type de participant non trouvé");
	}
	else
		res.status(400).send("L'id passé en parametre n'est pas conforme.");
});