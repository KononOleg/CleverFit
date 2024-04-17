import { Pie } from '@ant-design/plots';
import { getFrequentExercises } from '@utils/get-frequent-exercises';

import { ActivityRows } from '../activity-rows';

import styles from './frequent-exersice-block.module.scss';

import { Activity, ActivityList } from '@/types/index';

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
        <div className={styles.frequentExersiceBlock}>
            <div className={styles.pie}>
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
