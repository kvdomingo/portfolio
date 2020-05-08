import React from 'react';
import {
    MDBCard as Card,
    MDBCardTitle as CardTitle,
    MDBBtn as Button,
    MDBCol as Col,
    MDBRow as Row,
    MDBTypography as Typography,
    MDBContainer as Container,
} from 'mdbreact';
import { Link } from 'react-router-dom';


const styles = {
    coverPhoto: {
        backgroundAttachment: 'fixed',
        backgroundImage: 'url("https://res.cloudinary.com/kdphotography-assets/image/upload/v1/kdphotography/portfolio/static/portfolio/media-private/latest/20180713_1.jpg")',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: 0,
        boxShadow: 'none',
    },
}

export default class Cover extends React.Component {
    render() {
        return (
            <div>
                <Card
                    className='card-image'
                    style={styles.coverPhoto}
                    >
                    <div className='text-white rgba-black-strong h-100 py-5 px-5'>
                        <Container className='py-5' data-aos='fade-up'>
                            <CardTitle tag='h2' className='h1 card-title display-4 my-4 py-2'>
                                Hi, I'm Kenneth!
                            </CardTitle>
                            <p className='lead my-3'>
                                Physicist, programmer, and bioinformatician by day; photographer and musician by night.
                            </p>
                            <p className='my-3 py-3'>
                                I am a graduating BS Applied Physics student from the University of the Philippines-Diliman. For my undergraduate thesis, I joined the Instrumentation Physics Laboratory, with a research concentration on signal, video and image processing. Python is my programming language of choice for general applications. Additionally, my skillset includes web and app development, primarily using Python and React Native frameworks, respectively. Currently, I am also a photographer and the Executive Officer for Promotions and Documentation of UP Iris, a campus-wide photography organization.
                                <br /><br />
                                Inquiries? Collaborations?
                            </p>
                            <Link to={`${this.props.urlPrefix}/cv`} className='btn btn-outline-white ml-0'>CV</Link>
                            <a href='mailto:hello@kvdomingo.xyz' className='btn btn-outline-white'>Contact</a>
                        </Container>
                    </div>
                </Card>
            </div>
        );
    }
}
