var typeParticipant = require('./TypeParticipant');
var listeEvt = {};

function Evenement(id, acro, nom, desc, datOuvr, datFerm, lieu, nbPartMax, idTypePart){
	this.id = id;
	this.acro = acro;
	this.nom = nom;
	this.desc = desc;
	this.datOuvr = datOuvr;
	this.datFerm = datFerm;
	this.lieu = lieu;
	this.nbPartMax = nbPartMax;
	this.idTypePart = idTypePart;
}

var creerEvt = function(id, acro, nom, desc, datOuvr, datFerm, lieu, nbPartMax, typePart){
	// s'il n'existe pas
	if (typeof listeEvt[id] === 'undefined') {
		//Si le type existe
		if(typeParticipant.recupTypePart(typePart)){
			// on le cree
			listeEvt[id] = new Evenement(id, acro, nom, desc, datOuvr, datFerm, lieu, nbPartMax, typePart);
			return 1;
		}
    }
    return 0;
}

var recupEvenement = function(id) {
	// s'il n'existe pas
	if (typeof listeEvt[id] === 'undefined')
		return {};
    return listeEvt[id];
}

var supprEvenement = function(id){
	if (typeof listeEvt[id] === 'undefined') 
		return 0;
	listeEvt.splice(id, 1);
	return 1;
}

var modifEvenement = function(id, acro, nom, desc, datOuvr, datFerm, lieu, nbPartMax, typePart){
	if (typeof listeEvt[id] === 'undefined') 
		return 0;
	//Si le type existe on le modifie
	else{ 
		if(typeof acro !== 'undefined')
			listeEvt[id].acro = acro;
		if(typeof nom !== 'undefined')
			listeEvt[id].nom = nom;
		if(typeof desc !== 'undefined')
			listeEvt[id].desc = desc;
		if(typeof datOuvr !== 'undefined')
			listeEvt[id].datOuvr = datOuvr;
		if(typeof datFerm !== 'undefined')
			listeEvt[id].datFerm = datFerm;
		if(typeof lieu !== 'undefined')
			listeEvt[id].lieu = lieu;
		if(typeof nbPartMax !== 'undefined')
			listeEvt[id].nbPartMax = nbPartMax;
		if(typeof typePart !== 'undefined' && typeParticipant.recupTypePart(typePart))
			listeEvt[id].typePart = typePart;
		return 1;
	}
}

exports.creerEvt = creerEvt;
exports.recupEvenement = recupEvenement;
exports.supprEvenement = supprEvenement;
exports.modifEvenement = modifEvenement;