var listeUser = [];

function User(mail, nom, prenom, tel, idTypePart, idAccompagnant){
	this.mail = mail;
	this.nom = nom;
	this.prenom = prenom;
	this.tel = tel;
	this.idTypePart = idTypePart;
	this.idAccompagnant = idAccompagnant;
}

exports.userExiste = function(mail){
	var ret = false;
	listeUser.forEach(function(user, index){
		
		if(user.mail === mail)
			ret = index;
	});
	return ret;
}

exports.creerUser = function(mail, nom, prenom, tel, idTypePart, idAccompagnant){
	// s'il n'existe pas
	if (!this.userExiste(mail)) {
		// on le cree
		listeUser.push(new User(mail, nom, prenom, tel, idTypePart, idAccompagnant));
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


this.creerUser("yanekcolonge@hotmail.fr", "Colonge", "Yanek", "06", "0", "-1");