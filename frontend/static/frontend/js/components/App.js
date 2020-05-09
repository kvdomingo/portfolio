import React from 'react';
import AOS from 'aos';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Routes from './Routes';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            base: 'beta',
        };
    }

    componentDidMount() {
        AOS.init();
    }

    render() {
        return (
            <div>
                <Router>
                    <Navbar { ...this.state } />
                    <Routes { ...this.state } />
                    <Footer { ...this.state } />
                </Router>
            </div>
        );
    }
}
