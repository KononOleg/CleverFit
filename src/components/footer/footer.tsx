import { Button } from 'antd';
import { DownloadApp } from '@components/download-app';

import styles from './footer.module.scss';

export const Footer = () => (
    <footer className={styles.footer}>
        <Button type='link' size='large'>
            Смотреть отзывы
        </Button>
        <DownloadApp />
    </footer>
);
