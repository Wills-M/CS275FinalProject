function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}

function sendPosition(position) {
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;

    //Create URL to map page
	var URL = "http://localhost:8080/map?lat=" + latitude + "&long=" + latitude;
	
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
			alert("Error connecting to localhost!");
		}
	});
}