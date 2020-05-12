import React, { Component } from 'react';
import {
    MDBTypography as Typography,
    MDBIcon as Icon,
    MDBBadge as Badge,
} from 'mdbreact';
import { withRouter } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import dateFormat from 'dateformat';
import JsxParser from 'react-jsx-parser';
import MathJax from 'react-mathjax';
import Cite from './Cite';
import Figure from './Figure';
import './Svip.css';


export default withRouter(class Post extends Component {
    constructor(props) {
        super(props);
        let { postSlug } = this.props.match.params;
        let post = this.props.posts.find(post => (postSlug === post.slug));
        this.state = {
            isLoaded: false,
            post,
        };

        this.node = React.createRef();
    }

    render() {
        let { created } = this.state.post;
        created = dateFormat(created, 'HH:MM, d mmm yyyy');
        return (
            <div>
                <Typography tag='h1'>{this.state.post.title}</Typography>
                <Icon far icon='clock' className='mr-1 text-muted'></Icon>
                <p className='text-muted d-inline'>{created}</p>
                <div className='my-5' ref={this.node}>
                    <MathJax.Provider>
                        <JsxParser
                            components={{ React, MathJax, Image, Figure, Cite }}
                            jsx={this.state.post.body}
                            />
                    </MathJax.Provider>
                </div>
                <div className='my-5'>
                    <Typography tag='h4'>Keywords</Typography>
                    {this.state.post.keywords.split(', ').map((keyword, i) => (
                        <Badge key={i} color='light' className='m-1'>{keyword}</Badge>
                    ))}
                </div>
            </div>
        );
    }
})
