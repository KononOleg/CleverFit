import CheckableTag from 'antd/es/tag/CheckableTag';

import styles from './filter-panel.module.scss';

import { TrainingList, TrainingType } from '@/types/index';

type Props = {
    trainingData: TrainingList;
    selectedTraining: TrainingType;
    setSelectedTraining: (value: TrainingType) => void;
};

export const FilterPanel = ({ trainingData, selectedTraining, setSelectedTraining }: Props) => (
    <div className={styles.filterPanel}>
        <span className={styles.title}>Тип тренировки :</span>
        <div className={styles.trainings}>
            {trainingData.map((tag) => (
                <CheckableTag
                    key={tag.key}
                    checked={selectedTraining.key === tag.key}
                    onChange={() => setSelectedTraining(tag)}
                >
                    {tag.name}
                </CheckableTag>
            ))}
        </div>
    </div>
);
