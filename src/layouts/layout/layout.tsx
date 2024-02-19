import React from 'react';

import styles from './layout.module.scss';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => (
    <div className={styles.layout}>
        <div className={styles.layoutWrapper}>
            <Outlet />
        </div>
    </div>
);
