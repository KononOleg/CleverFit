import { Pie } from '@ant-design/plots';
import { getFrequentExercises } from '@utils/get-frequent-exercises';

import { Activity, ActivityList } from '../../../../types';
import { ActivityRows } from '../activity-rows';

import styles from './frequent-exersice-block.module.scss';

type Props = {
    activityList: ActivityList;
};

export const FrequentExersiceBlock = ({ activityList }: Props) => {
    const { frequentExercises, frequentUniqueExercises } = getFrequentExercises(activityList);

    const config = {
        data: frequentUniqueExercises,
        angleField: 'activity',
        colorField: 'name',
        padding: 10,
        innerRadius: 0.7,
        labels: [
            {
                text: ({ name }: Activity) => name,
                style: {
                    fontSize: 16,
                    fill: '#000',
                },
                offset: 30,
            },
        ],
        style: {
            inset: 1,
        },

        legend: false,
    };

    return (
        <div className={styles.FrequentExersiceBlock}>
            <div className={styles.Pie}>
                <Pie {...config} />
            </div>

            <ActivityRows
                activityList={frequentExercises}
                isPieChart={true}
                title='Самые частые  упражнения по дням недели'
            />
        </div>
    );
};
