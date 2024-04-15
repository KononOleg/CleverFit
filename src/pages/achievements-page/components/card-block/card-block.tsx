import { calculateActivityDate } from '@utils/calculate-activity-date';
import { Card, Typography } from 'antd';

import { ActivityList } from '../../../../types';

import styles from './card-block.module.scss';

type Props = {
    activityList: ActivityList;
};

export const CardBlock = ({ activityList }: Props) => {
    const { totalLoad, loadPerDay, totalReplays, totalApproaches } =
        calculateActivityDate(activityList);

    const cardData = [
        { id: 1, value: totalLoad, description: 'Общая нагрузка, кг' },
        { id: 2, value: loadPerDay, description: 'Нагрузка в день, кг' },
        { id: 3, value: totalReplays, description: 'Количество повторений, раз' },
        { id: 4, value: totalApproaches, description: 'Подходы, раз' },
    ];

    return (
        <div className={styles.CardBlock}>
            {cardData.map(({ id, value, description }) => (
                <Card className={styles.Card} key={id}>
                    <div className={styles.CardBody}>
                        <Typography.Title level={1}>{value}</Typography.Title>
                        <span className={styles.Description}>{description}</span>
                    </div>
                </Card>
            ))}
        </div>
    );
};
