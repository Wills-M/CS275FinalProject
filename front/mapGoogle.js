var map;

//runs on load, gets the locatoin of the device
function getLoc() {
    if (navigator.geolocation) {
        console.log("Started");
        navigator.geolocation.getCurrentPosition(getLatLong);
    }
    else {
        alert("No Geolocation functionality");
    }
}

//centers the map and sends an ajax call for a list of birds near lat and long
function getLatLong(position) {
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    map.setCenter(pos);

    var URL = 'http://localhost:8080/map?lat=' + pos.lat + "&lng=" + pos.lng;
    console.log("GET request: " + URL);
    alert(URL);
    $.ajax({
        type: 'GET',
        url: URL,
        data: '{}',
        dataType: 'json',
        success: function( msg ) {
            console.log( 'length: ' + msg.length );
            console.log( JSON.stringify( msg ));
            var html_str = "";
            // var image = 'http://localhost:8080/front/assets/icons/logo.png';
			for (i = 0; i < 50; i++) {
				html_str += `
				<div class="resultItem whiteBkg">
		            <div class="birdImg" name="` + msg[i].comName + `" onclick="getBird(this.attributes)"></div>
		            <span name="` + msg[i].comName + `" onclick="getBird(this.attributes)">` + msg[i].comName + `</span>
		            <div class="butCont">
		                <button name="` + msg[i].comName + `" onclick="toAddList(this.attributes)"><img src="assets/icons/add.svg" alt=""></button>
		                <button name="` + msg[i].comName + `" onclick="toCheckList(this.attributes)"><img src="assets/icons/check.svg" alt=""></button>
		            </div>
                    </div>`;
                
                //adds a map marker for the bird
                var latlng = { lat: msg[i].lat, lng: msg[i].lng };
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: msg[i].comName,
                });
			}
			document.getElementsByClassName("resultDisp")[0].innerHTML = html_str;
			// for (i = 0; i < msg.length; i++) {
			// 	document.getElementsByClassName("birdImg")[i].style.backgroundImage = "url('" + msg[i].birdPic + "')";
            // }
            
        },
        error: function( xhr, ajaxOptions, thrownError ) {
            alert( "Error: " + xhr.status );
        }
    });

}

//Handle bird item onclick and redirect to bird description page
function getBird(attributes) {
	//Create URL to localhost list page
    var URL = "http://localhost:8080/bird?name=" + attributes.name.value;
    console.log( "Calling: " + URL );

	//Construct AJAX request to localhost
	$.ajax({
		type: "GET",
		url: URL,
		data: "{}",
		dataType: "html",
		success: function(msg){
            alert("No error connecting to localhost!");
            alert(URL);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert("Error connecting to localhost!" + attributes.name.value);
			alert(URL);
		}
	});
	window.location.href = URL;
}

function myMap() {
    var mapCanvas = document.getElementsByClassName("map")[0];
    var mapOptions = {
        center: new google.maps.LatLng(10, 10), zoom: 13
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
}

getLoc();