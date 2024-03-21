import 'antd/dist/antd.css';
import 'normalize.css';
import './index.scss';
import './index.variables.scss';
import './index.global.scss';

import { AuthorizationLayout } from '@components/authorization-layout';
import { Layout } from '@components/layout';
import { MainLayout } from '@components/main-layout';
import { ProtectedRoute } from '@components/protected-route';
import { AuthorizationPage } from '@pages/authorization-page';
import { AuthorizationResultPage } from '@pages/authorization-result-page';
import { CalendarPage } from '@pages/calendar-page';
import { ChangePasswordPage } from '@pages/change-password-page';
import { ConfirmEmailPage } from '@pages/confirm-email-page';
import { FeedbacksPage } from '@pages/feedbacks-page';
import { MainPage } from '@pages/main-page';
import { ProfilePage } from '@pages/profile-page';
import { history, store } from '@redux/configure-store';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';

import { AUTH_TAB, PATH } from './constants';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path={PATH.ROOT} element={<Navigate to={PATH.MAIN} />} />
                        <Route element={<MainLayout />}>
                            <Route element={<ProtectedRoute />}>
                                <Route path={PATH.MAIN} element={<MainPage />} />
                            </Route>
                            <Route element={<ProtectedRoute />}>
                                <Route path={PATH.FEEDBACKS} element={<FeedbacksPage />} />
                            </Route>
                            <Route element={<ProtectedRoute />}>
                                <Route path={PATH.CALENDAR} element={<CalendarPage />} />
                            </Route>
                            <Route element={<ProtectedRoute />}>
                                <Route path={PATH.PROFILE} element={<ProfilePage />} />
                            </Route>
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
