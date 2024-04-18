import { Typography } from 'antd';

import styles from './marathons.module.scss';

export const Marathons = () => (
    <div className={styles.marathons}>
        <Typography.Title level={3} className={styles.title}>
            В данный период <br /> ни один марафон не проводится
        </Typography.Title>
        <Typography.Text type='secondary'>
            Заглядывайте сюда почаще <br /> и ваш первый марафон скоро начнётся.
        </Typography.Text>
    </div>
);
