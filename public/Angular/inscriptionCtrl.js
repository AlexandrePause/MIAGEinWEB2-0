app.controller('inscriptionCtrl', function($scope, $http, $location, $cookies, $routeParams) {

	var token = $cookies.get("token");
    
    if(typeof token === 'undefined'){
    	alert("Veuillez vous connecter");
        $location.path('/login');
    }
    $http.get("http://localhost:3000/evenement/id="+$routeParams.id)
    .then(function (response) {
        $scope.infosEvent = response.data;
    });
    $http.get("http://localhost:3000/participe/idEvent="+$routeParams.id+"&idUser="+token)
    .then(function (response) {
    	if(response.data === '0')
    		$scope.buttonInsc = false;
    	else
    		$scope.buttonInsc = true;
    });

    $scope.inscription = function(){
    	toPost = {
    		"idUser" : token,
    		"idEvent" : $routeParams.id
    	};

    	$http.post("http://localhost:3000/inscriptionUser", toPost)
	    .then(function (response) {
	        $scope.buttonInsc = true;
	        $http.get("http://localhost:3000/evenement/id="+$routeParams.id)
		    .then(function (response) {
		        $scope.infosEvent = response.data;
		    });
	    });
    }

    $scope.inscriptionAccomp = function(){
    	var postInscription = {
			"mail": $scope.mail,
		    "nom": $scope.nom,
		    "prenom": $scope.prenom,
		    "tel": $scope.tel,
		    "idTypePart" : $scope.infosEvent.idTypePart,
		    "idAccompagnant" : token
		};

		$http.post("http://localhost:3000/addAccomp", postInscription)
		.then(function(res){
			
			toPostEvent = {
	    		"idUser" : $scope.mail,
	    		"idEvent" : $routeParams.id
	    	};

			$http.post("http://localhost:3000/inscriptionUser", toPostEvent)
			.then(function(res){
				alert("accompagnant Ajouté");
			}, function(res){
				$http.delete("http://localhost:3000/user/id="+$scope.mail)
				.then(function(res){
					alert("accompagnant Supprimé");
				});
				alert("Impossible d'ajouter l'accompagnant a l'event");
			});


		}, function(res){
			alert("Le compte a cette adresse existe deja");
		});

		


	    
    }
});
