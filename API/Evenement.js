var typeParticipant = require('./TypeParticipant');
var listeEvt = {};

listeEvt[1] = {
	"id" : 1,
	"acro" : "EVT1",
	"nom" : "Evenement 1",
	"desc" : "Premier evenemnt",
	"datOuvr" : "10/10/2017",
	"datFerm" : "10/11/2017",
	"lieu" : "Lycée st Pierre",
	"nbPartMax" : "30",
	"typePart" : "1"
};

listeEvt[10] = {
	"id" : 10,
	"acro" : "EVT2",
	"nom" : "Evenement 2",
	"desc" : "Second evenemnt",
	"datOuvr" : "02/05/2018",
	"datFerm" : "10/07/2018",
	"lieu" : "Salle Robert Piteu",
	"nbPartMax" : "50",
	"typePart" : "10"
};

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

var dernierId = function(){
	var ancId = 0;
	for(var id in listeEvt){
		if(id > ancId){
			ancId = id;
		}
	}
	return ancId
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
	delete listeEvt[id];
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

var getAllEvenement = function(){
	return listeEvt;
}

exports.creerEvt = creerEvt;
exports.recupEvenement = recupEvenement;
exports.supprEvenement = supprEvenement;
exports.modifEvenement = modifEvenement;
exports.dernierId = dernierId;
exports.getAllEvenement = getAllEvenement;