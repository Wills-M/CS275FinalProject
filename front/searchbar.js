function searchBar() {
    document.cookie = "birdSearch=" + document.getElementsByClassName( "searchBar" )[0].value + "; path=/";
    window.location.href = "search.html";
}