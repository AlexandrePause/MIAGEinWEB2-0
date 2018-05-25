var app = angular.module("MIAGEin", ["ngRoute", "ngCookies", "ngSanitize"]);

app.config(function($routeProvider) {
  $routeProvider
	.when("/", {
		templateUrl : "Accueil.html"
	})
	.when("/ListeEvent", {
		templateUrl : "ListeEvent.html"
	})
	.when("/modifEvent", {
		templateUrl : "AjouterModifierEvent.html"
	})
	.when("/modifEvent/:id", {
		templateUrl : "AjouterModifierEvent.html"
	})
	.when("/creerTypePart", {
		templateUrl : "CreerTypeParticipant.html"
	})
	.when("/signin", {
		templateUrl : "CreerCompte.html"
	})
	.when("/login", {
		templateUrl : "Login.html"
	})
	.when("/creerTypePart", {
		templateUrl : "CreerTypeParticipant.html"
	})
	.when("/listeEventInscriptionUser", {
		templateUrl : "ListeEventInscriptionUser.html"
	})
	.when("/inscrire", {
		templateUrl : "Inscrire.html"
	})
	.otherwise({
	    template : "<h1>None</h1><p>Nothing has been selected</p>"
  });
});
