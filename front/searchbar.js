function searchBar() {
    document.cookie = "birdSearch=" + document.getElementsByClassName( "searchBar" )[0].value + "; path=/";
    window.location.href = "http://localhost:8080/front/search.html";
}