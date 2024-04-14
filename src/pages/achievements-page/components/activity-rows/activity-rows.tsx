import { DD_MM, DDDD } from '@constants/index';
import { getWeekDays } from '@utils/get-week-days';
import { Badge } from 'antd';
import cn from 'classnames';
import moment from 'moment';

import { ActivityList } from '../../../../types';

import styles from './activity-rows.module.scss';

type Props = {
    activityList: ActivityList;
    isFullSize: boolean;
};

type ActivityColumnProps = {
    activityList: ActivityList;
    title: string;
};
export const ActivityRows = ({ activityList, isFullSize }: Props) => (
    <div className={styles.ActivityRows}>
        {isFullSize ? (
            Array(4)
                .fill(0)
                .map((_, index) => {
                    const startIndex = index * 7;
                    const endIndex = index * 7 + 7;
                    const startDay = moment(activityList[startIndex].date).format(DD_MM);
                    const endDay = moment(activityList[endIndex - 1].date).format(DD_MM);

                    return (
                        <ActivityRows.ActivityColumn
                            activityList={activityList.slice(startIndex, endIndex)}
                            title={`Неделя ${startDay}-${endDay}`}
                        />
                    );
                })
        ) : (
            <ActivityRows.ActivityColumn
                activityList={activityList}
                title='Средняя нагрузка по дням недели'
            />
        )}
    </div>
);

ActivityRows.ActivityColumn = ({ activityList, title }: ActivityColumnProps) => (
    <div className={styles.ActivityColumn}>
        <span>{title}</span>
        <div className={styles.ActivityWeek}>
            {activityList.map(({ date, activity }, index) => (
                <div className={styles.ActivityDay} key={date}>
                    <div>
                        <Badge
                            count={index + 1}
                            className={cn(styles.Day, { [styles.DayEmpty]: !activity })}
                            size='small'
                        />
                        <span>{getWeekDays(moment(date).format(DDDD))}</span>
                    </div>

                    {!!activity && <span className={styles.Activity}>{activity} кг</span>}
                </div>
            ))}
        </div>
    </div>
);
