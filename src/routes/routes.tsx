import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthorizationLayout } from '@components/authorization-layout';
import { Layout } from '@components/layout';
import { MainLayout } from '@components/main-layout';
import { ProtectedRoute } from '@components/protected-route';
import { AUTH_TAB } from '@constants/auth-tab';
import { AchievementsPage } from '@pages/achievements-page';
import { AuthorizationPage } from '@pages/authorization-page';
import { AuthorizationResultPage } from '@pages/authorization-result-page';
import { CalendarPage } from '@pages/calendar-page';
import { ChangePasswordPage } from '@pages/change-password-page';
import { ConfirmEmailPage } from '@pages/confirm-email-page';
import { FeedbacksPage } from '@pages/feedbacks-page';
import { MainPage } from '@pages/main-page';
import { NotFoundPage } from '@pages/not-found-page';
import { ProfilePage } from '@pages/profile-page';
import { SettingsPage } from '@pages/settings-page';
import { TrainingPage } from '@pages/training-page';

import { PATH } from './path';

export const routes = (
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
                <Route element={<ProtectedRoute />}>
                    <Route path={PATH.SETTINGS} element={<SettingsPage />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path={PATH.TRAINING} element={<TrainingPage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path={PATH.ACHIEVEMENTS} element={<AchievementsPage />} />
                </Route>
            </Route>

            <Route element={<MainLayout isShowHeader={false} />}>
                <Route element={<ProtectedRoute />}>
                    <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
                </Route>
            </Route>
            <Route element={<AuthorizationLayout />}>
                <Route path={PATH.AUTH} element={<AuthorizationPage tab={AUTH_TAB.LOGIN} />} />
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
);