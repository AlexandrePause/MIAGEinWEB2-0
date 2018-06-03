var app = angular.module("MIAGEin", ["ngRoute", "ngCookies", "ngSanitize", 'pascalprecht.translate', 'tmh.dynamicLocale'])
app.constant('LOCALES', {
    'locales': {
        'fr_FR': 'Français',
        'en_US': 'English'
    },
    'preferredLocale': 'fr_FR'
});
app.config(function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
});
app.config(function ($translateProvider) {
	$translateProvider.useMissingTranslationHandlerLog();
});
app.config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'locale-',// path to translations files
        suffix: '.json'// suffix, currently- extension of the translations
    });
    $translateProvider.preferredLanguage('fr_FR');// is applied on first load
    $translateProvider.useLocalStorage();// saves selected language to localStorage
});

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
	.when("/infoUser", {
		templateUrl : "infoUser.html"
	})
	.otherwise({
	    template : "<h1>None</h1><p>Nothing has been selected</p>"
  });
});
