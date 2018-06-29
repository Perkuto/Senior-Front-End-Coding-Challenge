import React from 'react';
import './App.css';

import Search from './Search.js';
import Images from './Images.js';

class App extends React.Component {
    searchTimeout = false;

    constructor(props) {
        super(props);
        var searchTerm = window.location.hash.substr(2);
        //set the state with search term, page, hashvalue and images
        this.state = {"searchTerm": searchTerm, "page": 1, "hashValue": searchTerm, "images": []};
    }

    componentWillMount = () => {

    }
    componentDidMount = () => {
        //load photos to start
        this.loadPhotos();
        //listen for scroll events
        window.addEventListener('scroll', this.handleScroll);
    }

    ShouldCompUpdate = () => {

    }

    componentDidUpdate = () => {

    }

    componentWillReceiveProps = (nextProps) => {

    }
    componentWillUnmount = () => {
        //remove the scroll event listener
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        //check for scroll position
        let pageHeight = document.documentElement.offsetHeight;
        let windowHeight = window.innerHeight;
        let scrollPosition = window.scrollY || window.pageYOffset
            || document.body.scrollTop + ((document.documentElement && document.documentElement.scrollTop) || 0);

        //if at bottom load more photos
        if (pageHeight <= windowHeight + scrollPosition) {
            this.loadPhotos();
        }
    }

    setSearchHash = () => {
        //set hash to the current search term
        window.location.hash = "/" + this.state.searchTerm;
    }

    loadPhotos = (newSearch) => {
        let _this = this;
        const apiKey = "a3a1376d71af64c75029c421cee1c731";
        //create the flickr url
        let flickerAPIURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + apiKey + "&per_page=25&format=json&nojsoncallback=1";
        //set current page
        let page = this.state.page;
        //if this is a new search, lets reset page and images
        if (newSearch) {
            page = 1;
            this.setState({"page": page, "images": []});

        }
        //set url hash
        this.setSearchHash();

        //if there is no search term, don't search
        if (!this.state.searchTerm) {
            return;
        }
        //lets create a new url with search term and page number
        let newURL = flickerAPIURL;
        newURL += "&page=" + page;
        if (this.state.searchTerm) {
            newURL += "&text=" + this.state.searchTerm;
        }
        newURL = encodeURI(newURL);

        //fetch the images
        fetch(newURL)
            .then(res => res.json())
            .then(
                (result) => {
                    //store new images after processsed
                    _this.setState({

                        images: _this.processPhotos(result.photos)
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    _this.setState({

                        error
                    });
                }
            )
    }


    processPhotos = (photos) => {
        //copy the current state images into a new variable
        let _images = [...this.state.images]
        if (photos) {
            if (photos.photo) {
                //loop through photos
                for (var i in photos.photo) {
                    //get thumbnail url
                    var photoURLThumb = this.getPhotoUrl(photos.photo[i], "n");
                    var imageObject = {};
                    //preload image
                    imageObject.image = new Image();
                    imageObject.image.src = photoURLThumb;
                    //get the url for the original photo too
                    imageObject.original = this.getPhotoUrl(photos.photo[i]);
                    //set title for alt and title on image
                    imageObject.title = photos.photo[i].title;
                    _images.push(imageObject);
                }
            }
        }
        return _images;
    }
    getPhotoUrl = (photo, type) => {
        //create photo url depending on type
        let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + "_" + photo.secret;
        if (type) {
            url += "_" + type;
        }
        url += '.jpg';
        return url;
    }

    handleSearchTermUpdate = (e) => {
        //change the search based on user input
        let searchTerm = e.target.value;
        const _this = this;
        //clear the old timeout
        clearTimeout(_this.searchTimeout);
        this.setState({"searchTerm": searchTerm}, function () {
            //lets use a timeout so we don't send a search after every key, instead send after a brief pause in typing
            _this.searchTimeout = setTimeout(function () {
                _this.loadPhotos(true);
            }, 300);
        });
    }
    render = () => {

        return (
            <div className="App">
                <div id="container">
                    <Search search_term={this.state.searchTerm} handleSearchTermUpdate={this.handleSearchTermUpdate}/>
                    <div ref="ImagesContainer">
                        <Images images={this.state.images}/>
                    </div>
                </div>
            </div>
        );
    };
}

export default App;
