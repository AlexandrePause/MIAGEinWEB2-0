app.controller('creerCompteCtrl', function($scope, $http, $location) {

	$scope.enregistrer = function(){
   		var toPost = {
			"mail": $scope.mail,
		    "nom": $scope.nom,
		    "prenom": $scope.prenom,
		    "tel": $scope.tel,
		    "idTypePart": 1
		};

		$http.post("http://localhost:3000/addUser", toPost)
		.then(function(res){
			//$location.path('/modifEvent');
		}, function(res){
			alert("Le compte a cette adresse existe deja")
			$scope.error = res.body;
		});
	}

});