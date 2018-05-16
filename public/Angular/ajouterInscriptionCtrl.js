app.factory('sauvegardeDataInscription', function() {
	var savedData = {}
	function set(data) {
		savedData = data;
	}
	function get() {
		return savedData;
	}

	return {
		set: set,
		get: get
	}

});

app.controller('ajouterInscriptionCtrl', function($scope, $http, $location, $routeParams, sauvegardeDataInscription) {
	
	var data = sauvegardeDataInscription.get();

	$scope.nom = data.nom;
	$scope.prenom = data.prenom;
	$scope.mail = data.mail;
	$scope.tel = data.tel;

	$scope.enregistrer = function(){

	}

	$scope.annuler = function(){
		deleteData();
		$location.path("ListeEvent");
	}
});