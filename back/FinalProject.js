var express = require('express');
var app = express();
app.use(express.static("."));

app.get('/search', function(req, res) {  //When the user enters a bird in the search bar
	
});

app.get('/bird', function(req, res) {  //The description page for a bird
	
});

app.get('/map', function(req, res) {  //The Google Map feature showing the birds in the area
	
});

app.listen(8080, function() {  // notifies in the command prompt that the server is running
	console.log('Server Started..............')
});