var express = require('express'); 
var mysql = require('mysql'); 
var app = express(); 
app.use(express.static(".")); 

var con = mysql.createConnection( {
	host:"localhost", 
	user:"root", 
	password:"password",
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
	res.redirect('../front/search.html'); 
}); 

app.get('/bird', function(req, res) {//The description page for a bird
	console.log('user accessed bird descript'); 
	
	//temporary redirect, implement proper params and databse stuff here!
	res.redirect('../front/bird.html'); 
}); 

app.get('/map', function(req, res) {//The Google Map feature showing the birds in the area
	console.log('user accessing map'); 
}); 

app.get('/list', function(req, res) {//When the users select a list, this will show the list of birds
	console.log('user accessing list'); 
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

var server = app.listen(8080, function() {// notifies in the command prompt that the server is running
	console.log('Server started on port ' + server.address().port)
}); 