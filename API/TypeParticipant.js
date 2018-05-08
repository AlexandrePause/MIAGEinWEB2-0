var listeTypePart = {};
listeTypePart[1] = {
	"id" : 1,
	"denom" : "Etudiant",
	"nbMax" : 2		
}

listeTypePart[10] = {
	"id" : 10,
	"denom" : "Professeur",
	"nbMax" : 3		
}

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

var typeExist = function(id){
	if (typeof listeTypePart[id] !== 'undefined') 
		return 1;
	else
		return 0;
}

var dernierId = function(){
	var ancId = 0;
	for(var id in listeTypePart){
		if(id > ancId){
			ancId = id;
		}
	}
	return ancId
}

var getAllType = function(){
	return listeTypePart;
}

exports.creerTypePart = creerTypePart;
exports.recupTypePart = recupTypePart;
exports.supprTypePart = supprTypePart;
exports.modifTypePart = modifTypePart;
exports.typeExist = typeExist;
exports.dernierId = dernierId;
exports.getAllType = getAllType;