import React from 'react';
import {
    MDBCol as Col,
    MDBRow as Row,
    MDBTypography as Typography,
    MDBContainer as Container,
} from 'mdbreact';
import { Link } from 'react-router-dom';


export default class Development extends React.Component {
    render() {
        return (
            <Container className='py-5' data-aos='fade-up'>
                <Row className='row-cols-1 row-cols-md-2'>
                    <Col className='my-auto'>
                        <Typography tag='h3' variant='h2-responsive' className='mb-3'>Full Stack Development</Typography>
                        <p className='mb-3'>
                            In my spare time, I studied a lot of material on programming, especially in Python, primarily to aid in my course requirements and thesis research. I already had great interest in web development, and took Harvard's CS50 material during downtimes. This encouraged me to study more beyond what was offered in those courses. Now, I can handle full stack web applications, from local development with various tools, up to maintenance and deployment to Heroku.
                        </p>
                        <Link to='/dev' className='btn btn-outline-white mb-3 mb-md-0'>See portfolio</Link>
                    </Col>
                    <Col className='my-auto'>
                        <div className="console">
                            <div className="console-bar px-2">
                                <div className="console-bar-red"></div>
                                <div className="console-bar-yellow"></div>
                                <div className="console-bar-green"></div>
                                <div className="console-bar-title text-center pl-2">
                                    <a href="https://primerdriver.herokuapp.com" target="_blank" rel='noopener noreferrer'>
                                        primerdriver/pdcli.py
                                    </a>
                                </div>
                            </div>
                            <div className="console-body py-4 px-3">
                                <div className="code-command text-left">
                                    <span></span>
                                    <code>
                                        python pdcli.py -M char -s read.fasta -m sub -t C -p 21 -r G
                                    </code>
                                </div>
                                <pre>
                                    <samp className="code-response">
{`|                  | Primer 1                                                                      |
|------------------+-------------------------------------------------------------------------------|
| Forward          | CGATCGTACGGACGCAGCTCGTAGCTACGATCGATCGATCGATCGTACGTACGTACGATCGTACGATCGATCGTACG |
| Reverse          | CGTACGATCGATCGTACGATCGTACGTACGTACGATCGATCGATCGATCGTAGCTACGAGCTGCGTCCGTACGATCG |
| Fwd length       | 77 bp                                                                         |
| Rev length       | 77 bp                                                                         |
| Fwd GC content   | 54.55%                                                                        |
| Rev GC content   | 54.55%                                                                        |
| Fwd melting temp | 94.76 C                                                                       |
| Rev melting temp | 94.76 C                                                                       |
| Fwd mol. weight  | 10083.12 g/mol                                                                |
| Rev mol. weight  | 10074.11 g/mol                                                                |
| Fwd mismatch     | 27.27%                                                                        |
| Rev mismatch     | 27.27%                                                                        |
| Fwd ends in G/C  | True                                                                          |
| Rev ends in G/C  | True                                                                          |`}
                                    </samp>
                                </pre>
                                <div className="code-command">
                                    <code></code>
                                    <span className="cursor"></span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}
