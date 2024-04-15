import { Typography } from 'antd';

import notFoundActivity from '../../../../assets/images/not-found-activity.png';

import styles from './not-found-activity.module.scss';

type Props = {
    title: string;
};

export const NotFoundActivity = ({ title }: Props) => (
    <div className={styles.NotFoundActivity}>
        <img src={notFoundActivity} alt='notFoundActivity' />
        <Typography.Title className={styles.Title} level={3}>
            {title}
        </Typography.Title>
    </div>
);
