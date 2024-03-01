import { Loading } from '@components/loading';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { setToken } from '@redux/reducers/auth-slice';

import styles from './layout.module.scss';

export const Layout = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => {
        return Object.values({ ...state.api.mutations, ...state.api.queries }).some((query) => {
            return query && query.status === QueryStatus.pending;
        });
    });

    const accessToken = new URLSearchParams(location.search).get('accessToken');

    useEffect(() => {
        if (accessToken)
            dispatch(
                setToken({
                    accessToken,
                    remember: true,
                }),
            );
    }, [accessToken, dispatch]);

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
