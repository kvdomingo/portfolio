import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from './Loading';

const Home = lazy(() => import('./Landing/Landing'));
const CurrVitae = lazy(() => import('./CurrVitae/CurrVitae'));
const Photography = lazy(() => import('./Photography/Photography'));
const Svip = lazy(() => import('./Svip/Svip'));
const SvipSubject = lazy(() => import('./Svip/Subject'));
const Dev = lazy(() => import('./Dev/Dev'));
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
            <Suspense fallback={<Loading />}
                >
                <Switch>
                    <Route exact path={`/${base}`} component={Home} />
                    <Route exact path={`/${base}/cv`} component={CurrVitae} />
                    <Route path={`/${base}/photography`} component={Photography} />
                    <Route exact path={`/${base}/svip`} component={Svip} />
                    <Route path={`/${base}/svip/:courseSlug`} component={SvipSubject} />
                    <Route exact path={`/${base}/dev`} component={Dev} />

                    <Route component={Err404} />
                </Switch>
            </Suspense>
        );
    }
}
