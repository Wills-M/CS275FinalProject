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
			var html_str = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
			    <meta charset="UTF-8">
			    <meta name="viewport" content="width=device-width, initial-scale=1.0">
			    <meta http-equiv="X-UA-Compatible" content="ie=edge">
			    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
			    <script type="text/JavaScript" src="bird.js"></script>
			    <script type="text/JavaScript" src="http://localhost:8080/front/searchbar.js"></script>
			    <title>bird.watch</title>

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
			            <li class="menuItem">
			                <label for="menuToggle">Close Menu</label>
			            </li>
			            <li class="menuItem">List 1</li>
			            <li class="menuItem">List 2</li>
			            <li class="menuItem">List 3</li>
			            <li class="menuItem">+ Add List</li>
			            <li class="menuItem">Logout</li>
			        </ul>
			    </div>

			    <div class="resultDisp">
			        <div class="imgCardCont roundCorners">
			            <img class="birdImg roundCorners" src="http://localhost:8080/front/assets/img/example_bird.jpg">
			            <div class="butCont darkGreenBkg">
			                <button><img src="http://localhost:8080/front/assets/icons/add_white.svg" alt=""></button>
			                <button><img src="http://localhost:8080/front/assets/icons/check_white.svg" alt=""></button>
			            </div>
			        </div>
			        <div class="descriptDisp roundCorners whiteBkg bodyFont">
			            <h1 class="headFont">` + result[0].commonName + `</h1>
			            <h2 class="italics gray">` + result[0].scientificName + `</h2>
			            <p>` + result[0].description + `</p>
			        </div>
			    </div>
			</body>
			</html>`;
			res.send(html_str);
			console.log("Getting result");
		}
	});

	// var html_str = `
	// <!DOCTYPE html>
	// <html lang="en">
	// <head>
	//     <meta charset="UTF-8">
	//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
	//     <meta http-equiv="X-UA-Compatible" content="ie=edge">
	//     <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	//     <script type="text/JavaScript" src="bird.js"></script>
	//     <title>bird.watch</title>

	//     <link rel="stylesheet" href="http://localhost:8080/front/css/normalize.css">
	//     <link rel="stylesheet" href="http://localhost:8080/front/css/base.css">
	//     <link rel="stylesheet" href="http://localhost:8080/front/css/bird.css">
	// </head>

	// <body>
	//     <header class="darkGreenBkg">
	//         <label class="menuBut" for="menuToggle">
	//             <img class="whiteFill" src="http://localhost:8080/front/assets/icons/menu.svg" alt="menu button">
	//         </label>
	//         <div class="searchCont">
	//             <input class="searchBar bodyFont" type="text" id="searchBar">
	//             <button class="gpsBut searchBut" onclick="getSearch()">
	//                 <img src="http://localhost:8080/front/assets/icons/round-arrow_forward-24px.svg" alt="">
	//             </button>
	//             <button class="gpsBut" id="gpsBut" onclick="getLocation()"><img class="whiteFill" src="http://localhost:8080/front/assets/icons/gps.svg" alt=""></button>
	//         </div>
	//     </header>

	//     <input class="invisible" id="menuToggle" type="checkbox">
	//     <div class="menuDisp greenBkg">
	//         <ul class="menu">
	//             <li class="menuItem">
	//                 <label for="menuToggle">Close Menu</label>
	//             </li>
	//             <li class="menuItem">List 1</li>
	//             <li class="menuItem">List 2</li>
	//             <li class="menuItem">List 3</li>
	//             <li class="menuItem">+ Add List</li>
	//             <li class="menuItem">Logout</li>
	//         </ul>
	//     </div>

	//     <div class="resultDisp">
	//         <div class="imgCardCont roundCorners">
	//             <img class="birdImg roundCorners" src="http://localhost:8080/front/assets/img/example_bird.jpg">
	//             <div class="butCont darkGreenBkg">
	//                 <button><img src="http://localhost:8080/front/assets/icons/add_white.svg" alt=""></button>
	//                 <button><img src="http://localhost:8080/front/assets/icons/check_white.svg" alt=""></button>
	//             </div>
	//         </div>
	//         <div class="descriptDisp roundCorners whiteBkg bodyFont">
	//             <h1 class="headFont">` + result[0].commonName + `</h1>
	//             <h2 class="italics gray">Lamprotornis purpureus</h2>
	//             <p>The purple starling (Lamprotornis purpureus), also known as the purple glossy starling, is a member of the starling family of birds.</p>
	//             <p>It is a resident breeder in tropical Africa from Senegal and north Zaire east to Sudan and west Kenya. This common passerine is typically found in open woodland and cultivation.</p>

	//         </div>
	//     </div>
	// </body>
	// </html>`;
	// res.send(html_str);
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