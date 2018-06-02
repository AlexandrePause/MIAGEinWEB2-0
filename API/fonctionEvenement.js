var evenement = require('./Evenement');


module.exports = function (app) {
	//Creer un evenement
	app.post('/evenement', function(req, res){
		
		var acro = req.body.acro;
		var nom = req.body.nom;
		var desc = req.body.desc;
		var datOuvr = req.body.datOuvr;
		var datFerm = req.body.datFerm;
		var lieu = req.body.lieu;
		var nbPartMax = req.body.nbPartMax;
		var typePart = req.body.idTypePart;
		var tab = [];
		typePart.forEach(function(element, index){
			if(element != null){
				tab.push(index.toString());
			}
		})
		if(evenement.creerEvt(acro, nom, desc, datOuvr, datFerm, lieu, nbPartMax, tab)){
			res.status(201).send("Votre evenement a été ajouté.");
		}
		else
			res.status(409).send("L'id existe deja ou le type de participant n'existe pas. Votre evenement n'a pas été ajouté.");
	});


	//Recupere un evenement
	app.get('/evenement/id=:id', function(req, res){
		res.json(evenement.recupEvenement(req.params.id));
		
	});

	//Raz du type d'evt
	app.get('/razType/id=:id', function(req, res){
		res.json(evenement.razTypeEvt(req.params.id));
	});


	//Modifier un evenement
	app.put('/evenement/id=:id', function(req, res){

		var id = req.params.id;
		var acro = req.body.acro;
		var nom = req.body.nom;
		var desc = req.body.desc;
		var datOuvr = req.body.datOuvr;
		var datFerm = req.body.datFerm;
		var lieu = req.body.lieu;
		var nbPartMax = req.body.nbPartMax;
		var idTypePart = req.body.idTypePart;
		
		
		if(evenement.modifEvenement(id, acro, nom, desc, datOuvr, datFerm, lieu, nbPartMax, idTypePart))
			res.status(200).send("Evenement modifié");
		else
			res.status(404).send("Evenement non trouvé");
	});

	app.delete('/evenement/id=:id', function(req,res){

		var id = req.params.id;
		if(evenement.supprEvenement(id))
			res.status(200).send("Evenement supprimer");
		else
			res.status(404).send("Evenement non trouvé");
	});

	app.delete('/evenementPart/idEvent=:idEvent&idPart=:idPart', function(req,res){

		var idEvent = req.params.idEvent;
		var idPart = req.params.idPart;
		if(evenement.supprimerParticipant(idEvent,idPart))
			res.status(200).send("Evenement supprimer");
		else
			res.status(404).send("Evenement non trouvé");
	});

	//Recupere le dernier id ajouté pour les evenements
	app.get('/lastIdEvent', function(req, res){
		
		res.send({"id" : evenement.dernierId()});
		
	});

	app.get('/allEvenement', function(req, res){
		res.send(evenement.getAllEvenement());
	});

	app.get('/allEvenementStats', function(req, res){
		res.send(evenement.getAllEvenementStats());
	});
	


	app.get('/EvenementPossibleUser/id=:id', function(req, res){
		res.send(evenement.getEvenementPossibleUser(req.params.id));
	});

	app.post('/inscriptionUser', function(req, res){
		var idUser = req.body.idUser;
		var idEvent = req.body.idEvent;
		var reussi = evenement.ajouterParticipant(idEvent, idUser);
		console.log(reussi);
		if(reussi)
			res.status(200).send();
		else
			res.status(400).send();
	});

	app.get('/participe/idEvent=:idEvent&idUser=:idUser', function(req, res){
		res.send(evenement.participe(req.params.idEvent,req.params.idUser).toString());

	});

	app.get('/getParticipantEvt/id=:id', function(req, res){
		res.json(evenement.getParticipantEvt(req.params.id));
	});
};
