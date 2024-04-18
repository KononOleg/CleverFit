import { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { DDDD } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appSelector } from '@redux/selectors';
import { getWeekDays } from '@utils/get-week-days';
import { sortWeekday } from '@utils/sort-weekday';
import { Badge, Button } from 'antd';
import cn from 'classnames';
import moment from 'moment';

import styles from './activity-column.module.scss';

import { ActivityList } from '@/types/index';

type Props = {
    activityList: ActivityList;
    title: string;
    isPieChart?: boolean;
    isFullSize?: boolean;
    key?: string;
};

export const ActivityColumn = ({ activityList, title, isPieChart, isFullSize, key }: Props) => {
    const { isDesktopVersion } = useAppSelector(appSelector);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleCollapsed = () => setIsCollapsed((prevState) => !prevState);

    const showActivityWeek = (!isDesktopVersion && !isCollapsed) || isDesktopVersion || !isFullSize;

    return (
        <div
            className={cn(styles.activityColumn, {
                [styles.activityColumnPie]: isPieChart,
            })}
            key={key}
        >
            <div className={styles.titleWrapper}>
                <span className={styles.title}>{title}</span>
                {!isDesktopVersion && isFullSize && (
                    <Button type='text' onClick={handleCollapsed}>
                        {isCollapsed ? <DownOutlined /> : <UpOutlined />}
                    </Button>
                )}
            </div>
            {showActivityWeek && (
                <div className={styles.activityWeek}>
                    {sortWeekday(activityList).map(({ date, activityPerDay, name }, index) => (
                        <div className={styles.activityDay} key={date}>
                            <Badge
                                count={index + 1}
                                className={cn({
                                    [styles.dayEmpty]: !activityPerDay,
                                    [styles.pieChart]: isPieChart,
                                })}
                                size='small'
                            />
                            <span className={styles.day}>
                                {getWeekDays(moment(date).format(DDDD))}
                            </span>

                            {isPieChart ? (
                                <span className={styles.activity}>{name}</span>
                            ) : (
                                <span className={styles.activity}>
                                    {activityPerDay ? `${activityPerDay} кг` : ''}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
