app.controller('inscriptionCtrl', function($scope, $http, $location, $cookies, $routeParams) {

    var sinscriretxt = "S'inscrire";

    $scope.retour = function(){
         $location.path("/listeEventInscriptionUser");
    }

	var token = $cookies.get("token");
	$scope.accompagnants = [];

    var updateInfo = function(){
        
        $http.get("http://localhost:3000/evenement/id="+$routeParams.id)
        .then(function (response) {
            $scope.infosEvent = response.data;
        });
        $http.get("http://localhost:3000/peutAjouterAccomp/id="+token)
        .then(function (response) {
            $scope.boutonAccState = !response.data.peutAjouter;
            $scope.idTypePartUser = response.data.idTypePart;
        });
        $http.get("http://localhost:3000/userAccomp/id="+token)
        .then(function (response) {
            //Retourne les accompagnants
            $scope.tabAcc = [];
            var stringAcc = "";

            response.data.forEach(function(elem){
                $scope.tabAcc.push({
                    "mail" : elem.mail,
                    "nom" : elem.nom,
                    "prenom" : elem.prenom,
                    "tel" : elem.tel
                });
            });

            $scope.divAcc = stringAcc;
        });
    }

    if(typeof token === 'undefined'){
    	alert("Veuillez vous connecter");
        $location.path('/login');
    }

    updateInfo();

    $http.get("http://localhost:3000/participe/idEvent="+$routeParams.id+"&idUser="+token)
    .then(function (response) {
    	if(response.data === "0"){
            $scope.sinscriretxt = "S'inscrire";
            $scope.buttonInsc = false;
        }
    	else{
            $scope.sinscriretxt  = "Vous êtes déjà inscrit";
            $scope.buttonInsc = true;
        }
    });

    $scope.supprAcc = function(id){
        $http.delete("http://localhost:3000/user/id="+$scope.tabAcc[id].mail)
        .then(function(res){
            $scope.tabAcc.splice(id, 1);
            updateInfo();
        }, function(res){
            alert("Erreur lors de la suppressiont"+res.data);
        });
    }

    $scope.inscription = function(){
    	toPost = {
    		"idUser" : token,
    		"idEvent" : $routeParams.id
    	};

    	$http.post("http://localhost:3000/inscriptionUser", toPost)
	    .then(function (response) {
	        $scope.buttonInsc = true;
	        updateInfo();
            $scope.sinscriretxt  = "Inscription prise en compte";
	    });
    }

    $scope.inscriptionAccomp = function(){

    	console.log($scope.mail);

    	var postInscription = {
			"mail": $scope.mail,
		    "nom": $scope.nom,
		    "prenom": $scope.prenom,
		    "tel": $scope.tel,
		    "idTypePart" : $scope.idTypePartUser,
		    "idAccompagnant" : token
		};

		$http.post("http://localhost:3000/addAccomp", postInscription)
		.then(function(res){
			
			toPostEvent = {
	    		"idUser" : $scope.mail,
	    		"idEvent" : $routeParams.id
	    	};

			$http.post("http://localhost:3000/inscriptionUser", toPostEvent)
			.then(function(res){
				updateInfo();
                $scope.mail = "";
                $scope.nom = "";
                $scope.prenom = "";
                $scope.tel = "";
			}, function(res){
				$http.delete("http://localhost:3000/user/id="+$scope.mail)
				.then(function(res){
					alert("Accompagnant Supprimé");
				});
				alert("Impossible d'ajouter l'accompagnant a l'event");
			});


		}, function(res){
			alert(res.data);
		});
    }

    $scope.supprAccomp = function(mail){
        $http.delete("http://localhost:3000/user/id="+mail)
        .then(function(res){
            alert("accompagnant Supprimé");
        });
        updateInfo();
    }

    
});
