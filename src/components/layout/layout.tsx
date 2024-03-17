import { Loading } from '@components/loading';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setisDesktopVersion } from '@redux/reducers/app-slice';
import { checkAuth, setToken } from '@redux/reducers/auth-slice';
import { authSelector, fetchingSelector } from '@redux/selectors';
import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './layout.module.scss';

export const Layout = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(authSelector);
    const isFetching = useAppSelector(fetchingSelector);

    const size = useWindowSize();
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

    useEffect(() => {
        Number(size.width) > 830
            ? dispatch(setisDesktopVersion(true))
            : dispatch(setisDesktopVersion(false));
    }, [dispatch, size]);

    return (
        <>
            {isFetching && <Loading />}
            <div className={styles.layout}>
                <div className={styles.layoutWrapper}>{!isLoading && <Outlet />}</div>
            </div>
        </>
    );
};
