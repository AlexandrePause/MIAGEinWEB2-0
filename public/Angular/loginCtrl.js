app.controller('loginCtrl', function($scope, $http, $location, $cookies) {

	$scope.connexion = function(){
   		
   		$http.get("http://localhost:3000/user/id="+$scope.mail)
		.then(function(res){
			$cookies.put("token", "yanekcolonge@hotmail.fr");
			$location.path('/');
		}, function(res){
			alert("Le compte n'existe pas");
			$scope.error = res.body;
		});
	}

});