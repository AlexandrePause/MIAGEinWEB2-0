var listeUser = {};

listeUser[1] = new User(1,"Colonge","Yanek", "yanekcolonge@hotmail.fr", "0", 1, -1);

function User(id, nom, prenom, mail, tel, idTypePart, idAccompagnant){
	this.id = id;
	this.prenom = prenom;
	this.mail = mail;
	this.tel = tel;
	this.idTypePart = idTypePart;
	this.idAccompagnant = idAccompagnant;
}

var creerUser = function(id, nom, prenom, mail, tel, idTypePart, idAccompagnant){
	// s'il n'existe pas
	if (typeof listeUser[id] === 'undefined') {
		// on le cree
		listeUser[id] = new User(id, nom, prenom, mail, tel, idTypePart, idAccompagnant);
		return 1;
    }
    return 0;
}

var recupUser = function(id) {
	// s'il n'existe pas
	if (typeof listeUser[id] === 'undefined')
		return 0;
    return listeUser[id];
}

exports.creerUser = creerUser;
exports.recupUser = recupUser;