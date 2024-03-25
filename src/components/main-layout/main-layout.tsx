import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { Sider } from '@components/sider';
import { PATH } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { profileSelector } from '@redux/selectors';
import { useLazyGetCurrentUserQuery } from '@redux/services/profile-service';
import cn from 'classnames';

import styles from './main-layout.module.scss';

type Props = {
    isShowHeader?: boolean;
};

export const MainLayout = ({ isShowHeader = true }: Props) => {
    const { pathname } = useLocation();
    const { profile } = useAppSelector(profileSelector);

    const [getCurrentUser] = useLazyGetCurrentUserQuery();

    useEffect(() => {
        if (!profile) getCurrentUser();
    }, [getCurrentUser, profile]);

    const isMainPage = pathname === PATH.MAIN;
    const isFeedbacksPage = pathname === PATH.FEEDBACKS;
    const isCalendarPage = pathname === PATH.CALENDAR;
    const isSettingsPage = pathname === PATH.SETTINGS;

    const isMainSecond = isMainPage || isFeedbacksPage;
    const isMainThird = isCalendarPage;
    const isMainFourth = !isMainSecond && !isMainThird;
    const isMainFifth = isSettingsPage;

    return (
        <div className={styles.MainLayout}>
            <Sider />
            <div className={styles.Wrapper}>
                {isShowHeader && <Header />}
                <main
                    className={cn(styles.Main, {
                        [styles.MainSecond]: isMainSecond,
                        [styles.MainThird]: isMainThird,
                        [styles.MainFourth]: isMainFourth,
                        [styles.MainFifth]: isMainFifth,
                    })}
                >
                    <Outlet />
                </main>
                {isMainPage && <Footer />}
            </div>
        </div>
    );
};
