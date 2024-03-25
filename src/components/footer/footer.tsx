import { Link } from 'react-router-dom';
import { DownloadApp } from '@components/download-app';
import { DATA_TEST_ID, PATH } from '@constants/index';
import { Button } from 'antd';

import styles from './footer.module.scss';

export const Footer = () => (
    <footer className={styles.footer}>
        <Button type='link' size='large'>
            <Link to={PATH.FEEDBACKS} data-test-id={DATA_TEST_ID.SEE_REVIEWS}>
                Смотреть отзывы
            </Link>
        </Button>
        <DownloadApp />
    </footer>
);
