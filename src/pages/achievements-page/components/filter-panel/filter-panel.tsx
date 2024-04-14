import CheckableTag from 'antd/es/tag/CheckableTag';

import { TrainingList, TrainingType } from '../../../../types';

import styles from './filter-panel.module.scss';

type Props = {
    trainingData: TrainingList;
    selectedTraining: TrainingType;
    setSelectedTraining: (value: TrainingType) => void;
};

export const FilterPanel = ({ trainingData, selectedTraining, setSelectedTraining }: Props) => (
    <div className={styles.FilterPanel}>
        <span>Тип тренировки :</span>
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
);
