import { calculateActivityDate } from '@utils/calculate-activity-date';
import { Card, Typography } from 'antd';

import styles from './card-block.module.scss';

import { ActivityList } from '@/types/index';

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
        <div className={styles.cardBlock}>
            {cardData.map(({ id, value, description }) => (
                <Card className={styles.card} key={id}>
                    <div className={styles.cardBody}>
                        <Typography.Title level={1}>{value}</Typography.Title>
                        <span className={styles.description}>{description}</span>
                    </div>
                </Card>
            ))}
        </div>
    );
};
