var listeUser = [];

listeUser.push(new User("0", "a@h.fr", "San", "SanDeox", "07", "1", "1"));

function User(id, mail, nom, prenom, tel, idTypePart, idAccompagnant){
	this.id = id;
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
			ret = user.id;
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