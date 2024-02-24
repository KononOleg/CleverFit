import React from 'react';

import styles from './layout.module.scss';
import { Outlet } from 'react-router-dom';
import { Loading } from '@components/loading';
import {
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useLoginMutation,
    useRegistrationMutation,
} from '@redux/services/auth-service';

export const Layout: React.FC = () => {
    const [, { isLoading: isLoginLoading }] = useLoginMutation();
    const [, { isLoading: isRegistrationLoading }] = useRegistrationMutation();
    const [, { isLoading: isCheckEmailLoading }] = useCheckEmailMutation();
    const [, { isLoading: isConfirmEmailLoading }] = useConfirmEmailMutation();

    return (
        <>
            {(isLoginLoading ||
                isRegistrationLoading ||
                isCheckEmailLoading ||
                isConfirmEmailLoading) && <Loading />}
            <div className={styles.layout}>
                <div className={styles.layoutWrapper}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};
