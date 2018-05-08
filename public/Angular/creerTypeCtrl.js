app.controller('creerTypeCtrl', function($scope, $http, $location) {

	$scope.enregistrer = function(){
		$http.get("http://localhost:3000/lastIdTypePart")
		.then(function(response) {
	       		
       		toPost = {
				"id" : parseInt(response.data.id)+1,
				"denom" : $scope.denom,
				"nbMax" : $scope.nbMax
			}

			$http.post("http://localhost:3000/typePart", toPost)
			.then(function(res){
				$location.path('/modifEvent');
			}, function(res){
				$scope.error = res.body;
			});
	    }, function(res) {
	    	$scope.error = res.body;
	    });
	}

});