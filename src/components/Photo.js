import React from 'react';


export default class Photo extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
            farm: this.props.farm,
            server: this.props.server,
            id: this.props.id,
            secret: this.props.secret,
        }
    }
   
    render() {
        // The image reference URL has the following format:
        // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

        return (
            <figure className="gallery__item ">
                <img src={`https://farm${this.state.farm}.staticflickr.com/${this.state.server}/${this.state.id}_${this.state.secret}.jpg`} alt={`Gallery item ${this.state.id}`}  />
            </figure>
        );
    }

}