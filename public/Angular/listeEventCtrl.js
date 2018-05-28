app.controller('listeEventCtrl', function($scope, $http, $location) {

    $scope.retour = function(){
         $location.path("/");
    }
	
	$scope.modifier = function(id){
		if(typeof id === 'undefined'){
			id="";
		}
		$location.path("modifEvent/"+id)
	}

	$http.get("http://localhost:3000/allEvenement")
    .then(function (response) {
    	$scope.listeEvent = response.data;
    	
    });

    $scope.supprimer = function(id){
    	$http.delete("http://localhost:3000/evenement/id="+id).
    	then(function (response) {
    		$("#listeEvent #"+id).remove();
    	});
    }
});