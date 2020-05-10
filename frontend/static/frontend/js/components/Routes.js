import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./Landing/Landing'));
const CurrVitae = lazy(() => import('./CurrVitae/CurrVitae'));
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
            <Suspense fallback={
                    <div className='text-center my-5 mt-5 py-5 pt-5'>
                        <div className='spinner-grow spinner-grow-lg' />
                        <p className='lead mt-3'>Loading...</p>
                    </div>
                }
                >
                <Switch>
                    <Route exact path={`/${base}`} component={Home} />
                    <Route exact path={`/${base}/cv`} component={CurrVitae} />
                    <Route path={`/${base}/photography`} component={Photography} />

                    <Route component={Err404} />
                </Switch>
            </Suspense>
        );
    }
}
