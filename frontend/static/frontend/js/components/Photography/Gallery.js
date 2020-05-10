import React, { Component } from 'react';
import { Image } from 'cloudinary-react';
import { withRouter } from 'react-router-dom';
import Masonry from 'masonry-layout/masonry';
import imagesLoaded from 'imagesloaded/imagesloaded';
import { SRLWrapper } from 'simple-react-lightbox';
import './Gallery.css';


class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
        };

        this.handlePhotos = this.handlePhotos.bind(this);
    }

    componentDidMount() {
        this.handlePhotos();
    }

    handlePhotos() {
        let { photogPage, clientPage } = this.props.match.params;
        let slug = (photogPage)
            ? photogPage
            : 'latest';
        if (clientPage) slug = `clients/${clientPage}`;
        fetch(`/api/photography/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                this.setState({ images: data.images || [] });
                const grid = document.querySelector('.grid')
                const msnry = new Masonry(grid, {
                    itemSelector: '.grid-item',
                    columnWidth: '.grid-sizer',
                    percentPosition: true,
                });
                const imgLoad = new imagesLoaded(grid);
                imgLoad.on('progress', () => {
                    msnry.layout();
                });
                imgLoad.on('done', () => {
                    msnry.layout();
                });
                imgLoad.on('always', () => {
                    msnry.layout();
                });
            });
    }

    render() {
        var gridItem = '';
        return (
            <div className='grid text-center'>
                <div className='grid-sizer'></div>
                <SRLWrapper>
                    {this.state.images.map((im, i) => {
                        if (im.width > 2*im.height) {
                            gridItem = 'grid-item--width3';
                        } else if (im.width > im.height && im.width < 2*im.height) {
                            gridItem = 'grid-item--width2';
                        } else {
                            gridItem = 'grid-item';
                        }

                        return (
                            <div key={i} className={`grid-item ${gridItem} px-md-2 px-lg-3 px-0 py-2 mx-0`}>
                                <Image
                                    publicId={im.publicId}
                                    cloudName='kdphotography-assets'
                                    responsive
                                    responsiveUseBreakpoints
                                    crop='scale'
                                    dpr='auto'
                                    width='auto'
                                    className='cld-shadow img-fluid mb-2'
                                    />
                            </div>
                        );
                    })}
                </SRLWrapper>
            </div>
        );
    }
}

export default withRouter(Gallery);
