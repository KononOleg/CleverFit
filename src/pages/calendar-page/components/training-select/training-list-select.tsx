import { Select } from 'antd';

import { Nullable, PeriodOptions, TrainingList } from '../../../../types';

import styles from './training-list-select.module.scss';

type Props = {
    trainingList: TrainingList | PeriodOptions[];
    selectedTrainings: string[];
    defaultValue: Nullable<string>;
    dataTestId: string;
    changeSelectHandler: (value: string) => void;
};

export const TrainingListSelect = ({
    trainingList,
    selectedTrainings,
    changeSelectHandler,
    defaultValue,
    dataTestId,
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
            data-test-id={dataTestId}
        />
    );
};
