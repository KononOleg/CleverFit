import styles from './layout.module.scss';
import { Outlet } from 'react-router-dom';
import { Loading } from '@components/loading';

import { useAppSelector } from '@hooks/typed-react-redux-hooks';

import { QueryStatus } from '@reduxjs/toolkit/query';

export const Layout = () => {
    const isLoading = useAppSelector((state) => {
        return Object.values(state.api.mutations).some((query) => {
            return query && query.status === QueryStatus.pending;
        });
    });

    return (
        <>
            {isLoading && <Loading />}
            <div className={styles.layout}>
                <div className={styles.layoutWrapper}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};
