var users = require('./User');

module.exports = function (app) {
	app.get('/user/id=:id', function(req, res){
		
		//Recupere un user	
		var user = users.recupUser(req.params.id);
		if(!user)
			res.status(400).send("Le compte n'existe pas");
		else
			res.json(user);
	});

	//Creation d'un utilisateur normal
	app.post('/addUser', function(req, res){
		
		var mail = req.body.mail;
		var nom = req.body.nom;
		var prenom = req.body.prenom;
		var tel = req.body.tel;
		var idTypePart = req.body.idTypePart;

		if(users.creerUser(mail, nom, prenom, tel, idTypePart, -1)){
			res.status(200).send("Compte créé");;
		}
		else
			res.status(400).send("Le compte existe deja");
		
		
	});

	//Création d'un accompagnant
	app.post('/addAccomp', function(req, res){
		var mail = req.body.mail;
		var nom = req.body.nom;
		var prenom = req.body.prenom;
		var tel = req.body.tel;
		var idTypePart = req.body.idTypePart;
		var idAccompagnant = req.body.idAccompagnant;
		if(users.peutAjouterAcc(idAccompagnant)){
			if(users.creerUser(mail, nom, prenom, tel, idTypePart, idAccompagnant)){
				res.status(200).send("Compte accompagnant créé");;
			}
			else
				res.status(400).send("Le compte existe deja");
		}
		else
			res.status(400).send("L'utilisateur ne peut plus ajouter d'accompagnant");
		
	});


	app.delete('/user/id=:id', function(req,res){

		if(users.supprUser(req.params.id))
			res.status(200).send("User supprimé");
		else
			res.status(404).send("User non trouvé");
	});

	app.get('/userAccomp/id=:id', function(req, res){
		
		//Recupere un user	
		var user = users.getUserAcc(req.params.id);
		if(!user)
			res.status(400).send("Le compte n'existe pas");
		else
			res.json(user);
	});

	app.get('/peutAjouterAccomp/id=:id', function(req, res){
		
		//Recupere un user	
		var user = users.peutAjouterAcc(req.params.id);
		if(!user)
			res.status(200).send("false");
		else
			res.status(200).send("true");
	});
};


