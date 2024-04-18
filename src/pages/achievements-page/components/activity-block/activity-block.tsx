import { Column } from '@ant-design/plots';
import { DD_MM } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appSelector } from '@redux/selectors';
import cn from 'classnames';
import moment from 'moment';

import { ActivityRows } from '../activity-rows';

import styles from './activity-block.module.scss';

import { Activity, ActivityList } from '@/types/index';



type Props = {
    activityList: ActivityList;
};

export const ActivityBlock = ({ activityList }: Props) => {
    const { isDesktopVersion } = useAppSelector(appSelector);

    const isFullSize = activityList.length > 7;

    const config = {
        data: activityList,
        xField: ({ date }: Activity) => moment(date).format(DD_MM),
        yField: 'activity',
        axis: {
            x: {
                title: 'Нагрузка, кг',
                titlePosition: 'bottom',
                titleFontSize: isDesktopVersion ? 14 : 12,
                tick: false,

                label: {
                    autoRotate: false,
                    style: {
                        textAlign: 'center',
                    },
                },
            },
            y: {
                labelFormatter: (value: number) => `${value} кг`,
                tick: false,
                labelSpacing: isDesktopVersion ? 16 : 8,
            },
        },

        style: {
            fill: '#85A5FF',
        },
        sizeField: isDesktopVersion ? 30 : 15,
    };

    return (
        <div className={cn(styles.activityBlock, { [styles.activityBlockFullSize]: isFullSize })}>
            <div className={styles.column}>
                <Column {...config} scrollbar={isFullSize && { x: {} }} />
            </div>

            <ActivityRows activityList={activityList} isFullSize={isFullSize} />
        </div>
    );
};
