app.controller('creerTypeCtrl', function($scope, $http, $location) {

	$scope.enregistrer = function(){
		
	       		
   		toPost = {
			"denom" : $scope.denom,
			"nbMax" : $scope.nbMax
		}

		$http.post("http://localhost:3000/typePart", toPost)
		.then(function(res){
			$location.path('/modifEvent');
		}, function(res){
			$scope.error = res.body;
		});
	}

});