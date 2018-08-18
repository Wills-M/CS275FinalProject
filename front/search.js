//Handle search box and redirect to search result page
function getSearch() {
	var searchItem = document.getElementById("searchBar").value;
	//On Enter press
	if(event.keyCode==13) {
		//Create URL to localhost search page
		var URL = "http://localhost:8080/search?name=" + searchItem;
		alert(URL);
		
		//Construct AJAX request to localhost
		$.ajax({
			type: "GET",
			url: URL,
			data: "{}",
			dataType: "json",
			success: function(msg){
				alert("No error connecting to localhost!");
			},
			error: function(xhr, ajaxOptions, thrownError){
				alert("Error connecting to localhost!");
			}
		});
	}
}

//Handle Locate button onclick and get location using geolocation api
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocation);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}

//Send location (latitude, longtitude) to server and redirect to map page
function sendLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

    //Create URL to localhost map page
	var URL = "http://localhost:8080/map?lat=" + latitude + "&long=" + latitude;
	alert(URL);
	
	//Construct AJAX request to localhost
	$.ajax({
		type: "GET",
		url: URL,
		data: "{}",
		dataType: "json",
		success: function(msg){
			alert("No error connecting to localhost!");
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert("Error connecting to localhost!");
		}
	});
}

//Handle logout onclick
function logout() {
	window.location.href = "login.html";
}

//Handle list option onclick in Menu panel and redirect to list page
function getList(id) {
	var listID = id;

	//Create URL to localhost list page
	var URL = "http://localhost:8080/list?id=" + listID;
	
	//Construct AJAX request to localhost
	$.ajax({
		type: "GET",
		url: URL,
		data: "{}",
		dataType: "json",
		success: function(msg){
			alert("No error connecting to localhost!");
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert("Error connecting to localhost!");
		}
	});
}

//Handle bird item onclick and redirect to bird description page
function getBird(attributes) {
	//Create URL to localhost list page
	var URL = "http://localhost:8080/bird?name=" + attributes.name.value;
	
	//Construct AJAX request to localhost
	$.ajax({
		type: "GET",
		url: URL,
		data: "{}",
		dataType: "json",
		success: function(msg){
			alert("No error connecting to localhost!");
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert("Error connecting to localhost!");
		}
	});
}