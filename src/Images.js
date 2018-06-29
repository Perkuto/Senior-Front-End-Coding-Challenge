import React from 'react';

import './Images.css';

class Images extends React.Component {
    constructor(props) {
        super(props);
        this.state = {"images": props.images};
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

        this.setState({"images": nextProps.images});
    }
    render = () => {
        //render the list of images
        var imagesDisplay = "No images found";
        if(this.state.images.length > 0) {
            imagesDisplay =
                <div id="images">
                    {
                        this.state.images.map(function (image, index) {
                            return (
                                <div key={"images-" + index} className="images__image  col-xs-12 col-sm-6 col-md-4 col-lg-3">
                                    <img className="center-block" src={image.image.src} data-original={image.original} alt={image.title} title={image.title}/>
                                </div>
                            )
                        })
                    }
                </div>


        }
        return (
            <div className="Images">

                {imagesDisplay}

            </div>


        );
    };
}

export default Images;
