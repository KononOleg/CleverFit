import { Column } from '@ant-design/plots';
import { DD_MM } from '@constants/index';
import cn from 'classnames';
import moment from 'moment';

import { Activity, ActivityList } from '../../../../types';
import { ActivityRows } from '../activity-rows';

import styles from './activity-block.module.scss';

type Props = {
    activityList: ActivityList;
};

export const ActivityBlock = ({ activityList }: Props) => {
    const isFullSize = activityList.length > 7;

    const config = {
        data: activityList,
        xField: ({ date }: Activity) => moment(date).format(DD_MM),
        yField: 'activity',
        axis: {
            x: {
                title: 'Нагрузка, кг',
                titleSpacing: 16,
                titlePosition: 'bottom',
                titleFontSize: 16,
                tick: false,
                labelSpacing: 16,
            },
            y: {
                labelFormatter: (value: number) => `${value} кг`,
                tick: false,
                labelSpacing: 16,
            },
        },

        style: {
            maxWidth: 30,
            fill: '#85A5FFFF',
        },
    };

    return (
        <div className={cn(styles.ActivityBlock, { [styles.ActivityBlockFullSize]: isFullSize })}>
            <Column {...config} width={isFullSize ? 1136 : 520} height={362} />
            <ActivityRows activityList={activityList} isFullSize={isFullSize} />
        </div>
    );
};
