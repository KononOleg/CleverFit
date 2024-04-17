import { DD_MM } from '@constants/index';
import moment from 'moment';

import { ActivityColumn } from '../activity-column';

import styles from './activity-rows.module.scss';

import { ActivityList } from '@/types/index';

type Props = {
    activityList: ActivityList;
    isFullSize?: boolean;
    isPieChart?: boolean;
    title?: string;
};

export const ActivityRows = ({ activityList, isFullSize, isPieChart, title }: Props) => (
    <div className={styles.activityRows}>
        {isFullSize ? (
            Array(4)
                .fill(0)
                .map((_, index) => {
                    const startIndex = index * 7;
                    const endIndex = index * 7 + 7;
                    const startDay = moment(activityList[startIndex].date).format(DD_MM);
                    const endDay = moment(activityList[endIndex - 1].date).format(DD_MM);

                    return (
                        <ActivityColumn
                            activityList={activityList.slice(startIndex, endIndex)}
                            title={`Неделя ${startDay}-${endDay}`}
                            isFullSize={isFullSize}
                        />
                    );
                })
        ) : (
            <ActivityColumn
                activityList={activityList}
                title={title || 'Средняя нагрузка по дням недели'}
                isPieChart={isPieChart}
            />
        )}
    </div>
);
