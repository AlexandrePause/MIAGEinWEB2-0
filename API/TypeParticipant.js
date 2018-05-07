var listeTypePart = {};

function TypeParticipant(id, denom, maxAcc){
	this.id = id;
	this.denom = denom;
	this.maxAcc = maxAcc;
}

var creerTypePart = function(id, denom, maxAcc){
	// s'il n'existe pas
	if (typeof listeTypePart[id] === 'undefined') {
		// on le cree
		listeTypePart[id] = new TypeParticipant(id, denom, maxAcc);
		return 1;
    }
    return 0;
}

var recupTypePart = function(id) {
	// s'il n'existe pas
	if (typeof listeTypePart[id] === 'undefined')
		return 0;
    return listeTypePart[id];
}

var supprTypePart = function(id){
	if (typeof listeTypePart[id] === 'undefined') 
		return 0;
	delete listeTypePart[id];
	return 1;
}

var modifTypePart = function(id, denom, maxAcc){
	if (typeof listeTypePart[id] === 'undefined') 
		return 0;
	//Si le type existe on le modifie
	else{ 
		if(typeof denom !== 'undefined')
			listeTypePart[id].denom = denom;
		if(typeof maxAcc !== 'undefined')
			listeTypePart[id].maxAcc = maxAcc;
		return 1;
	}
}

exports.creerTypePart = creerTypePart;
exports.recupTypePart = recupTypePart;
exports.supprTypePart = supprTypePart;
exports.modifTypePart = modifTypePart;