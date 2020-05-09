import React, { Component } from 'react';
import { Image } from 'cloudinary-react';
import { withRouter } from 'react-router-dom';
import './Gallery.css';


class Gallery extends Component {
    render() {
        let slug = this.props.match.params.photogPage;
        return (
            <div className='grid text-center'>
                <div className='grid-sizer'></div>
                <h2>{(slug)
                        ? slug
                        : 'latest'
                    }
                </h2>
            </div>
        );
    }
}

export default withRouter(Gallery);
