import React from 'react';

import './Search.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount = () => {

    }
    componentDidMount = () => {

    }

    ShouldCompUpdate = () => {

    }

    componentDidUpdate = () => {

    }
    componentWillReceiveProps = (nextProps) => {

    }
    render = () => {
        //search field
        return (
            <div className="Search">
                <div className="form-group">
                    <input value={this.props.search_term} onChange={this.props.handleSearchTermUpdate} id="search_input" className="form-control search__input" type="text" placeholder="keyword"/>
                </div>
            </div>
        );
    };
}

export default Search;
