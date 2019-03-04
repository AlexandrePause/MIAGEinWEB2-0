app.controller('creerCompteCtrl', function($scope, $http, $location) {

	$scope.retour = function(){
         $location.path("/");
    }

	$http.get("http://localhost:3000/allType")
	.then(function(response) {
		$scope.listeType = response.data;
	});

	$scope.enregistrer = function(){
		
   		var toPost = {
			"mail": $scope.mail,
			"mdp": $scope.password,
		    "nom": $scope.nom,
		    "prenom": $scope.prenom,
		    "tel": $scope.tel,
		    "idTypePart": $scope.idTypePart.id,
		    "option": $scope.option
		};
		
		if($scope.formCreerCompte.$valid){
			$http.get("http://localhost:3000/typeExist/id="+$scope.idTypePart.id)
			.then(function(response) {
	       		if(response.data.existe === true){
					$http.post("http://localhost:3000/addUser", toPost)
					.then(function(res){
						$location.path('/login');
					}, function(res){
						alert("Le compte a cette adresse existe deja")
						$scope.error = res.body;
					});
				}
				else
					alert("Veuillez entrer un type d'inscription valide");
			});
		}
		else
			alert("Formulaire incomplet");
	}

});