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
	var evt;
	evt = this.recupEvenement(id);
	if (evt === false){
		return 0;
	}
	listeEvt.forEach(function(event, index){

		if(event.id === id){
			event.id = undefined;
		}
	});
	this.majListEvt(id);
	return 1;
}

exports.majListEvt = function(id){
	var tab = [];
	listeEvt.forEach(function(element, index){
		if(element.id != undefined){
			tab.push(element);
		}
	});
	listeEvt = [];
	listeEvt = tab;
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
			var tab = [];
			typePart.forEach(function(element, index){
				if(element){
					tab.push(index.toString());
				}
			});

			this.recupEvenement(id).idTypePart = tab;
		}
		return 1;
	}
}

exports.getAllEvenement = function(){
	return listeEvt;
}

exports.getAllParticipantEvt = function(id){
	var nbParti = 0;
	listeEvt.forEach(function(event){
		if(event.id === id){
			nbParti = event.listeParticipant.length;
		}
	})
	return nbParti;
}

exports.getPourcEvtType = function(id, nbParti){
	var tab = [];
	var event = this.recupEvenement(id);
	var nbPart = 0;
	event.idTypePart.forEach(function(monIdTypePart){
		var nomType = typeParticipant.recupTypePart(monIdTypePart);
		nbPart = 0;
		event.listeParticipant.forEach(function(element){
			var participant = userData.recupUser(element);
			if(monIdTypePart === participant.idTypePart){
				nbPart++;
			}
		});
		if(nbPart != 0){
			var monPourcentage = (nbPart*100)/nbParti;
			tab.push({type: nomType, pourcentage : monPourcentage});
		}
	});
	return tab;
}

exports.getMoyenneParticipantTypeP = function(){
	var tab = [];
	var myThis = this;

	var listeTyp = typeParticipant.getAllType();
	listeEvt.forEach(function(event, index){
		var nbParti = myThis.getAllParticipantEvt(event.id);
		var monPourcentage = myThis.getPourcEvtType(event.id, nbParti);
		var nbMoyPartEvt = {nom: event.acro, nbPartiEvt : nbParti, pourcent : monPourcentage};
		tab.push(nbMoyPartEvt);
	});

	return tab;
}

exports.getAllParticipant = function(){
	var nb = 0;
	listeEvt.forEach(function(event, index){
		nb+=event.listeParticipant.length;
	});
	return nb;
}

exports.getAllEvt = function(id){
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
	var myThis = this;
	var nbPartiTot = this.getAllParticipant();

	listeEvt.forEach(function(event, index){
		var nbParti = event.listeParticipant.length;
		var nbMoyPartEvt = {nom: event.acro, moyenne: (nbParti/nbPartiTot)};
		tab.push(nbMoyPartEvt);
	});

	return tab;
}

exports.getAllEvenementStats = function(){
	var listeAllEvt = [];
	var nbEvt = listeEvt.length;
	var nbMoyenEvt = this.getMoyenneParticipant();
	var nbMoyenParType = this.getMoyenneParticipantTypeP();
	
	var stats = {NbTotEvt: nbEvt, nbMoyPartEvt:nbMoyenEvt, nbMoyPartTypeEvt:nbMoyenParType};
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
			element.idTypePart.some(function(idTypePartEvent){
				if(idTypePartEvent === user.idTypePart){
					var dateNow = new Date();
					var date = new Date(element.datFerm);
					if(dateNow<date){
						element.complet = complet;
						tabEvent.push(element);
						return true;
					}	
				}
			});
			
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
	var ret = 0;
	var user;
	var myThis = this;
	if(user = userData.recupUser(idPart)){
		var event = this.recupEvenement(idEvent);
		event.idTypePart.forEach(function(element){
			if(element === user.idTypePart && !myThis.eventComplet(idEvent) && !myThis.isIncluded(event.listeParticipant, idPart)){
				event.listeParticipant.push(idPart);			
				ret = 1;
			}
		})
	}
	return ret;
}


exports.participe = function (idEvent, idPart){
	var user;
	if(user = userData.recupUser(idPart)){
		var event = this.recupEvenement(idEvent);

		if(event.listeParticipant.length == 0){
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
