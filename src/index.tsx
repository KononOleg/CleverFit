import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { store } from '@redux/configure-store';
import { MainPage } from './pages';
import { AuthorizationLayout } from './layouts/authorization-layout/authorization-layout';
import { AuthorizationPage } from '@pages/authorization-page';
import { Layout } from './layouts/layout';

import 'antd/dist/antd.css';
import 'normalize.css';
import './index.scss';
import './index.variables.scss';
import { AUTH_TAB, PATH } from './constants';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path={PATH.Main} element={<MainPage />} />
                        <Route path={PATH.Auth} element={<AuthorizationLayout />}>
                            <Route
                                index
                                element={<AuthorizationPage tab={AUTH_TAB.Login} />}
                            ></Route>
                            <Route
                                path={PATH.Register}
                                element={<AuthorizationPage tab={AUTH_TAB.Register} />}
                            ></Route>
                        </Route>
                    </Route>
                </Routes>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
);
