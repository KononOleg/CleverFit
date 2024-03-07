import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { Sider } from '@components/sider';
import { Outlet, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { PATH } from '@constants/index';

import styles from './main-layout.module.scss';

export const MainLayout = () => {
    const { pathname } = useLocation();

    const isMainPage = pathname === PATH.MAIN;
    const isCalendarPage = pathname === PATH.CALENDAR;

    return (
        <div className={styles.MainLayout}>
            <Sider />
            <div className={styles.Wrapper}>
                <Header />
                <main
                    className={cn({
                        [styles.Main]: !isCalendarPage,
                        [styles.MainSecond]: isCalendarPage,
                    })}
                >
                    <Outlet />
                </main>
                {isMainPage && <Footer />}
            </div>
        </div>
    );
};
