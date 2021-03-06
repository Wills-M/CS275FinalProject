var express = require('express');
var mysql = require('mysql');
var app = express();
var readline = require('readline-sync');
app.use(express.static("../"));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var request = require('request');
var requestHandler = require('./requestHandler');
var rH = new requestHandler.RequestHandler();

var user = readline.question("What is the username?");
var pass = readline.question("What is the password?");

var con = mysql.createConnection({
	host: "localhost",
	user: user,
	password: pass,
	database: "birdwatch"
})

//Helper function
function first(p) {
	for (var i in p)
		return p[i];
}

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});

app.get('/', function (req, res) {
	console.log('user accessed home, redirecting to login');
	res.redirect('../front/login.html');
});

app.get('/search', function (req, res) {//When the user enters a bird in the search bar
	console.log('user accessed search, redirecting...');
	//res.redirect('../front/search.html'); 

	con.query('SELECT commonName, scientificName, birdPic, description FROM bird WHERE commonName LIKE \'%' + req.query.name + '%\';', function (err, result, fields) {
		if (err)
			console.log("Error gettting table");
		else {
			result.forEach(function (bird, index) {
				var URL = "https://en.wikipedia.org/w/api.php?action=query&redirects&titles=" + bird.scientificName.replace(" ", "_") + "&prop=pageimages&format=json&pithumbsize=500";
				request(URL, function (error, response, body) {
					var json = JSON.parse(body);
					var pages = json.query.pages;
					if (first(pages) && first(pages).thumbnail) {
						var sql = 'UPDATE bird SET birdPic = \'' + first(pages).thumbnail.source + '\' WHERE scientificName = \'' + bird.scientificName + '\'';
						con.query(sql, function (err, result) {
							if (err) throw err;
						});
					}
				});
			});
			res.send(result);
		}
	});
});

app.get('/bird', function (req, res) {//The description page for a bird
	console.log('user accessed bird descript');

	con.query('SELECT commonName, scientificName, birdPic, description FROM bird WHERE commonName =\'' + req.query.name + '\';', function (err, result, fields) {
		if (err)
			console.log("Error gettting table");
		else {
			
			result.forEach(function (bird, index) {
				var URL = "https://en.wikipedia.org/w/api.php?action=query&redirects&titles=" + bird.scientificName.replace(" ", "_") + "&prop=pageimages&format=json&pithumbsize=500";
				request(URL, function (error, response, body) {
					var json = JSON.parse(body);
					var pages = json.query.pages;
					if (first(pages) && first(pages).thumbnail) {
						var sql = 'UPDATE bird SET birdPic = \'' + first(pages).thumbnail.source + '\' WHERE scientificName = \'' + bird.scientificName + '\'';
						con.query(sql, function (err, result) {
							if (err) throw err;
						});
					}
				});
			});

			rH.getDescription(result[0].description, result[0].scientificName.replace(" ", "_"));
			rH.once('gotDesc', function(desc) {
				//#region 
				var html_str = `
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<meta http-equiv="X-UA-Compatible" content="ie=edge">
					<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
					<script type="text/JavaScript" src="http://localhost:8080/front/bird.js"></script>
					<script type="text/JavaScript" src="http://localhost:8080/front/searchbar.js"></script>
					<script type="text/JavaScript" src="http://localhost:8080/front/search.js"></script>
					<title>bird.watch</title>

					<link rel="stylesheet" href="http://localhost:8080/front/css/search.css">
					<link rel="stylesheet" href="http://localhost:8080/front/css/normalize.css">
					<link rel="stylesheet" href="http://localhost:8080/front/css/base.css">
					<link rel="stylesheet" href="http://localhost:8080/front/css/bird.css">
				</head>

				<body>
					<header class="darkGreenBkg">
						<label class="menuBut" for="menuToggle">
							<img class="whiteFill" src="http://localhost:8080/front/assets/icons/menu.svg" alt="menu button">
						</label>
						<div class="searchCont">
							<input class="searchBar bodyFont" type="text" id="searchBar">
							<button class="gpsBut searchBut" onclick="searchBar()">
								<img src="http://localhost:8080/front/assets/icons/round-arrow_forward-24px.svg" alt="">
							</button>
							<button class="gpsBut" id="gpsBut" onclick="getLocation()"><img class="whiteFill" src="http://localhost:8080/front/assets/icons/gps.svg" alt=""></button>
						</div>
					</header>

					<input class="invisible" id="menuToggle" type="checkbox">
					<div class="menuDisp greenBkg">
						<ul class="menu">
            				<li class="menuItem" onclick="getList(this.id)" id="seenList">To See List</li>
            				<li class="menuItem"><label for="menuToggle">Close Menu</label></li>
						</ul>
					</div>

					<div class="resultDisp roundCorners">
						<div class="imgCardCont roundCorners">
							<img class="birdImg roundCorners" src="` + result[0].birdPic + `">
							<div class="butCont">
								<button name="` + result[0].commonName + `" onclick="toAddList(this.attributes)"><img src="http://localhost:8080/front/assets/icons/add_white.svg" alt=""></button>
							</div>
						</div>
						<div class="descriptDisp roundCorners whiteBkg bodyFont">
							<h1 class="headFont">` + result[0].commonName + `</h1>
							<h2 class="italics gray">` + result[0].scientificName + `</h2>
							<p>` + desc + `</p>
						</div>
					</div>
				</body>
				</html>`;
				//#endregion
				res.send(html_str);
			})
			console.log("Getting result");
		}
	});
	//temporary redirect, implement proper params and databse stuff here!
	//res.redirect('../front/bird.html'); 
});

