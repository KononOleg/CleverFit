import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { Sider } from '@components/sider';
import { Outlet } from 'react-router-dom';

import styles from './main-layout.module.scss';

type Props = {
    isBreadcrumb?: boolean;
    isFooterHide?: boolean;
};

export const MainLayout = ({ isBreadcrumb, isFooterHide }: Props) => (
    <div className={styles.MainLayout}>
        <Sider />
        <div className={styles.Wrapper}>
            <Header isBreadcrumb={isBreadcrumb} />
            <main className={styles.Main}>
                <Outlet />
            </main>
            {!isFooterHide && <Footer />}
        </div>
    </div>
);
