import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
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
import './index.global.scss';
import { AUTH_TAB, PATH } from './constants';
import { AuthorizationResultPage } from '@pages/authorization-result-page';
import { ConfirmEmailPage } from '@pages/confirm-email-page';
import { ChangePasswordPage } from '@pages/change-password-page';
import { ProtectedRoute } from './layouts/protected-route';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path={PATH.ROOT} element={<Navigate to={PATH.MAIN} />} />
                    <Route element={<Layout />}>
                        <Route element={<ProtectedRoute />}>
                            <Route path={PATH.MAIN} element={<MainPage />} />
                        </Route>

                        <Route element={<AuthorizationLayout />}>
                            <Route
                                path={PATH.AUTH}
                                element={<AuthorizationPage tab={AUTH_TAB.LOGIN} />}
                            />
                            <Route
                                path={PATH.REGISTER}
                                element={<AuthorizationPage tab={AUTH_TAB.REGISTER} />}
                            />
                            <Route path={PATH.RESULT} element={<AuthorizationResultPage />} />
                            <Route path={PATH.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
                            <Route path={PATH.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
                        </Route>
                    </Route>
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
