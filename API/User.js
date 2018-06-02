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
	var idTab;
	idTab = this.userExiste(mail);
	if (idTab !== false){
		return listeUser[idTab];
	}
	return {};
}

exports.recupTouteInfosUser = function(mail) {
	var idTab;
	var user  = {};
	idTab = this.userExiste(mail);
	if (idTab !== false){
		user = listeUser[idTab];
		user.idTypePartLib = typeParticipant.recupTypePart(user.idTypePart).denom;
		user.listeAcc = this.getUserAcc(mail);

	}
	return user;
}

exports.supprUser = function(id){;
	var idTab = this.userExiste(id);
	if (!idTab) 
		return 0;
	listeUser.splice(idTab, 1);
	return 1;
}

exports.peutAjouterAcc = function(id){
	var ret ={};
	ret["peutAjouter"] = false;
	var user = this.recupUser(id);
	var typeCompte = typeParticipant.recupTypePart(user.idTypePart);
	if(typeCompte.maxAcc > this.getUserAcc(id).length){
		ret["peutAjouter"] = true;
	}
	ret["idTypePart"] = user.idTypePart;
	return ret;
}

exports.getUserAcc = function(mail){
	var ret = [];
	listeUser.forEach(function(user, index){
		
		if(user.idAccompagnant === mail)
			ret.push(user);
	});
	return ret;
}
