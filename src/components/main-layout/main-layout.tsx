import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { Sider } from '@components/sider';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { inviteSelector } from '@redux/selectors';
import { useLazyGetInviteListQuery } from '@redux/services/invite-service';
import { PATH } from '@routes/path';
import cn from 'classnames';
import moment from 'moment';

import styles from './main-layout.module.scss';

moment.locale('ru', {
    week: {
        dow: 1,
    },
});

type Props = {
    isShowHeader?: boolean;
};

export const MainLayout = ({ isShowHeader = true }: Props) => {
    const { pathname } = useLocation();
    const { inviteList } = useAppSelector(inviteSelector);
    const [getInviteList] = useLazyGetInviteListQuery();

    useEffect(() => {
        if (inviteList.length === 0) getInviteList();
    }, [getInviteList, inviteList]);

    const isMainPage = pathname === PATH.MAIN;
    const isFeedbacksPage = pathname === PATH.FEEDBACKS;
    const isCalendarPage = pathname === PATH.CALENDAR;
    const isSettingsPage = pathname === PATH.SETTINGS;

    const isMainSecond = isMainPage || isFeedbacksPage;
    const isMainThird = isCalendarPage;
    const isMainFourth = !isMainSecond && !isMainThird;
    const isMainFifth = isSettingsPage;

    return (
        <div className={styles.mainLayout}>
            <Sider />
            <div className={styles.wrapper}>
                {isShowHeader && <Header />}
                <main
                    className={cn(styles.main, {
                        [styles.mainSecond]: isMainSecond,
                        [styles.mainThird]: isMainThird,
                        [styles.mainFourth]: isMainFourth,
                        [styles.mainFifth]: isMainFifth,
                    })}
                >
                    <Outlet />
                </main>
                {isMainPage && <Footer />}
            </div>
        </div>
    );
};
