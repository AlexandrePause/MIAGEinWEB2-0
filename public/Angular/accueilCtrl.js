app.controller('accueilCtrl', function($scope,$location) {

	$scope.administration = function(){
		$location.path("/ListeEvent");
	}

	$scope.creerCompte = function(){
		$location.path("/signin");
	}

	$scope.connexion = function(){
		$location.path("/login");
	}



});