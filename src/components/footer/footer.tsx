import { DownloadApp } from '@components/download-app';
import { Button } from 'antd';
import { PATH } from '@constants/index';
import { Link } from 'react-router-dom';

import styles from './footer.module.scss';

export const Footer = () => (
    <footer className={styles.footer}>
        <Button type='link' size='large'>
            <Link to={PATH.FEEDBACKS}>Смотреть отзывы</Link>
        </Button>
        <DownloadApp />
    </footer>
);
