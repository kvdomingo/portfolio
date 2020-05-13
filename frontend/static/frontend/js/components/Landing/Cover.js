import React from 'react';
import {
    MDBCard as Card,
    MDBCardTitle as CardTitle,
    MDBContainer as Container,
} from 'mdbreact';
import Typing, { Backspace, Delay, Cursor } from 'react-typing-animation';
import { Link } from 'react-router-dom';
import { BaseContext } from '../App';


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
    static contextType = BaseContext;

    render() {
        let carouselTyping = ['physicist', 'full stack developer', 'bioinformatician', 'photographer', 'musician'];
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
                            <div className='h3-responsive my-3'>
                                {'I am a '}
                                <Typing speed={1} className='d-inline' loop={true}>
                                    {carouselTyping.map((text, i) => (
                                        <div className='d-inline' key={text}>
                                            {text}.
                                            <Delay ms={1500} />
                                            <Backspace count={text.length + 5} speed={1} />
                                        </div>
                                    ))}
                                    <Cursor className='text-white white' />
                                </Typing>
                            </div>
                            <p className='my-3 py-3'>
                                I am a graduating BS Applied Physics student from the University of the Philippines-Diliman. For my undergraduate thesis, I joined the Instrumentation Physics Laboratory, with a research concentration on signal, video and image processing. My go-to tech stack for web applications consist of Python/Django for the backend, React.js for the frontend, and PostgreSQL for the DBMS. At night (figuratively speaking), I am a freelance photographer, specializing in portrait, street, and events photography.
                                <br /><br />
                                Inquiries? Collaborations?
                            </p>
                            <Link to={`${this.context}/cv`} className='btn btn-outline-white ml-0'>CV</Link>
                            <a href='mailto:hello@kvdomingo.xyz' className='btn btn-outline-white ml-0'>Contact</a>
                        </Container>
                    </div>
                </Card>
            </div>
        );
    }
}
