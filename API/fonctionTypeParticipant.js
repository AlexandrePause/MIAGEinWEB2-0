var typeParticipant = require('./TypeParticipant');

module.exports = function (app) {

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



	//Recupere le dernier id ajouté pour les Type de participant
	app.get('/lastIdTypePart', function(req, res){
		
		res.send({"id" : typeParticipant.dernierId()});
		
	});

	//Retourne vrai si le type existe
	app.get('/typeExist/id=:id', function(req, res){
		var id = parseInt(req.params.id, 10);
		if(typeParticipant.typeExist(id) === 1)
			res.send({"existe" : true});
		else
			res.send({"existe" : false});
	});

	app.get('/allType', function(req, res){
		res.send(typeParticipant.getAllType());
	});
}