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


app.controller('ajouterEventCtrl', function($scope, $http, $location, $routeParams, sauvegardeDataEvent) {

	var data = sauvegardeDataEvent.get();

	$scope.acro = data.acro;
	$scope.nom = data.nom;
	$scope.desc = data.desc;
	$scope.dateOuv = data.dateOuv;
	$scope.dateFerm = data.dateFerm;
	$scope.lieu = data.lieu;
	$scope.nbPartMax = data.nbPartMax;	

	$http.get("http://localhost:3000/allType")
	.then(function(response) {
		$scope.listeType = response.data;
		$scope.listeType.forEach(function(element){
        	if(element.id === data.idTypePart)
        		$scope.idTypePart = element;
        });

   		if(typeof $routeParams.id !== 'undefined'){
			$http.get("http://localhost:3000/evenement/id="+$routeParams.id)
			.then(function(response) {

				$scope.acro = response.data.acro;
				$scope.nom = response.data.nom;
				$scope.desc = response.data.desc;
				$scope.dateOuv = response.data.datOuvr;
				$scope.dateFerm = response.data.datFerm;
				$scope.lieu = response.data.lieu;
				$scope.nbPartMax = parseInt(response.data.nbPartMax);

				console.log($scope.listeType);
				console.log(response.data.idTypePart);

	            $scope.listeType.forEach(function(element){
	            	if(element.id === response.data.idTypePart)
	            		$scope.idTypePart = element;
	            });

			});
		}
	});

	

	$scope.enregistrer = function() {

		var idSelect;

		if(typeof $scope.idTypePart === 'undefined')
			idSelect = -1;
		else
			idSelect = $scope.idTypePart.id;

		$http.get("http://localhost:3000/typeExist/id="+idSelect)
			.then(function(response) {
	       		if(response.data.existe === true){
	       			
	       			if(typeof $routeParams.id !== 'undefined'){
	       				toPost = {
							"acro" : $scope.acro,
							"nom" : $scope.nom,
							"desc" : $scope.desc,
							"datOuvr" : $scope.dateOuv,
							"datFerm" : $scope.dateFerm,
							"lieu" : $scope.lieu,
							"nbPartMax" : $scope.nbPartMax,
							"idTypePart" : idSelect
						}

						$http.put("http://localhost:3000/evenement/id="+$routeParams.id, toPost)
						.then(function(res){
							deleteData();
							$location.path('/ListeEvent');
						}, function(res){
							$scope.error = res.body;
						});
	       			}
	       			else{
	       					
			       		toPost = {
							"acro" : $scope.acro,
							"nom" : $scope.nom,
							"desc" : $scope.desc,
							"datOuvr" : $scope.dateOuv,
							"datFerm" : $scope.dateFerm,
							"lieu" : $scope.lieu,
							"nbPartMax" : $scope.nbPartMax,
							"idTypePart" : idSelect
						}

						$http.post("http://localhost:3000/evenement", toPost)
						.then(function(res){
							deleteData();
							$location.path('/ListeEvent');
						}, function(res){
							$scope.error = res.body;
						});
	       			}
	       		}
	       		else{
	       			$scope.error = "Le type n'existe pas";
	       		}

	    }, function(res){
	    	$scope.error = res.body;
	    });
    };

    $scope.creerTypePart = function(){
    	saveData();
    	$location.path("creerTypePart");
    }

    $scope.annuler = function(){
    	deleteData();
    	$location.path("ListeEvent");
    }

    saveData = function(){

    	var idSelect;

		if(typeof $scope.idTypePart === 'undefined')
			idSelect = -1;
		else
			idSelect = $scope.idTypePart.id;

    	sauvegardeDataEvent.set(
			{
				"acro" : $scope.acro,
				"nom" : $scope.nom,
				"desc" : $scope.desc,
				"dateOuv" : $scope.dateOuv,
				"dateFerm" : $scope.dateFerm,
				"lieu" : $scope.lieu,
				"nbPartMax" : $scope.nbPartMax,
				"idTypePart" : idSelect
		});
    };

    deleteData = function(){
		sauvegardeDataEvent.set({});
    };
});