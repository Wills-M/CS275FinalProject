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
			for (i = 0; i < msg.length; i++) {
				html_str += `
				<div class="resultItem whiteBkg">
		            <div class="birdImg" name="` + msg[i].comName + `" onclick="getBird(this.attributes)"></div>
		            <span name="` + msg[i].comName + `" onclick="getBird(this.attributes)">` + msg[i].comName + `</span>
		            <div class="butCont">
		                <button name="` + msg[i].comName + `" onclick="toAddList(this.attributes)"><img src="assets/icons/add.svg" alt=""></button>
		                <button name="` + msg[i].comName + `" onclick="toCheckList(this.attributes)"><img src="assets/icons/check.svg" alt=""></button>
		            </div>
	       	 	</div>`
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

function myMap() {
    var mapCanvas = document.getElementsByClassName("map")[0];
    var mapOptions = {
        center: new google.maps.LatLng(10, 10), zoom: 13
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
}

getLoc();