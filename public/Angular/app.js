var app = angular.module("MIAGEin", ["ngRoute"]);

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
	.otherwise({
	    template : "<h1>None</h1><p>Nothing has been selected</p>"
  });
});
