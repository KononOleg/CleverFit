import { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { DDDD } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appSelector } from '@redux/selectors';
import { getWeekDays } from '@utils/get-week-days';
import { Badge, Button } from 'antd';
import cn from 'classnames';
import moment from 'moment';

import { ActivityList } from '../../../../types';

import styles from './activity-column.module.scss';

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
            className={cn(styles.ActivityColumn, {
                [styles.ActivityColumnPie]: isPieChart,
            })}
        >
            <div className={styles.TitleWrapper}>
                <span className={styles.Title}>{title}</span>
                {!isDesktopVersion && isFullSize && (
                    <Button type='text' onClick={handleCollapsed}>
                        {isCollapsed ? <DownOutlined /> : <UpOutlined />}
                    </Button>
                )}
            </div>
            {((!isDesktopVersion && !isCollapsed) || isDesktopVersion || !isFullSize) && (
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
                            <span className={styles.Day}>
                                {getWeekDays(moment(date).format(DDDD))}
                            </span>

                            {isPieChart ? (
                                <span className={styles.Activity}>{name}</span>
                            ) : (
                                <span className={styles.Activity}>
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
