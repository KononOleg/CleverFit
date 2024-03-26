import { PlusOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setExercise } from '@redux/reducers/training-slice';
import { Checkbox, Input, InputNumber } from 'antd';

import { Nullable } from '../../../../types';

import styles from './exercise-form.module.scss';

type Props = {
    excerciseNameInitial: string;
    replaysInitial: number;
    weightInitial: number;
    approachesInitial: number;
    index: number;
    indexes: number[];
    onCheckedHandler: (index: number) => void;
    isCheck?: boolean;
};

export const ExerciseForm = ({
    excerciseNameInitial,
    replaysInitial,
    weightInitial,
    approachesInitial,
    index,
    indexes,
    onCheckedHandler,
    isCheck,
}: Props) => {
    const dispatch = useAppDispatch();
    const isChecked = indexes.includes(index);

    const onChangeExcerciseName = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setExercise({ name: e.target.value as string, index }));
    const onChangeReplays = (value: Nullable<number>) =>
        dispatch(setExercise({ replays: value as number, index }));
    const onChangeWeight = (value: Nullable<number>) =>
        dispatch(setExercise({ weight: value as number, index }));
    const onChangeApproaches = (value: Nullable<number>) =>
        dispatch(setExercise({ approaches: value as number, index }));

    return (
        <div className={styles.Exercise}>
            <div className={styles.ExerciseName}>
                <Input
                    data-test-id={`${DATA_TEST_ID.MODAL_DRAWER_RIGHT_INPUT_EXERCISE}${index}`}
                    className={styles.Input}
                    placeholder='Упражнениe'
                    defaultValue={excerciseNameInitial}
                    onChange={onChangeExcerciseName}
                />

                {isCheck && (
                    <div className={styles.Checkbox}>
                        <Checkbox
                            data-test-id={`${DATA_TEST_ID.MODAL_DRAWER_RIGHT_CHECKBOX_EXERCISE}${index}`}
                            checked={isChecked}
                            onChange={() => onCheckedHandler(index)}
                        />
                    </div>
                )}
            </div>

            <div className={styles.Wrapper}>
                <div className={styles.LabelReplays}>Подходы</div>
                <div className={styles.InputWrapper}>
                    <div className={styles.Label}>Вес, кг</div>
                    <div className={styles.Label}>Количество</div>
                </div>
            </div>
            <div className={styles.Wrapper}>
                <InputNumber
                    data-test-id={`${DATA_TEST_ID.MODAL_DRAWER_RIGHT_INPUT_QUANTITY}${index}`}
                    className={styles.InputReplays}
                    addonBefore='+'
                    min={1}
                    defaultValue={replaysInitial}
                    onChange={onChangeReplays}
                />
                <div className={styles.InputWrapper}>
                    <InputNumber
                        data-test-id={`${DATA_TEST_ID.MODAL_DRAWER_RIGHT_INPUT_WEIGHT}${index}`}
                        className={styles.Input}
                        defaultValue={weightInitial}
                        onChange={onChangeWeight}
                    />
                    <PlusOutlined className={styles.Multi} />
                    <InputNumber
                        data-test-id={`${DATA_TEST_ID.MODAL_DRAWER_RIGHT_INPUT_APPROACH}${index}`}
                        className={styles.Input}
                        min={1}
                        defaultValue={approachesInitial}
                        onChange={onChangeApproaches}
                    />
                </div>
            </div>
        </div>
    );
};
