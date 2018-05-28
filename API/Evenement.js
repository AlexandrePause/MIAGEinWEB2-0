var typeParticipant = require('./TypeParticipant');
var userData = require('./User');

var listeEvt = [];

var sequenceId = 0;

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
	this.nbPart = this.listeParticipant.length;
}

exports.creerEvt = function(acro, nom, desc, datOuvr, datFerm, lieu, nbPartMax, typePart){
	var ok = 0;
	var length = typePart.length;
	typePart.forEach(function(element){
				//Si le type existe
		if(typeParticipant.recupTypePart(element)){
			// on le cree
			ok++;
		}
	});

	if(ok === length){
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
	idTab = this.recupEvenement(id);
	if (idTab === false) 
		return 0;
	delete listeEvt[idTab];
	return 1;
}

exports.modifEvenement = function(id, acro, nom, desc, datOuvr, datFerm, lieu, nbPartMax, typePart){
	idTab = this.recupEvenement(id);
	if (idTab === false) 
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
		if(true){
			var myThis = this;
			console.log("salut"+typePart);
			this.recupEvenement(id).idTypePart.forEach(function(element){
				if(element.toString() !== typePart.toString()){
					myThis.recupEvenement(id).idTypePart.push(typePart.toString());
				}
			})
			console.log(this.recupEvenement(id).idTypePart);
		}
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