app.get('/map', function (req, res) {//The Google Map feature showing the birds in the area
	console.log('user accessing map');
	var URL = "http://ebird.org/ws1.1/data/notable/geo/recent?lng="
	URL += req.query.lng + "&lat=" + req.query.lat + "&dist=50&maxResults=50&fmt=json&locale=en_US";

	request(URL, function (error, response, body) {
		var json = JSON.parse(body);
		res.send(json);

	});
});

app.get('/list', function (req, res) {//When the users select a list, this will show the list of birds
	console.log('user accessing list');
	con.query('select b.* from user as u ' +
	'join userlistxref as x on u.userID = x.userID ' +
	'join list as l on x.listID = l.listID ' +
	'join bird as b on l.listElement = b.birdID ' +
	'where u.userName = "' + req.query.username + '";',
	function (err, result, fields) {
		if (err)
			console.log("Error gettting table");
		else {
			res.send(result);
		}
	});
});

//endpoint for adding a bird to the user's to-see list
app.get( '/add', function( req, res ) {
	console.log( req.query.username + ' adding ' + req.query.name + ' to watch list' );
	con.query('select x.* from user as u ' +
				'join userlistxref as x on u.userID = x.userID ' +
				'where u.userName = "' + req.query.username + '";', function(err, result, fields) {

		if (err) throw err;
		if (result.length > 0) {
			con.query('select b.* from user as u ' +
			'join userlistxref as x on u.userID = x.userID ' +
			'join list as l on x.listID = l.listID ' +
			'join bird as b on l.listElement = b.birdID ' +
			'where u.userName = "' + req.query.username + '" ' +
			'and b.commonName = "' + req.query.name + '";',
			function(err, innerResult) {
				if (innerResult.length == 0)
				{
					con.query('insert into list (listID, listElement, listElementRank) ' +
								'values (' + result[0].listID + ', (SELECT birdID FROM bird WHERE commonName = \'' + req.query.name + '\'), NULL);', function(err, result, fields) {
								
						if (err) throw err;
					});
				}
			});
		}
		else {
			con.beginTransaction(function (err) {
				if (err) throw err;
				con.query('insert into list (listID, listElement, listElementRank) ' +
							'values (coalesce((SELECT MAX(listID) FROM userlistxref) + 1, 1), (SELECT birdID FROM bird WHERE commonName = "' + req.query.name + '"), 1);', function (err) {
					if (err) {
						con.rollback(function() {
							throw err;
						});
					}
					con.query('insert into userlistxref (userID, listID) ' +
								'values ((SELECT userID FROM user WHERE userName = "' + req.query.username + '"), (SELECT MAX(listID) FROM list));', function (err) {
						if (err) {
							con.rollback(function() {
								throw err;
							});
						}
						con.commit(function(err) {
							if (err) { 
							  	con.rollback(function() {
									throw err;
							  	});
							}
						});
					});
				});
			});
		}
	});
});

//endpoint for adding a bird to the user's seen list
app.get( '/check', function( req, res ) {
	con.query('delete l from user as u ' +
			'join userlistxref as x on u.userID = x.userID ' +
			'join list as l on x.listID = l.listID ' +
			'join bird as b on l.listElement = b.birdID ' +
			'where u.userName = "' + req.query.username + '" ' +
			'and b.commonName = "' + req.query.name + '";',
			function(err) {
		if (err) throw err;
		
	});
});

app.get('/login', function (req, res) {
	con.query('SELECT * FROM user WHERE userName=\'' + req.query.username + '\' AND userPass = \'' + req.query.password + '\';', function (err, result, fields) {
		if (err) throw err;
		if (result.length > 0) {
			var json = { "authentication": "passed" };
			res.send(json);
		}
		else {
			var json = { "authentication": "failed" };
			res.send(json);
		}
	});
});

app.get('/initdb', function (req, res) {
	var URL = 'https://ebird.org/ws1.1/ref/taxa/ebird?cat=species&fmt=json&locale=en_US';

	request(URL, function (error, response, body) {
		var json = JSON.parse(body);
		var sql = "INSERT INTO bird (commonName, scientificName) VALUES ";
		json.forEach((bird, index) => {
			sql += "('" + bird.comName.replace('"', '').replace(/'/g, "\\'") + "', '" + bird.sciName + "'),";
		});
		//sql.replace(/.$/, ";");
		sql = sql.substr(0, sql.length - 1) + ";";
		con.query(sql, function (err, result) {
			if (err) throw err;
		});
	});
});

var server = app.listen(8080, function () {// notifies in the command prompt that the server is running
	console.log('Server started on port ' + server.address().port)
}); 