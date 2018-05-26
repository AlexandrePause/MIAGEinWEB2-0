app.controller('listeEventInscriptionUserCtrl', function($scope, $http, $location, $cookies) {
	$scope.retour = function(){
         $location.path("/");
    }
	
    var token = $cookies.get("token");
    
    if(typeof token === 'undefined')
        $location.path('/login');

	$http.get("http://localhost:3000/EvenementPossibleUser/id="+token)
    .then(function (response) {
        $scope.listeEvent = response.data;
    });
});