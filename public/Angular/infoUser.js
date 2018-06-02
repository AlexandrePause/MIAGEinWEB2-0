
app.controller('infoUserCtrl', function($scope, $http, $location, $routeParams) {
	console.log("pk ca marhce pas putainnn");
	$http.get("http://localhost:3000/user/id="+$routeParams.idUser)
	.then(function(response) {
		console.log(response.data);
		$scope.infoUser = response.data;
	});

	$scope.retour = function(){
         $location.path("/modifEvent/"+$routeParams.idEvent);
    }
});