import { Input, InputNumber } from 'antd';

import styles from './exercise-form.module.scss';
import { PlusOutlined } from '@ant-design/icons';

import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setExercise } from '@redux/reducers/training-slice';

type Props = {
    excerciseNameInitial: string;
    replaysInitial: number;
    weightInitial: number;
    approachesInitial: number;
    index: number;
};

export const ExerciseForm = ({
    excerciseNameInitial,
    replaysInitial,
    weightInitial,
    approachesInitial,
    index,
}: Props) => {
    const dispatch = useAppDispatch();

    const onChangeExcerciseName = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setExercise({ name: e.target.value as string, index }));
    const onChangesetReplays = (value: number | null) =>
        dispatch(setExercise({ replays: value as number, index }));
    const onChangesetWeight = (value: number | null) =>
        dispatch(setExercise({ weight: value as number, index }));
    const onChangeApproaches = (value: number | null) =>
        dispatch(setExercise({ approaches: value as number, index }));

    return (
        <div className={styles.Exercise}>
            <Input
                className={styles.Input}
                placeholder='Упражнениe'
                defaultValue={excerciseNameInitial}
                onChange={onChangeExcerciseName}
            />
            <div className={styles.Wrapper}>
                <div className={styles.LabelReplays}>Подходы</div>
                <div className={styles.InputWrapper}>
                    <div className={styles.Label}>Вес, кг</div>
                    <div className={styles.Label}>Количество</div>
                </div>
            </div>
            <div className={styles.Wrapper}>
                <InputNumber
                    className={styles.InputReplays}
                    addonBefore='+'
                    min={1}
                    defaultValue={replaysInitial}
                    onChange={onChangesetReplays}
                />
                <div className={styles.InputWrapper}>
                    <InputNumber
                        className={styles.Input}
                        defaultValue={weightInitial}
                        onChange={onChangesetWeight}
                    />
                    <PlusOutlined className={styles.Multi} />
                    <InputNumber
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
