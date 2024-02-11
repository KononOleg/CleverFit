import { DownloadApp } from '@components/download-app';
import { Button } from 'antd';
import React from 'react';

import styles from './footer.module.scss';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <Button type='link' size='large'>
                Смотреть отзывы
            </Button>
            <DownloadApp />
        </footer>
    );
};
