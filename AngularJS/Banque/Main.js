/* ------- Import module  -------*/
var express = require('express') ; //express
var bodyParser = require('body-parser'); //body-parser
var banque = require('./banque/banque.js'); // banque avec fonction
/* ------- Instanciation ----------*/
var app = express() ; // express
/* -- inclusion du plugin pour parser du JSON --*/
app.use(bodyParser.json());

/* ------ ROUTE ------*/
// …/banque/public (physique) = / (url)
app.use(express.static(__dirname + '/public'));
// on choisit maintenant d’exposer un 2eme repertoire
// …/banque/bower_components (physique) = /bower_components (url)
app.use('/bower_components',
express.static(__dirname + '/bower_components'));




/* ----------- Main  ----------*/


/* ----------------*/
app.route('/compte')
  .get(function(req, res) {
    var objet = banque.positionDuCompte(req.params.id);
	//res.json(objet);
	res.send(objet) ;
  })
  .post(function(req, res) {
  	 if(banque.creerCompte(req.body.id, req.body.somme)==1)
     	res.send("Compte crée");
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
	
			// GET //
/* ---------- Defaut -----------*/
//app.get('/', function (req, res) {
//res.send('Hello World!') ;
//}) ;
/* ---------- Sans body-parser -----------*/
app.get('/compte/:id', function (req, res) {
	res.set('Content-Type', 'application/json');
	//res.send('{ "id" : 1, "somme" : 100 } ') ;
	var objet = banque.positionDuCompte(req.params.id);
	res.send(objet) ;
}) ;

// Envoi avec code http personnalisé :
/*res.status(404).json(
{ error: "Le compte d'id "+req.body.id+" n'existe pas." }
);*/

/* ---------- Avec body-parser -----------*/

/**********************************/

			//  PUT  //
app.put('/compte/:id', function (req, res) {
  if(req.body.somme>0){
	banque.ajouterAuCompte(req.params.id, req.body.somme);
	res.send("Compte crédité") ;
  }
  else{
  	banque.retirerDuCompte(req.params.id, req.body.somme);
  	res.send("Compte débité") ;
  }
});	


/* ------- Main LISTEN ----------*/
app.listen(3000, function () {
console.log('Example app listening on port 3000!') ;
}) ;