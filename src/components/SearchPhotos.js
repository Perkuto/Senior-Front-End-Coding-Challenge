import React from 'react';
import { withRouter } from 'react-router-dom';
import photo from '../utilities/getPhotos';
import getKeyWords from '../utilities/buildSrchTerm';

let photosFound = [];
class SearchPhotos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({ text: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        let newKeywords = getKeyWords(this.state.text);
        
        this.setState({ text: ''});
        this.text.blur();

        //get photos with input keywords
        photo.fetchPhotos(newKeywords, 1, (errorMessage, results) => {
            if(errorMessage) {
                console.log(errorMessage);
            } else {
                photosFound = results;
                this.props.addPhotos(newKeywords, photosFound.page, photosFound.total, photosFound.photo); //return search results
                
                //reset form
                this.setState({ text: ''}); 
                this.text.blur();
                
                //relocate
                this.props.history.push(`/#/${newKeywords}`);
                
            }
        });
    }
    
    render() {
        
        return (
            <div>
                <form className="search" onSubmit={this.handleSubmit}>
                    <input className="search__input"
                        type='text'
                        id='text'
                        name='text'
                        ref={input => {
                            this.text = input;
                        }}
                        placeholder='Search photos'
                        value={this.state.text}
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
        
}
export default withRouter(SearchPhotos);