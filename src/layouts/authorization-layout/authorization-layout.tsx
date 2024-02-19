import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './authorization-layout.module.scss';

export const AuthorizationLayout: React.FC = () => (
    <div className={styles.authorizationLayout}>
        <div className={styles.authorizationLayoutWrapper}>
            <Outlet />
        </div>
    </div>
);
