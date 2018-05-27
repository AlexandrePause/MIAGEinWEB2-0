var typeParticipant = require('./TypeParticipant');
var userData = require('./User');

var listeEvt = [];

var sequenceId = 0;

var onlyOne = 0;

remplirEvt();

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

exports.getAllParticipantEvt = function(id){
	var nbParti = 0;

	listeEvt.forEach(function(event, index){
		if(event.idTypePart == id){
			nbParti += event.listeParticipant.length;
		}
	});
	return nbParti;
}

exports.getAllEvtType = function(id){
	var nbParti = 0;

	listeEvt.forEach(function(event, index){
		if(event.idTypePart == id){
			nbParti ++;
		}
	});
	return nbParti;
}

exports.getMoyenneParticipant = function(){
	var tab = [];
	var self = this;

	var listeTyp = typeParticipant.getAllType();
	listeTyp.forEach(function(event, index){
		var nbParti = self.getAllParticipantEvt(event.id);
		var nbType = self.getAllEvtType(event.id);
		var nbMoyPartEvt = {nom: event.denom, moyenne: (nbParti/nbType)};
		tab[event.id] = nbMoyPartEvt;
	});

	return tab;
}
exports.getAllEvenementStats = function(){
	var listeAllEvt = [];
	var nbEvt = listeEvt.length;
	var nbMoyenEvt = this.getMoyenneParticipant();
	
	
	var stats = {NbTotEvt: nbEvt, nbMoy:nbMoyenEvt};
	listeAllEvt[0] = stats;
	return listeAllEvt;
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
				var dateNow = new Date();
				var date = new Date(element.datFerm);
				if(dateNow<date){
					element.complet = complet;
					tabEvent.push(element);
				}	
			}
		});
		return tabEvent;
	}
	else
		return [];
}

exports.isIncluded = function(listeParticipant, idPart){
	var bool = false;

	if(listeParticipant[0] === idPart ){
		bool = true;
	}
	else{
		listeParticipant.forEach(function(element){
			if(element === idPart){
				bool = true;
			}
	});
	}
	return bool;
}

exports.ajouterParticipant = function(idEvent, idPart){
	var user;
	if(user = userData.recupUser(idPart)){

		var event = this.recupEvenement(idEvent);

		if(event.idTypePart === user.idTypePart 
			&& !this.eventComplet(idEvent)
			&& !this.isIncluded(event.listeParticipant, idPart)){
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

		if(event.nbPart === "0"){
			return 0;
		}
		else{
			if(this.isIncluded(event.listeParticipant, idPart)){
			return 1;
			}
		}
	}
	return 0;
}



function remplirEvt(){
	listeEvt.push(new Evenement(sequenceId.toString(), "EVT"+sequenceId.toString(), "Evenement "+sequenceId.toString(), "Premier evenemnt", "10/10/2017", "10/11/2017", "Lycée st Pierre", "30", "0"));
	sequenceId++;
	listeEvt.push(new Evenement(sequenceId.toString(), "EVT"+sequenceId.toString(), "Evenement " +sequenceId.toString(), "Second evenemnt", "02/05/2018", "10/07/2018", "Salle Robert Piteu", "50", "0"));
	sequenceId++;
	listeEvt.push(new Evenement(sequenceId.toString(), "EVT"+sequenceId.toString(), "Evenement Magique", "Troisieme evenemnt", "08/05/2018", "10/08/2018", "Salle à définir", "50", "0"));
	sequenceId++;
	listeEvt.push(new Evenement(sequenceId.toString(), "EVT PROF"+sequenceId.toString(), "Apprendre", "Q evenemnt", "08/05/2018", "10/08/2018", "Salle à choisir", "2", "1"));
	sequenceId++;
	listeEvt.push(new Evenement(sequenceId.toString(), "EVT PROF"+sequenceId.toString(), "Comprendre", "S evenemnt", "08/05/2018", "10/08/2018", "Salle à choisir", "5", "1"));
	sequenceId++;
	remplirParticipant();
}

function remplirParticipant(){
	listeEvt[3].listeParticipant.push('test1@hotmail.fr');
	listeEvt[3].listeParticipant.push('test2@hotmail.fr');
	listeEvt[4].listeParticipant.push('test1@hotmail.fr');
	listeEvt[4].listeParticipant.push('test2@hotmail.fr');
	listeEvt[0].listeParticipant.push('test3@hotmail.fr');
	listeEvt[0].listeParticipant.push('test4@hotmail.fr');
	listeEvt[0].listeParticipant.push('jeanbon@hotmail.fr');
	listeEvt[0].listeParticipant.push('guilhemquintoch@hotmail.fr');
	listeEvt[0].listeParticipant.push('yanekcolonge@hotmail.fr');
	listeEvt[0].listeParticipant.push('alexpausey@hotmail.fr');
	listeEvt[1].listeParticipant.push('test4@hotmail.fr');
	listeEvt[1].listeParticipant.push('test3@hotmail.fr');
	listeEvt[1].listeParticipant.push('guilhemquintoch@hotmail.fr');
	listeEvt[1].listeParticipant.push('alexpausey@hotmail.fr');
	listeEvt[2].listeParticipant.push('guilhemquintoch@hotmail.fr');
	listeEvt[2].listeParticipant.push('alexpausey@hotmail.fr');
}
