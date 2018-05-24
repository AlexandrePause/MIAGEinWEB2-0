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

		if(users.creerUser(mail, nom, prenom, idTypePart, idAccompagnant)){
			res.status(200).send("Compte accompagnant créé");;
		}
		else
			res.status(400).send("Le compte existe deja");
	});
};


