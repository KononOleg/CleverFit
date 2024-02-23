import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';

import { history, store } from '@redux/configure-store';
import { MainPage } from './pages';
import { AuthorizationLayout } from './layouts/authorization-layout/authorization-layout';
import { AuthorizationPage } from '@pages/authorization-page';
import { Layout } from './layouts/layout';

import 'antd/dist/antd.css';
import 'normalize.css';
import './index.scss';
import './index.variables.scss';
import { AUTH_TAB, PATH } from './constants';
import { AuthorizationResultPage } from '@pages/authorization-result-page';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path={PATH.Main} element={<MainPage />} />
                        <Route element={<AuthorizationLayout />}>
                            <Route
                                path={PATH.Auth}
                                element={<AuthorizationPage tab={AUTH_TAB.Login} />}
                            ></Route>
                            <Route
                                path={PATH.Register}
                                element={<AuthorizationPage tab={AUTH_TAB.Register} />}
                            ></Route>
                            <Route path={PATH.Result} element={<AuthorizationResultPage />}></Route>
                        </Route>
                    </Route>
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
