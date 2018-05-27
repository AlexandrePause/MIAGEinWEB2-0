var typeParticipant = require('./TypeParticipant');
var userData = require('./User');

var listeEvt = [];

var sequenceId = 0;

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
			event.nbPart = event.listeParticipant.length;
			ret = event;
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

exports.eventComplet = function(id){
	var event = this.recupEvenement(id);
	var ret = true;
	if(event){
		if(event.listeParticipant.length >= event.nbPartMax)
			ret = true;
		else
			ret = false;
	}
	return ret;
}

exports.getEvenementPossibleUser = function(id){

	var user;
	var tabEvent = [];
	if(user = userData.recupUser(id)){
		var complet = this.eventComplet(id);
		listeEvt.forEach(function(element){
			if(element.idTypePart === user.idTypePart){
				element.complet = complet;
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
		console.log(user);
		var event = this.recupEvenement(idEvent);
		console.log(event);
		if(event.idTypePart === user.idTypePart 
			&& !this.eventComplet(idEvent)
			&& !event.listeParticipant.includes(idPart)){
			event.listeParticipant.push(idPart);
			return 1;
		}
	}
	return 0;
}

exports.participe = function (idEvent, idPart){
	var user;
	if(user = userData.recupUser(idPart)){
		var event = this.recupEvenement(idEvent);
		if(event.listeParticipant.includes(idPart)){
			return 1;
		}
	}
	return 0;
}
