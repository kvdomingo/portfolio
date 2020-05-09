import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./Landing/Landing'));
const Cv = lazy(() => import('./CV/Cv'));
const Photography = lazy(() => import('./Photography/Photography'));
const Err404 = lazy(() => import('./404'));


export default class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onHome: false,
        };
    }

    render() {
        let base = this.props.base;
        return (
            <Suspense fallback=''>
                <Switch>
                    <Route exact path={`/${base}`} component={Home} />
                    <Route exact path={`/${base}/cv`} component={Cv} />
                    <Route path={`/${base}/photography`} component={Photography} />

                    <Route component={Err404} />
                </Switch>
            </Suspense>
        );
    }
}
