app.factory('sauvegardeDataEvent', function() {
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


app.controller('ajouterEventCtrl', function($scope, $http, sauvegardeDataEvent) {
    
	data = sauvegardeDataEvent.get();

	$scope.acro = data.acro;
	$scope.nom = data.nom;
	$scope.desc = data.desc;
	$scope.dateOuv = data.dateOuv;
	$scope.dateFerm = data.dateFerm;
	$scope.lieu = data.lieu;
	$scope.nbPartMax = data.nbPartMax;
	$scope.typePart = data.typePart;

	$scope.enregistrer = function() {
		$http.get("http://localhost:3000/typeExist/id="+$scope.typePart)
			.then(function(response) {
	       		if(response.data.existe === "true"){
	       			$http.get("http://localhost:3000/lastIdEvent")
						.then(function(response) {
				       		
				       		toPost = {
								"id" : parseInt(response.data.id)+1,
								"acro" : $scope.acro,
								"nom" : $scope.nom,
								"desc" : $scope.desc,
								"datOuvr" : $scope.dateOuv,
								"datFerm" : $scope.dateFerm,
								"lieu" : $scope.lieu,
								"nbPartMax" : $scope.nbPartMax,
								"typePart" : $scope.typePart
							}

							$http.post("http://localhost:3000/evenement", toPost)
							.then(function(res){
								$location.path('/ListeEvent');
							}, function(res){
								$scope.error = res.body;
							});
				    });
	       		}
	       		else{
	       			$scope.error = "Le type n'existe pas";
	       		}

	    }, function(res){
	    	$scope.error = res.body;
	    });
    };

    $scope.saveData = function(){
    	sauvegardeDataEvent.set(
			{
				"acro" : $scope.acro,
				"nom" : $scope.nom,
				"desc" : $scope.desc,
				"datOuvr" : $scope.dateOuv,
				"datFerm" : $scope.dateFerm,
				"lieu" : $scope.lieu,
				"nbPartMax" : $scope.nbPartMax,
				"typePart" : $scope.typePart
		});
    };

    $scope.deleteData = function(){
		sauvegardeDataEvent.set({});
    };
});