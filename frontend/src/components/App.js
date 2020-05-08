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
            homeExp: /^\/(beta)?\/?$/,
            urlPrefix: ''
        };
    }

    componentDidMount() {
        if (window.location.pathname === 'beta') this.setState({ urlPrefix: 'beta' })
        AOS.init();
    }

    toggleCollapse() {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
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
