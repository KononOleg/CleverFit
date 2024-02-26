import { Navigate, Outlet } from 'react-router-dom';

import styles from './authorization-layout.module.scss';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector } from '@redux/configure-store';

import { PATH } from '@constants/index';

export const AuthorizationLayout = () => {
    const { token } = useAppSelector(authSelector);

    if (token !== null || localStorage.getItem('token')) return <Navigate to={PATH.MAIN} />;

    return (
        <div className={styles.authorizationLayout}>
            <div className={styles.authorizationLayoutWrapper}>
                <Outlet />
            </div>
        </div>
    );
};
