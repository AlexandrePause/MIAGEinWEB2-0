var typeParticipant = require('./TypeParticipant');


var listeUser = [];

function User(mail, nom, prenom, tel, idTypePart, idAccompagnant, password){
	this.mail = mail;
	this.nom = nom;
	this.prenom = prenom;
	this.tel = tel;
	this.idTypePart = idTypePart;
	this.idAccompagnant = idAccompagnant;
	this.password= password;
}

exports.userExiste = function(mail){
	var ret = false;

	listeUser.forEach(function(user, index){
		if(user.mail === mail){
			ret = index;
		}
	});
	return ret;
}

exports.getAuth = function(mail, password){
	var ret = false;
	listeUser.forEach(function(user, index){
		if(user.mail === mail && user.password === password)
			ret = index;

	});
	return ret;
}

exports.creerUser = function(mail, nom, prenom, tel, idTypePart, idAccompagnant, password){
	// s'il n'existe pas
	if (!this.userExiste(mail)) {
		// on le cree
		listeUser.push(new User(mail, nom, prenom, tel, idTypePart, idAccompagnant, password));
		return 1;
    }
    return 0;
}

exports.recupUser = function(mail) {
	// s'il n'existe pas
	var idTab;
	idTab = this.userExiste(mail);
	if (idTab !== false){
		return listeUser[idTab];
	}
	return {};
}

exports.supprUser = function(id){;
	var idTab;
	if (this.userExiste(id)) 
		return 0;
	delete listeUser[idTab];
	return 1;
}

exports.peutAjouterAcc = function(id){
	var user = this.recupUser(id);
	var typeCompte = typeParticipant.recupTypePart(user.idTypePart);
	if(typeCompte.maxAcc > this.getUserAcc(id).length)
		return true;
	return false;
}

exports.getUserAcc = function(mail){
	var ret = [];
	listeUser.forEach(function(user, index){
		
		if(user.idAccompagnant === mail)
			ret.push(user);
	});
	return ret;
}

this.creerUser("pourEmpecherLeFalse", "Colongerrrr", "Yanek", "06", "0", "-1", "user");
this.creerUser("yanekcolonge@hotmail.fr", "Colonge", "Yanek", "06", "0", "-1", "user");
this.creerUser("jeanbon@hotmail.fr", "Bon", "Jean", "06", "0", "-1", "user");
this.creerUser("guilhemquintoch@hotmail.fr", "Quintoch", "Guilhem", "06", "0", "-1", "user");
this.creerUser("alexpausey@hotmail.fr", "Pausey", "Alex", "06", "0", "yanekcolonge@hotmail.fr", "user");
this.creerUser("test1@hotmail.fr", "MIAGE", "master", "06", "1", "-1", "user");
this.creerUser("test2@hotmail.fr", "Marc", "Lavoine", "06", "1", "-1", "user");
this.creerUser("test3@hotmail.fr", "Colonger", "YaneckLaConlonge", "06", "0", "-1", "user");
this.creerUser("test4@hotmail.fr", "Lavoine", "Alex", "06", "0", "-1", "user");
this.creerUser("admin", "Administrateur", "du Service", "06", "A", "-1", "admin");