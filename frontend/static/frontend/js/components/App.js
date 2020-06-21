import React, { Suspense } from 'react';
import AOS from 'aos';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Routes from './Routes';
import Loading from './Loading';


export default class App extends React.Component {
    componentDidMount() {
        AOS.init();
    }

    render() {
        return (
            <Router>
                <Navbar />
                <Suspense fallback={<Loading />}>
                    {Routes}
                </Suspense>
                <Footer />
            </Router>
        );
    }
}
