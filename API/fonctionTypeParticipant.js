var typeParticipant = require('./TypeParticipant');

module.exports = function (app) {

	//Creer un type de participant
	app.post('/typePart', function(req, res){
		
		var denom = req.body.denom;
		var nbMax = req.body.nbMax;
		
			if(typeParticipant.creerTypePart(denom, nbMax))
				res.status(201).send("Votre type de participant a été ajouté.");
			else
				res.status(409).send("L'id existe deja. Le type de participant n'a pas été ajouté.");
	});


	//Recupere un evenement
	app.get('/typePart/id=:id', function(req, res){
	
		res.json(typeParticipant.recupTypePart(req.params.id));
		
	});

	//Modifier un evenement
	app.put('/typePart/id=:id', function(req, res){

		var id = req.params.id;
		var denom = req.body.denom;
		var nbMax = req.body.nbMax;
		if(typeParticipant.modifTypePart(id, denom, nbMax))
			res.status(200).send("Type de participant modifié");
		else
			res.status(404).send("Type de participant non trouvé");
	});

	app.delete('/typePart/id=:id', function(req,res){

		if(typeParticipant.supprTypePart(id))
			res.status(200).send("Type de participant supprimé");
		else
			res.status(404).send("Type de participant non trouvé");
	});


	//Retourne vrai si le type existe
	app.get('/typeExist/id=:id', function(req, res){
		var id = req.params.id;
		if(typeParticipant.typeExist(id) !== false)
			res.send({"existe" : true});
		else
			res.send({"existe" : false});
	});

	app.get('/allType', function(req, res){
		res.send(typeParticipant.getAllType());
	});
}