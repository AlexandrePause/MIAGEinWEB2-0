app.controller('loginCtrl', function($scope, $http, $location) {

	$scope.connexion = function(){
   		
   		$http.get("http://localhost:3000/user/id="+$scope.mail)
		.then(function(res){
			//$location.path('/modifEvent');
		}, function(res){
			alert("Le compte n'existe pas");
			$scope.error = res.body;
		});
	}

});