var listeTypePart = [];

var sequenceId = 0;

exports.typeExist = function(id){
	ret = false;
	listeTypePart.forEach(function(event, index){
		if(event.id === id)
			ret = index;
	});
	return ret;
}

function TypeParticipant(id, denom, maxAcc){
	this.id = id;
	this.denom = denom;
	this.maxAcc = maxAcc;
}

exports.creerTypePart = function(denom, maxAcc){
	
	listeTypePart.push(new TypeParticipant(sequenceId.toString(), denom, maxAcc));
	sequenceId++;
	return 1;
}

exports.recupTypePart = function(id) {
	// s'il n'existe pas	
	var ret = false;
	listeTypePart.forEach(function(typePart, index){
		if(typePart.id === id){
			ret =  typePart;
		}
	});
	return ret;
}

exports.supprTypePart = function(id){
	var idTab;
	if (typeExist(id)) 
		return 0;
	delete listeTypePart[idTab];
	return 1;
}

exports.modifTypePart = function(id, denom, maxAcc){
	if (typeExist(id)) 
		return 0;
	//Si le type existe on le modifie
	else{ 
		if(typeof denom !== 'undefined')
			recupTypePart(id).denom = denom;
		if(typeof maxAcc !== 'undefined')
			recupTypePart(id).maxAcc = maxAcc;
		return 1;
	}
}

exports.getAllType = function(){
	return listeTypePart;
}