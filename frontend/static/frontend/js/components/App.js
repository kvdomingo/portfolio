import React from 'react';
import AOS from 'aos';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Routes from './Routes';


export default class App extends React.Component {
    componentDidMount() {
        AOS.init();
    }

    render() {
        return (
            <Router>
                <Navbar />
                <Routes />
                <Footer />
            </Router>
        );
    }
}
