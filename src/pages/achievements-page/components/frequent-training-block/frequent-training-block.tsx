import { findFrequentData } from '@utils/find-frequent-data';
import { Typography } from 'antd';

import styles from './frequent-training-block.module.scss';

import { ActivityList, TrainingType } from '@/types/index';

type Props = {
    activityList: ActivityList;
    selectedTraining: TrainingType;
};

export const FrequentTrainingBlock = ({ activityList, selectedTraining }: Props) => {
    const { mostFrequentTraining, mostFrequentExercise } = findFrequentData(activityList);

    return (
        <div className={styles.frequentTrainingBlock}>
            {selectedTraining.key === 'all' && (
                <div className={styles.trainingWrapper}>
                    <span className={styles.subtitle}>Самая частая тренировка</span>
                    <Typography.Title level={3}>{mostFrequentTraining}</Typography.Title>
                </div>
            )}

            <div className={styles.trainingWrapper}>
                <span className={styles.subtitle}>Самое частое упражнение</span>
                <Typography.Title level={3}>{mostFrequentExercise}</Typography.Title>
            </div>
        </div>
    );
};
