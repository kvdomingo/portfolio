import React, { Component } from 'react';
import { MDBCol as Col } from 'mdbreact';
import { Image } from 'cloudinary-react';
import PropTypes from 'prop-types';


export default class MultiFigure extends Component {
    static propTypes = {
        subject: PropTypes.string.isRequired,
        folder: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        caption: PropTypes.string,
    };

    render() {
        return (
            <Col className='my-auto'>
                <Image
                    cloudName='kdphotography-assets'
                    secure
                    publicId={`svip/${this.props.subject}/${this.props.folder}/${this.props.url}`}
                    className='img-fluid mx-auto'
                    responsive
                    responsiveUseBreakpoints
                    width='auto'
                    dpr='auto'
                    crop='scale'
                    />
                <div className='subfigure d-inline'>
                    <p className='d-inline'>{this.props.caption}</p>
                </div>
            </Col>
        );
    }
}
