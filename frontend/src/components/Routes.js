import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./Landing/Home'));
const Err404 = lazy(() => import('./404'));


export default class Routes extends React.Component {
    render() {
        return (
            <Suspense fallback=''>
                <Switch>
                    <Route
                        exact
                        path={`/${this.props.urlPrefix}`}
                        component={Home} />}
                        />

                    <Route component={Err404} />
                </Switch>
            </Suspense>
        );
    }
}
