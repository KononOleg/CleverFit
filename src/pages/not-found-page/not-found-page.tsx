import { NotFound } from '@components/not-found/not-found';
import { Card } from 'antd';

import styles from './not-found-page.module.scss';

export const NotFoundPage = () => (
    <Card className={styles.NotFoundPage}>
        <NotFound />
    </Card>
);
