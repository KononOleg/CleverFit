import { findFrequentData } from '@utils/find-frequent-data';
import { Typography } from 'antd';

import { ActivityList, TrainingType } from '../../../../types';

import styles from './frequent-training-block.module.scss';

type Props = {
    activityList: ActivityList;
    selectedTraining: TrainingType;
};

export const FrequentTrainingBlock = ({ activityList, selectedTraining }: Props) => {
    const { mostFrequentTraining, mostFrequentExercise } = findFrequentData(activityList);

    return (
        <div className={styles.FrequentTrainingBlock}>
            {selectedTraining.key === 'all' && (
                <div className={styles.TrainingWrapper}>
                    <span className={styles.Subtitle}>Самая частая тренировка</span>
                    <Typography.Title level={3}>{mostFrequentTraining}</Typography.Title>
                </div>
            )}

            <div className={styles.TrainingWrapper}>
                <span className={styles.Subtitle}>Самое частое упражнение</span>
                <Typography.Title level={3}>{mostFrequentExercise}</Typography.Title>
            </div>
        </div>
    );
};
