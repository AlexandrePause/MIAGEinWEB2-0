var typeParticipant = require('./TypeParticipant');
var userData = require('./User');

var listeEvt = [];

var sequenceId = 0;

listeEvt.push(new Evenement("0", "EVT1", "Evenement 1", "Premier evenemnt", "10/10/2017", "10/11/2017", "Lycée st Pierre", "30", "1"));

listeEvt.push(new Evenement("1", "EVT2", "Evenement 2", "Second evenemnt", "02/05/2018", "10/07/2018", "Salle Robert Piteu", "50", "1"));

var sequenceId = 2;

function existe(id){
	listeEvt.forEach(function(event, index){
		if(event.id === id)
			return index;
	});
	return false;
}


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
	this.listeParticipant = [];
}

exports.creerEvt = function(acro, nom, desc, datOuvr, datFerm, lieu, nbPartMax, typePart){
	
	//Si le type existe
	if(typeParticipant.recupTypePart(typePart)){
		// on le cree
		listeEvt.push(new Evenement(sequenceId.toString(), acro, nom, desc, datOuvr, datFerm, lieu, nbPartMax, typePart));
		sequenceId++;
		return 1;
	}

	return 0;
}

exports.recupEvenement = function(id) {
	// s'il n'existe pas
	var ret = false;
	listeEvt.forEach(function(event, index){

		if(event.id === id){
			ret =  event;
		}
	});
	return ret;
}

exports.supprEvenement = function(id){
	var idTab;

	if (idTab = existe(id)) 
		return 0;
	delete listeEvt[idTab];
	return 1;
}

exports.modifEvenement = function(id, acro, nom, desc, datOuvr, datFerm, lieu, nbPartMax, typePart){
	if (existe(id)) 
		return 0;
	//Si le type existe on le modifie
	else{ 
		if(typeof acro !== 'undefined')
			this.recupEvenement(id).acro = acro;
		if(typeof nom !== 'undefined')
			this.recupEvenement(id).nom = nom;
		if(typeof desc !== 'undefined')
			this.recupEvenement(id).desc = desc;
		if(typeof datOuvr !== 'undefined')
			this.recupEvenement(id).datOuvr = datOuvr;
		if(typeof datFerm !== 'undefined')
			this.recupEvenement(id).datFerm = datFerm;
		if(typeof lieu !== 'undefined')
			this.recupEvenement(id).lieu = lieu;
		if(typeof nbPartMax !== 'undefined')
			this.recupEvenement(id).nbPartMax = nbPartMax;
		if(typeof typePart !== 'undefined' && typeParticipant.recupTypePart(typePart))
			this.recupEvenement(id).typePart = typePart;
		return 1;
	}
}

exports.getAllEvenement = function(){
	return listeEvt;
}

exports.getEvenementPossibleUser = function(id){
	var user;
	var tabEvent = [];
	if(user = userData.recupUser(id)){

		listeEvt.forEach(function(element){
			if(element.idTypePart === user.idTypePart){

				tabEvent.push(element);

			}
		});
		return tabEvent;
	}
	else
		return [];
}

exports.ajouterParticipant = function(idEvent, idPart){
	var user;
	if(user = userData.recupUser(idPart)){
		if(this.recupEvenement(idEvent).idTypePart === user.idTypePart){
			this.recupEvenement(idEvent).listeParticipant.push(idPart);
			return 1;
		}
	}
	return 0;
}
