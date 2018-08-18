function login() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	//Create URL to home page
	var URL = "http://localhost:8080/login?username=" + username + "&password=" + password;	

	//Construct AJAX request to localhost
	$.ajax({
		type: "GET",
		url: URL,
		data: "{}",
		dataType: "json",
		success: function(msg){
			if (msg.authentication == "passed") {
				window.location.href = "search.html";
			} else {
				alert("Incorrect username or password!");
			}
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert("Error!");
		}
	});	
}