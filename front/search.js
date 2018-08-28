//Handle search box and redirect to search result page
function getSearch() {
	var searchItem = document.getElementById("searchBar").value;
	//On Enter press
	if (event.keyCode == 13) {
		//Create URL to localhost search page
		var URL = "http://localhost:8080/search?name=" + searchItem;
		alert(URL);
		
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
		// var html_str = "";
		// for (i = 0; i < jsonObj.birds.length; i++) {
		// 	html_str += `
		// 	<div class="resultItem whiteBkg">
	 //            <div class="birdImg" name="` + jsonObj.birds[i].name + `" onclick="getBird(this.attributes)"></div>
	 //            <span name="` + jsonObj.birds[i].name + `" onclick="getBird(this.attributes)">` + jsonObj.birds[i].name + `</span>
	 //            <div class="butCont">
	 //                <button name="` + jsonObj.birds[i].name + `" onclick="toAddList(this.attributes)"><img src="assets/icons/add.svg" alt=""></button>
	 //                <button name="` + jsonObj.birds[i].name + `" onclick="toCheckList(this.attributes)"><img src="assets/icons/check.svg" alt=""></button>
	 //            </div>
  //      	 	</div>`;
		// }
		// document.getElementsByClassName("resultDisp")[0].innerHTML = html_str;
		// for (i = 0; i < jsonObj.birds.length; i++) {
		// 	document.getElementsByClassName("birdImg")[i].style.backgroundImage = "url('" + jsonObj.birds[i].imageURL + "')";
		// }

		//Construct AJAX request to localhost
		$.ajax({
			type: "GET",
			url: URL,
			data: "{}",
			dataType: "json",
			success: function(msg){
				var html_str = "";
				for (i = 0; i < msg.birds.length; i++) {
					html_str += `
					<div class="resultItem whiteBkg">
			            <div class="birdImg" name="` + msg.birds[i].name + `" onclick="getBird(this.attributes)"></div>
			            <span name="` + msg.birds[i].name + `" onclick="getBird(this.attributes)">` + msg.birds[i].name + `</span>
			            <div class="butCont">
			                <button name="` + msg.birds[i].name + `" onclick="toAddList(this.attributes)"><img src="assets/icons/add.svg" alt=""></button>
			                <button name="` + msg.birds[i].name + `" onclick="toCheckList(this.attributes)"><img src="assets/icons/check.svg" alt=""></button>
			            </div>
		       	 	</div>`
				}
				document.getElementsByClassName("resultDisp")[0].innerHTML = html_str;
				for (i = 0; i < msg.birds.length; i++) {
					document.getElementsByClassName("birdImg")[i].style.backgroundImage = "url('" + msg.birds[i].imageURL + "')";
				}
			},
			error: function(xhr, ajaxOptions, thrownError){
				alert("Error connecting to localhost!");
			}
		});
	}
}

//Handle Locate button onclick and get location using geolocation api
function getLocation() {
	window.location.href = "map.html";
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(sendLocation);
    // } else { 
    //     alert("Geolocation is not supported by this browser.");
    // }
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
			var html_str = "";
			for (i = 0; i < msg.birds.length; i++) {
				html_str += `
				<div class="resultItem whiteBkg">
		            <div class="birdImg" name="` + msg.birds[i].name + `" onclick="getBird(this.attributes)"></div>
		            <span name="` + msg.birds[i].name + `" onclick="getBird(this.attributes)">` + msg.birds[i].name + `</span>
		            <div class="butCont">
		                <button name="` + msg.birds[i].name + `" onclick="toAddList(this.attributes)"><img src="assets/icons/add.svg" alt=""></button>
		                <button name="` + msg.birds[i].name + `" onclick="toCheckList(this.attributes)"><img src="assets/icons/check.svg" alt=""></button>
		            </div>
	       	 	</div>`
			}
			document.getElementsByClassName("resultDisp")[0].innerHTML = html_str;
			for (i = 0; i < msg.birds.length; i++) {
				document.getElementsByClassName("birdImg")[i].style.backgroundImage = "url('" + msg.birds[i].imageURL + "')";
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
		dataType: "json",
		success: function(msg){
			alert("No error connecting to localhost!");
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert("Error connecting to localhost!" + attributes.name.value);
		}
	});
}

//Handle Add button on Search page
function toAddList(attributes) {
	alert("To Add List " + attributes.name.value);
	//Create URL to localhost to add to add list
	var URL = "http://localhost:8080/add?username=dummy&name=" + attributes.name.value;
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

//Handle Check button on Search page
function toCheckList(attributes) {
	alert("To Check List " + attributes.name.value);
	//Create URL to localhost to add to check list
	var URL = "http://localhost:8080/check?username=dummy&name=" + attributes.name.value;
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