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

