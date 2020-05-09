import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./Landing/Home'));
const Cv = lazy(() => import('./CV/CV'));
const Err404 = lazy(() => import('./404'));


export default class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onHome: false,
        };
    }

    render() {
        return (
            <Suspense fallback=''>
                <Switch>
                    <Route exact path={`/${this.props.base}`} component={Home} />
                    <Route exact path={`/${this.props.base}/cv`} component={Cv} />

                    <Route component={Err404} />
                </Switch>
            </Suspense>
        );
    }
}
