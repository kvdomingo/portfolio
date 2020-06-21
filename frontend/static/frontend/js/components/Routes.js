import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

const Home = lazy(() => import('./Landing/Landing')),
    CurrVitae = lazy(() => import('./CurrVitae/CurrVitae')),
    Photography = lazy(() => import('./Photography/Photography')),
    Svip = lazy(() => import('./Svip/Svip')),
    SvipSubject = lazy(() => import('./Svip/Subject')),
    Dev = lazy(() => import('./Dev/Dev')),
    Err404 = lazy(() => import('./404'));


const transitionTimeout = 300,
    transitionName = 'page',
    routes = [
        { path: '/cv', name: 'CV', Component: CurrVitae },
        { path: '/photography', name: 'Photography', Component: Photography },
        { path: '/dev', name: 'Dev', Component: Dev },
        { path: '/svip/:courseSlug', name: 'SVIP-Course', Component: SvipSubject },
        { path: '/svip', name: 'SVIP', Component: Svip },
        { path: '/', name: 'Home', Component: Home },
    ];

export default (
    <Switch>
        {routes.map(({ path, Component }, i) => (
            <Route key={path} path={path}>
                {({ match }) => (
                    <CSSTransition
                        in={match != null}
                        timeout={transitionTimeout}
                        classNames={transitionName}
                        unmountOnExit
                        >
                        <Component />
                    </CSSTransition>
                )}
            </Route>
        ))}

        <Route key='404' status={404}>
            {({ match }) => (
                <CSSTransition
                    in={match != null}
                    timeout={transitionTimeout}
                    classNames={transitionName}
                    unmountOnExit
                    >
                    <Err404 />
                </CSSTransition>
            )}
        </Route>
    </Switch>
);
