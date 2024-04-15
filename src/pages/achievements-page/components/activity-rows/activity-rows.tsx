import { DD_MM, DDDD } from '@constants/index';
import { getWeekDays } from '@utils/get-week-days';
import { Badge } from 'antd';
import cn from 'classnames';
import moment from 'moment';

import { ActivityList } from '../../../../types';

import styles from './activity-rows.module.scss';

type Props = {
    activityList: ActivityList;
    isFullSize?: boolean;
    isPieChart?: boolean;
    title?: string;
};

type ActivityColumnProps = {
    activityList: ActivityList;
    title: string;
    isPieChart?: boolean;
};
export const ActivityRows = ({ activityList, isFullSize, isPieChart, title }: Props) => (
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
                title={title || 'Средняя нагрузка по дням недели'}
                isPieChart={isPieChart}
            />
        )}
    </div>
);

ActivityRows.ActivityColumn = ({ activityList, title, isPieChart }: ActivityColumnProps) => (
    <div
        className={cn(styles.ActivityColumn, {
            [styles.ActivityColumnPie]: isPieChart,
        })}
    >
        <span className={styles.Title}>{title}</span>
        <div className={styles.ActivityWeek}>
            {activityList.map(({ date, activity, name }, index) => (
                <div className={styles.ActivityDay} key={date}>
                    <Badge
                        count={index + 1}
                        className={cn({
                            [styles.DayEmpty]: !activity,
                            [styles.PieChart]: isPieChart,
                        })}
                        size='small'
                    />
                    <span className={styles.Day}>{getWeekDays(moment(date).format(DDDD))}</span>

                    {isPieChart ? (
                        <span className={styles.Activity}>{name}</span>
                    ) : (
                        <span className={styles.Activity}>{activity ? `${activity} кг` : ''}</span>
                    )}
                </div>
            ))}
        </div>
    </div>
);
