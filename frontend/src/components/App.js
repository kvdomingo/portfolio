import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'mdbreact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.activePageHandler = this.activePageHandler.bind(this);

        this.state = {
            activePage: 'home',
            activePageHandler: this.activePageHandler,
            urlPrefix: '',
        };
    }

    componentWillMount() {
        if (window.location.pathname === '/beta') {
            this.setState({ urlPrefix: '/beta' });
        }
    }

    componentDidMount() {
        AOS.init();
    }

    toggleCollapse() {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    }

    activePageHandler(e, activePage) {
        this.setState({ activePage });
    }

    render() {
        return (
            <div>
                <Router>
                    <Navbar { ...this.state } />

                    <Switch>
                        <Route exact path={`${this.state.urlPrefix}/`}>
                            <Home { ...this.state } />
                        </Route>
                    </Switch>

                    <Footer { ...this.state } />
                </Router>
            </div>
        );
    }
}
