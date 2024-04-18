import { PlusOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setExercise } from '@redux/reducers/training-slice';
import { Checkbox, Input, InputNumber } from 'antd';

import styles from './exercise-form.module.scss';

import { Nullable } from '@/types/index';

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
        <div className={styles.exercise}>
            <div className={styles.exerciseName}>
                <Input
                    data-test-id={`${DATA_TEST_ID.MODAL_DRAWER_RIGHT_INPUT_EXERCISE}${index}`}
                    className={styles.Input}
                    placeholder='Упражнениe'
                    defaultValue={excerciseNameInitial}
                    onChange={onChangeExcerciseName}
                />

                {isCheck && (
                    <div className={styles.checkbox}>
                        <Checkbox
                            data-test-id={`${DATA_TEST_ID.MODAL_DRAWER_RIGHT_CHECKBOX_EXERCISE}${index}`}
                            checked={isChecked}
                            onChange={() => onCheckedHandler(index)}
                        />
                    </div>
                )}
            </div>

            <div className={styles.wrapper}>
                <div className={styles.labelReplays}>Подходы</div>
                <div className={styles.inputWrapper}>
                    <div className={styles.label}>Вес, кг</div>
                    <div className={styles.label}>Количество</div>
                </div>
            </div>
            <div className={styles.wrapper}>
                <InputNumber
                    data-test-id={`${DATA_TEST_ID.MODAL_DRAWER_RIGHT_INPUT_QUANTITY}${index}`}
                    className={styles.inputReplays}
                    addonBefore='+'
                    min={1}
                    defaultValue={replaysInitial}
                    onChange={onChangeReplays}
                />
                <div className={styles.inputWrapper}>
                    <InputNumber
                        data-test-id={`${DATA_TEST_ID.MODAL_DRAWER_RIGHT_INPUT_WEIGHT}${index}`}
                        className={styles.input}
                        defaultValue={weightInitial}
                        onChange={onChangeWeight}
                    />
                    <PlusOutlined className={styles.multi} />
                    <InputNumber
                        data-test-id={`${DATA_TEST_ID.MODAL_DRAWER_RIGHT_INPUT_APPROACH}${index}`}
                        className={styles.input}
                        min={1}
                        defaultValue={approachesInitial}
                        onChange={onChangeApproaches}
                    />
                </div>
            </div>
        </div>
    );
};
