import React from 'react';

import styles from './layout.module.scss';
import { Outlet } from 'react-router-dom';
import { Loading } from '@components/loading';
import { useLoginMutation, useRegistrationMutation } from '@redux/services/auth-service';

export const Layout: React.FC = () => {
    const [, { isLoading: isLoginLoading }] = useLoginMutation();
    const [, { isLoading: isRegistrationLoading }] = useRegistrationMutation();

    return (
        <>
            {(isLoginLoading || isRegistrationLoading) && <Loading />}
            <div className={styles.layout}>
                <div className={styles.layoutWrapper}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};
