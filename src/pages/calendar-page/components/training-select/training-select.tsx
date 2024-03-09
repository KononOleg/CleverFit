import { Select } from 'antd';

import styles from './training-select.module.scss';
import { TrainingList } from '../../../../types';

type Props = {
    trainingList: TrainingList;
};

export const TrainingSelect = ({ trainingList }: Props) => {
    const options = trainingList.map(({ name, key }) => ({ label: name, value: key }));

    return (
        <Select
            defaultValue='Выбор типа тренировки'
            className={styles.TrainingSelect}
            options={options}
        />
    );
};
