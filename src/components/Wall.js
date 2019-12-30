import React from 'react';
import uuid from 'uuid';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfinitScrollDots from './InfinitScrollDots';
import SearchPhotos from './SearchPhotos';
import Photo from './Photo';
import Gallery from './Gallery';
import Container from './Container';
import Search from './Search';
import photo from '../utilities/getPhotos';

export default class Wall extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: '',
            page: 1,
            total: 0,
            listPhotos: [],
            hasMore: true
        }
    
        this.addKeyword = this.addKeyword.bind(this);
        this.addPhotos = this.addPhotos.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
    }

    addKeyword(words)  {
        this.setState({ keywords: words });
    }
    addPhotos(words, page, total, photos)  {
        this.setState({
            keywords: words,
            page: page,
            total: total,
            listPhotos: photos
        })
    }
    fetchMoreData() {
        let photosFound = [];
        if (this.state.listPhotos.length >= this.state.total) {
            this.setState({ hasMore: false });
            return;
        }
        setTimeout(() => {
            photo.fetchPhotos(this.state.keywords, this.state.page+1, (errorMessage, results) => {
                if(errorMessage) {
                    console.log(errorMessage);
                } else {
                    photosFound = results;
                    this.setState({
                        page: photosFound.page,
                        listPhotos: this.state.listPhotos.concat(photosFound.photo)
                    })
                    
                }
            });
        }, 500);
    }

    render() {
        const photoList = this.state.listPhotos.map(item => (
            //format each item into url in about format
            // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

            <Photo
                key={uuid()}
                farm={item.farm}
                server={item.server}
                id={item.id}
                secret={item.secret}
            />
        ));

        return (
            <Container>
                <Search>
                    <SearchPhotos  addPhotos={this.addPhotos}/>
                </Search>
                <InfiniteScroll
                    dataLength={photoList.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    // loader={<h4>Loading...</h4>}
                    loader={
                        <InfinitScrollDots className="icon__infinity"/>
                    }
                    height={800}
                    endMessage={
                        <p>THE END.</p>
                    }
                >
                    <Gallery>
                        {photoList}
                    </Gallery>
                </InfiniteScroll>
            </Container>
        );
    }
}