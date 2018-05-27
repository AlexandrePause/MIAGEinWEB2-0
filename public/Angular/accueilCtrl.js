app.controller('accueilCtrl', function($scope,$location, $cookies, $http) {

	var token = $cookies.get("token");
	var connect = false;

	$http.get("http://localhost:3000/allEvenementStats")
    .then(function (response) {
    	$scope.listeAllEvt = response.data;
    	
    });



	if($cookies.get("token")===undefined){
		$scope.connexionStatus = "Connexion";
	}
	else{
		if(token === "admin"){
			$scope.nomUser = "Bonjour administrateur du service";
		}
		else{
			$scope.nomUser = "Bonjour "+token;
		}
		
		connect = true;
		$scope.connexionStatus = "Déconnexion";
	}
	


	$scope.administration = function(){
		$location.path("/ListeEvent");
	}

	$scope.creerCompte = function(){
		$location.path("/signin");
	}

	$scope.connexion = function(){
		if(connect){
			$cookies.remove("token");
			$scope.connexionStatus = "Connexion";
			$scope.nomUser = "";
			connect = false;
		}
		else{
			$location.path("/login");	
		}
		
	}

	    $scope.token = function(){
         console.log("TOKEN ================" +token);
    }


});