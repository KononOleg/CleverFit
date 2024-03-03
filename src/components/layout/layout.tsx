import { Loading } from '@components/loading';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector, fetchingSelector } from '@redux/selectors';
import { checkAuth, setToken } from '@redux/reducers/auth-slice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './layout.module.scss';


export const Layout = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(authSelector);
    const isFetching = useAppSelector(fetchingSelector);

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

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return (
        <>
            {isFetching && <Loading />}
            <div className={styles.layout}>
                <div className={styles.layoutWrapper}>{!isLoading && <Outlet />}</div>
            </div>
        </>
    );
};
