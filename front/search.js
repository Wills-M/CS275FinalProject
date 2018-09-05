//Handle search box and redirect to search result page
function getSearch() {
	var searchItem = $( '#searchBar' ).val();
	//On Enter press
	//if (event.keyCode == 13) {
		//Create URL to localhost search page
		var URL = "http://localhost:8080/search?name=" + searchItem;
		// alert(URL);
		
		//Testing
		// var jsonObj = {"birds": [
		// 					{ 
		// 						"name":"bluejay", 
		// 						"imageURL":"https://i.redd.it/i22p74w864dy.png",
		// 						"description":"localhost:8080/birds/10394810.html"
		// 					},
		// 					{ 
		// 						"name":"dove", 
		// 						"imageURL":"https://i.redd.it/i22p74w864dy.png",
		// 						"description":"localhost:8080/birds/10a54434810.html"
		// 					}
		// 				]
		// 		}
// 		var jsonObj = [
// 		{ 
// 			"commonName":"bluejay", 
// 			"birdPic":"https://i.redd.it/i22p74w864dy.png",
// 			"description":"localhost:8080/birds/10394810.html"
// 		},
// 		{ 
// 			"commonName":"dove", 
// 			"birdPic":"https://i.redd.it/i22p74w864dy.png",
// 			"description":"localhost:8080/birds/10a54434810.html"
// 		}
// ]
// 		var html_str = "";
// 		for (i = 0; i < jsonObj.length; i++) {
// 			html_str += `
// 			<div class="resultItem whiteBkg">
// 	            <div class="birdImg" name="` + jsonObj[i].commonName + `" onclick="getBird(this.attributes)"></div>
// 	            <span name="` + jsonObj[i].commonName + `" onclick="getBird(this.attributes)">` + jsonObj[i].commonName + `</span>
// 	            <div class="butCont">
// 	                <button name="` + jsonObj[i].commonName + `" onclick="toAddList(this.attributes)"><img src="assets/icons/add.svg" alt=""></button>
// 	                <button name="` + jsonObj[i].commonName + `" onclick="toCheckList(this.attributes)"><img src="assets/icons/check.svg" alt=""></button>
// 	            </div>
//        	 	</div>`;
// 		}
// 		document.getElementsByClassName("resultDisp")[0].innerHTML = html_str;
// 		for (i = 0; i < jsonObj.length; i++) {
// 			document.getElementsByClassName("birdImg")[i].style.backgroundImage = "url('" + jsonObj[i].birdPic + "')";
// 		}

		//Construct AJAX request to localhost
		$.ajax({
			type: "GET",
			url: URL,
			data: "{}",
			dataType: "json",
			success: function(jsonObj){
				var html_str = "";
				for (i = 0; i < jsonObj.length; i++) {
					html_str += `
					<div class="resultItem whiteBkg">
			            <div class="birdImg" name="` + jsonObj[i].commonName + `" onclick="getBird(this.attributes)"></div>
			            <span name="` + jsonObj[i].commonName + `" onclick="getBird(this.attributes)">` + jsonObj[i].commonName + `</span>
			            <div class="butCont">
			                <button name="` + jsonObj[i].commonName + `" onclick="toAddList(this.attributes)"><img src="assets/icons/add.svg" alt=""></button>
			                <button name="` + jsonObj[i].commonName + `" onclick="toCheckList(this.attributes)"><img src="assets/icons/check.svg" alt=""></button>
			            </div>
		       	 	</div>`;
				}
				document.getElementsByClassName("resultDisp")[0].innerHTML = html_str;
				for (i = 0; i < jsonObj.length; i++) {
					document.getElementsByClassName("birdImg")[i].style.backgroundImage = "url('" + jsonObj[i].birdPic + "')";
				}
			},
			error: function(xhr, ajaxOptions, thrownError){
				alert("Error connecting to localhost!");
			}
		});
	//}
}

//Handle Locate button onclick and get location using geolocation api
function getLocation() {
	window.location.href = "/front/map.html";
}

//Send location (latitude, longtitude) to server and redirect to map page
function sendLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

    //Create URL to localhost map page
	var URL = "http://localhost:8080/map?lat=" + latitude + "&long=" + latitude;
	
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
	window.location.href = "http://localhost:8080/front/login.html";
}

//Handle list option onclick in Menu panel and redirect to list page
function getList(id) {
	var listID = id;

	//Create URL to localhost list page
	var URL = "http://localhost:8080/list?username=" + readCookie( "username" );
	
	//Construct AJAX request to localhost
	$.ajax({
		type: "GET",
		url: URL,
		data: "{}",
		dataType: "json",
		success: function(msg){
			var html_str = "";
			for (i = 0; i < msg.length; i++) {
				html_str += `
				<div class="resultItem whiteBkg">
		            <div class="birdImg" name="` + msg[i].commonName + `" onclick="getBird(this.attributes)"></div>
		            <span name="` + msg[i].commonName + `" onclick="getBird(this.attributes)">` + msg[i].commonName + `</span>
		            <div class="butCont">
		                <button name="` + msg[i].commonName + `" onclick="toAddList(this.attributes)"><img src="assets/icons/add.svg" alt=""></button>
		                <button name="` + msg[i].commonName + `" onclick="toCheckList(this.attributes)"><img src="assets/icons/check.svg" alt=""></button>
		            </div>
	       	 	</div>`
			}
			document.getElementsByClassName("resultDisp")[0].innerHTML = html_str;
			for (i = 0; i < msg.length; i++) {
				document.getElementsByClassName("birdImg")[i].style.backgroundImage = "url('" + msg[i].birdPic + "')";
			}
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
		dataType: "html",
		success: function(msg){
			//alert("No error connecting to localhost!");
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert("Error connecting to localhost!" + attributes.name.value);
			alert(URL);
		}
	});
	window.location.href = URL;
}

//Handle Add button on Search page
function toAddList(attributes) {
	alert("To Add List " + attributes.name.value);
	//Create URL to localhost to add to add list
	
	var username = readCookie( "username" );
	
	var URL = "http://localhost:8080/add?username=" + username + "&name=" + attributes.name.value;
	//Construct AJAX request to localhost
	$.ajax({
		type: "GET",
		url: URL,
		data: "{}",
		dataType: "html",
		success: function(msg){
			//alert("No error connecting to localhost!");
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert("Error connecting to localhost!" + attributes.name.value);
		}
	});
}

//Handle Check button on Search page
function toCheckList(attributes) {
	alert("To Check List " + attributes.name.value);
	
	var username = readCookie( "username" );
	//Create URL to localhost to add to check list
	var URL = "http://localhost:8080/check?username=" + username + "&name=" + attributes.name.value;
	//Construct AJAX request to localhost
	$.ajax({
		type: "GET",
		url: URL,
		data: "{}",
		dataType: "html",
		success: function(msg){
			alert("No error connecting to localhost!");
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert("Error connecting to localhost!" + attributes.name.value);
		}
	});
}

//checks if we were redirected by another page to search for a bird
function checkRedirect() {
	var bird = readCookie( "birdSearch" );
	// alert( document.cookie );
	// alert( bird );
	if ( bird != "" ) {
		$( '#searchBar' ).val( bird );
		//alert( $( '#searchBar' ).val());
		document.cookie = "birdSearch=; path=/";
		getSearch();
	}
}

//parses cookie string and returns value of chosen field
function readCookie(name) {
	var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	if (match) 
	  return match[2];
	
	  return "";
}

$(document).ready(function () {
	checkRedirect();
});