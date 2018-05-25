app.controller('inscriptionCtrl', function($scope, $http, $location, $cookies, $routeParams) {


	var token = $cookies.get("token");
	$scope.accompagnants = [];
    
    if(typeof token === 'undefined'){
    	alert("Veuillez vous connecter");
        $location.path('/login');
    }

    $http.get("http://localhost:3000/evenement/id="+$routeParams.id)
    .then(function (response) {
        $scope.infosEvent = response.data;

        $http.get("http://localhost:3000/typePart/id="+response.data.idTypePart)
    	.then(function (res) {
    		//$scope.nbAcc = new Array(res.data.maxAcc);
    	});	
    });

    $http.get("http://localhost:3000/userAccomp/id="+token)
    .then(function (response) {
    	//Retourne les accompagnants
    	var stringAcc = "";

    	response.data.forEach(function(elem){
    		stringAcc += ""+elem.mail+" "+elem.nom+" "+elem.prenom+" "+elem.tel+"<br>";
    	});

    	$scope.divAcc = stringAcc;
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

    	console.log($scope.mail);

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
				$scope.divAcc += $scope.mail+" "+$scope.nom+" "+$scope.prenom+" "+$scope.tel+"<br>";
			}, function(res){
				$http.delete("http://localhost:3000/user/id="+$scope.mail)
				.then(function(res){
					alert("accompagnant Supprimé");
				});
				alert("Impossible d'ajouter l'accompagnant a l'event");
			});


		}, function(res){
			alert(res.data);
		});
    }

    
});
