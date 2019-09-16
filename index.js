var page;
var loading;
var searchBarInput;

window.addEventListener("load", function() {
    loading = this.document.getElementById("loading");
    searchBarInput = document.getElementById("searchBar").children[0];

    searchBarInput.value = window.location.hash.replace("#", "");

    searchBarInput.addEventListener("keypress", function () {
        window.location.hash = "#" + searchBarInput.value;
        restartRendering();
    });

    var photosHere = document.getElementById("photosHere");

    restartRendering();
});

var restartRendering = function () {
    loading.style.display = "block";

    photosHere.innerHTML = "";

    page = 1;

    queryNextImages(searchBarInput.value, page, false);
}

var continueRendering = function () {
    loading.style.display = "block";

    page++;

    queryNextImages(searchBarInput.value, page);
}

var queryNextImages = function (searchText, page, eightPerPage) {
    if(typeof(searchText) == "undefined") searchText = "";
    if(typeof(page) == "undefined" || !Number.isInteger(page)) page = 1;
    if(typeof(eightPerPage) != "boolean") eightPerPage = true;

    photosHere.parentElement.removeEventListener("scroll", reactToScroll);

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var currentJSON = JSON.parse(this.responseText);

            try {
                for(var i = 0; i < currentJSON.photos.photo.length; i++) {
                    var currentPhoto = currentJSON.photos.photo[i];

                    photosHere.innerHTML += "<div class=\"image\"><img src=\"https://farm"+currentPhoto.farm+".staticflickr.com/"+currentPhoto.server+"/"+currentPhoto.id+"_"+currentPhoto.secret+".jpg\" /></div>";
                }
            }
            catch(ex) { }

            photosHere.parentElement.addEventListener("scroll", reactToScroll);

            loading.style.display = "none";
        }
    };

    var url = "https://www.flickr.com/services/rest/?";
    url += "method=flickr.photos." + (searchText != "" ? "search" : "getRecent");

    url += "&api_key=1dd5bcecfbcee9f734816cff06abb490";
    if(searchText != "") url += "&text="+searchText;
    url += "&per_page="+(eightPerPage ? "8" : "12");
    url += "&page="+page;
    url += "&format=json";
    url += "&nojsoncallback=1";
    // if(searchText != "") {
    //     url += "&api_sig=5b4f6caf8624cfc5b6ee0a1be9aadc85";
    // }
    // else {
    //     url += "&auth_token=72157710832301127-bdad48565da54e10";
    //     if(eightPerPage)
    //         url += "&api_sig=d372e53329374e8d139ace05a6fd0086";
    //     else
    //         url += "&api_sig=8d8a69d54981bc0d68972fda0e6cd2d2";
    // }

    xhttp.open("GET", url, true);

    xhttp.send();
}

var reactToScroll = function (e) {
    var temp = photosHere.clientHeight - document.body.clientHeight;

    if(photosHere.parentElement.scrollTop > photosHere.clientHeight - document.body.clientHeight) {
        continueRendering();
    }
};