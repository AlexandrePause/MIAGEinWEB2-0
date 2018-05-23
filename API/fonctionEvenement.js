var evenement = require('./Evenement');


module.exports = function (app) {
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

	//Recupere le dernier id ajouté pour les evenements
	app.get('/lastIdEvent', function(req, res){
		
		res.send({"id" : evenement.dernierId()});
		
	});

	app.get('/allEvenement', function(req, res){
		res.send(evenement.getAllEvenement());
	});
};
