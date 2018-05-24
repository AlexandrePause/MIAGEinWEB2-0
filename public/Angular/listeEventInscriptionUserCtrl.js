app.controller('listeEventInscriptionUserCtrl', function($scope, $http, $location, $cookies) {
	
    var token = $cookies.get("token");
    
    if(typeof token === 'undefined'){
    	alert("Veuillez vous connecter");
        $location.path('/login');
    }

	$http.get("http://localhost:3000/EvenementPossibleUser/id="+token)
    .then(function (response) {
        $scope.listeEvent = response.data;
    });

    $scope.inscrire = function(id){
    	$location.path('/inscrire').search({id: id});;
    }
});