import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { Sider } from '@components/sider';
import { PATH } from '@constants/index';
import cn from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';

import styles from './main-layout.module.scss';

type Props = {
    isShowHeader?: boolean;
    isShowFooter?: boolean;
};

export const MainLayout = ({ isShowHeader = true, isShowFooter = true }: Props) => {
    const { pathname } = useLocation();

    const isMainPage = pathname === PATH.MAIN;
    const isCalendarPage = pathname === PATH.CALENDAR;
    const isProfilePage = pathname === PATH.PROFILE;

    return (
        <div className={styles.MainLayout}>
            <Sider />
            <div className={styles.Wrapper}>
                {isShowHeader && <Header />}
                <main
                    className={cn({
                        [styles.Main]: !isCalendarPage || !isProfilePage,
                        [styles.MainSecond]: isCalendarPage || isProfilePage,
                    })}
                >
                    <Outlet />
                </main>
                {(isMainPage || isShowFooter) && <Footer />}
            </div>
        </div>
    );
};
