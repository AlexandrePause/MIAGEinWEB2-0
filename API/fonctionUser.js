var users = require('./User');

module.exports = function (app) {
	app.get('/user/id=:id', function(req, res){
		
		//Recupere un user
		var id = parseInt(req.params.id, 10);
		if(!isNaN(id))
			res.json(users.recupUser(req.params.id));
		else
			res.status(400).send("L'id passé en parametre n'est pas conforme.");
		
	});
};


