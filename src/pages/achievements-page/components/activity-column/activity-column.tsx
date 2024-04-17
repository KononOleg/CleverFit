import { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { DDDD } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appSelector } from '@redux/selectors';
import { getWeekDays } from '@utils/get-week-days';
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
};

export const ActivityColumn = ({ activityList, title, isPieChart, isFullSize }: Props) => {
    const { isDesktopVersion } = useAppSelector(appSelector);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleCollapsed = () => setIsCollapsed((prevState) => !prevState);

    return (
        <div
            className={cn(styles.activityColumn, {
                [styles.activityColumnPie]: isPieChart,
            })}
        >
            <div className={styles.titleWrapper}>
                <span className={styles.title}>{title}</span>
                {!isDesktopVersion && isFullSize && (
                    <Button type='text' onClick={handleCollapsed}>
                        {isCollapsed ? <DownOutlined /> : <UpOutlined />}
                    </Button>
                )}
            </div>
            {((!isDesktopVersion && !isCollapsed) || isDesktopVersion || !isFullSize) && (
                <div className={styles.activityWeek}>
                    {activityList.map(({ date, activity, name }, index) => (
                        <div className={styles.activityDay} key={date}>
                            <Badge
                                count={index + 1}
                                className={cn({
                                    [styles.dayEmpty]: !activity,
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
                                    {activity ? `${activity} кг` : ''}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
