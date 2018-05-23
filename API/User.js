var listeUser = {};

function User(mail, nom, prenom, tel, idTypePart, idAccompagnant){
	this.mail = mail;
	this.nom = nom;
	this.prenom = prenom;
	this.tel = tel;
	this.idTypePart = idTypePart;
	this.idAccompagnant = idAccompagnant;
}

var creerUser = function(mail, nom, prenom, tel, idTypePart, idAccompagnant){
	// s'il n'existe pas
	if (typeof listeUser[mail] === 'undefined') {
		// on le cree
		listeUser[mail] = new User(mail, nom, prenom, tel, idTypePart, idAccompagnant);
		return 1;
    }
    return 0;
}

var recupUser = function(mail) {
	// s'il n'existe pas
	if (typeof listeUser[mail] === 'undefined')
		return 0;
    return listeUser[mail];
}

exports.creerUser = creerUser;
exports.recupUser = recupUser;