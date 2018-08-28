var map;

function getLoc() {
    if( navigator.geolocation ) {
        navigator.geolocation.getCurrentPosition( getLatLong );
    }
    else {
        alert( "No Geolocation functionality" );
    }
}

function getLatLong( position ) {
    var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    map.setCenter( pos );
}

function myMap() {
    var mapCanvas = document.getElementsByClassName("map")[0];
    var mapOptions = {
        center: new google.maps.LatLng(10, 10), zoom: 13
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
}