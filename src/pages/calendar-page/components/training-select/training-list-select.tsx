import { Select } from 'antd';

import styles from './training-list-select.module.scss';

import { Nullable, PeriodOptions, TrainingList } from '@/types/index';

type Props = {
    trainingList: TrainingList | PeriodOptions[];
    selectedTrainings: string[];
    defaultValue: Nullable<string>;
    dataTestId: string;
    changeSelectHandler: (value: string) => void;
    disabled?: boolean;
};

export const TrainingListSelect = ({
    trainingList,
    selectedTrainings,
    changeSelectHandler,
    defaultValue,
    dataTestId,
    disabled,
}: Props) => {
    const options = trainingList
        .map(({ name }) => name)
        .filter((element) => !selectedTrainings.includes(element))
        .map((name) => ({ label: name, value: name }));

    const onChange = (value: string) => changeSelectHandler(value);

    return (
        <Select
            defaultValue={defaultValue || 'Выбор типа тренировки'}
            className={styles.trainingSelect}
            options={options}
            onChange={onChange}
            data-test-id={dataTestId}
            disabled={disabled}
        />
    );
};
