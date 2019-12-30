import React from 'react';

export default class Gallery extends React.Component {
    render() {
        return <div className='gallery'>{this.props.children}</div>
    } 
}