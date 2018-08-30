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

    var URL = 'http://localhost:8080/map?lat=' + pos.lat + "?long=" + pos.lng;
    console.log("GET request: " + URL);
    $.ajax({
        type: 'GET',
        url: URL,
        data: '{}',
        dataType: 'json',
        success: function( msg ) {
            alert( JSON.stringify( msg ));
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