import { PATH } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector } from '@redux/configure-store';
import { Navigate, Outlet } from 'react-router-dom';

import styles from './authorization-layout.module.scss';

export const AuthorizationLayout = () => {
    const { token } = useAppSelector(authSelector);

    if (token) return <Navigate to={PATH.MAIN} />;

    return (
        <div className={styles.authorizationLayout}>
            <div className={styles.authorizationLayoutWrapper}>
                <Outlet />
            </div>
        </div>
    );
};
