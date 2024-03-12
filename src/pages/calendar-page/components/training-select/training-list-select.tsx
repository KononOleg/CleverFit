import { Select } from 'antd';

import styles from './training-list-select.module.scss';
import { TrainingList } from '../../../../types';
import { DATA_TEST_ID } from '@constants/index';

type Props = {
    trainingList: TrainingList;
    selectedTrainings: string[];
    changeSelectHandler: (value: string) => void;
    defaultValue: string | null;
};

export const TrainingListSelect = ({
    trainingList,
    selectedTrainings,
    changeSelectHandler,
    defaultValue,
}: Props) => {
    const options = trainingList
        .map(({ name }) => name)
        .filter((element) => !selectedTrainings.includes(element))
        .map((name) => ({ label: name, value: name }));

    const onChange = (value: string) => changeSelectHandler(value);

    return (
        <Select
            defaultValue={defaultValue || 'Выбор типа тренировки'}
            className={styles.TrainingSelect}
            options={options}
            onChange={onChange}
            data-test-id={DATA_TEST_ID.MODAL_CREATE_EXERCISE_SELECT}
        />
    );
};
