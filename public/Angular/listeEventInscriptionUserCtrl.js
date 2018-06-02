app.controller('listeEventInscriptionUserCtrl', function($scope, $http, $location, $cookies) {

     $scope.retour = function(){
         $location.path("/");
    }
	
    var token = $cookies.get("token");
    $scope.tokenToTest = token;

    if(typeof token === 'undefined'){
    	alert("Veuillez vous connecter");
        $location.path('/login');
    }

    /* if(typeof token === 'undefined' && token != "52GLMJ1PO"){
        token = "52GLMJ1PO";
    }*/

	$http.get("http://localhost:3000/EvenementPossibleUser/id="+token)
    .then(function (response) {
        $scope.listeEvent = response.data;
    });



    $scope.inscrire = function(id){
    	$location.path('/inscrire').search({id: id});;
    }

    $scope.token = function(){
         console.log("TOKEN ================" +token);
    }
    
});