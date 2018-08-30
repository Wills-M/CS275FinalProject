var express = require('express'); 
var mysql = require('mysql'); 
var app = express(); 
var readline = require('readline-sync');
app.use(express.static("../")); 
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
var request = require('request'); 

var user = readline.question("What is the username?");
var pass = readline.question("What is the password?");

var con = mysql.createConnection( {
	host:"localhost", 
	user:user, 
	password:pass,
	database: "birdwatch"	
})

con.connect(function (err) {
	if (err)throw err; 
	console.log("Connected!"); 
}); 

app.get('/', function(req, res) {
	console.log('user accessed home, redirecting to login'); 
	res.redirect('../front/login.html'); 
}); 

app.get('/search', function(req, res) {//When the user enters a bird in the search bar
	console.log('user accessed search, redirecting...'); 
	//res.redirect('../front/search.html'); 
	
		con.query('SELECT commonName, birdPic, description FROM bird WHERE commonName LIKE \'%' + req.query.name + '%\';', function (err, result, fields) {
		if (err)
			console.log("Error gettting table");
		else{
			res.send(result);
		}
	});
}); 

app.get('/bird', function(req, res) {//The description page for a bird
	console.log('user accessed bird descript'); 

	con.query('SELECT commonName, scientificName, birdPic, description FROM bird WHERE commonName =\'' + req.query.name + '\';', function (err, result, fields) {
		if (err)
			console.log("Error gettting table");
		else{
			res.send(result[0]);
		}
	});
	//temporary redirect, implement proper params and databse stuff here!
	//res.redirect('../front/bird.html'); 
}); 

app.get('/map', function(req, res) {//The Google Map feature showing the birds in the area
	console.log('user accessing map'); 
	var URL = "http://ebird.org/ws1.1/data/notable/geo/recent?lng="
	URL += req.query.lng + "&lat=" + req.query.lat + "&fmt=json&locale=en_US";
	
	request(URL, function(error, response, body){
		var json = JSON.parse(body);
		
		res.send(json);
		
	});	
}); 

app.get('/list', function(req, res) {//When the users select a list, this will show the list of birds
	console.log('user accessing list'); 
		con.query('SELECT commonName, birdPic, description FROM bird WHERE commonName =\'' + req.query.name + '\';', function (err, result, fields) {
		if (err)
			console.log("Error gettting table");
		else{
			res.send(result[0]);
		}
	});
}); 

app.get('/login', function(req, res) {
	con.query('SELECT * FROM user WHERE userName=\'' + req.query.username + '\' AND userPass = \'' + req.query.password + '\';', function (err, result, fields) {
		if (err) throw err;
		if (result.length > 0)
		{
			var json = {"authentication" : "passed"};
			res.send(json);
		}
		else
		{
			var json = {"authentication" : "failed"};
			res.send(json);
		}
	});
}); 

app.get('/initdb', function(req, res) {
	var URL = 'https://ebird.org/ws1.1/ref/taxa/ebird?cat=species&fmt=json&locale=en_US';

	request(URL, function(error, response, body){
		var json = JSON.parse(body);
		json.forEach((bird, index) => {
			
			var sql = "INSERT INTO bird (commonName, scientificName) VALUES ('" + bird.comName.replace('"', '').replace(/'/g, "\\'") + "', '" + bird.sciName + "')";
  			con.query(sql, function (err, result) {
    			if (err) throw err;
    		console.log(bird.comName + " inserted.");
  			});
		});
	});
});

var server = app.listen(8080, function() {// notifies in the command prompt that the server is running
	console.log('Server started on port ' + server.address().port)
}); 