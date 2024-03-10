import { Button, Drawer, Input, InputNumber } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './drawer-exercise.module.scss';

import moment from 'moment';
import { BadgeCustom } from '../badge-custom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { useState } from 'react';
import { addExercise } from '@redux/reducers/training-slice';

type Props = { openDrawerExercises: boolean; closeDrawerExercisesHandler: () => void };

export const DrawerExercise = ({ openDrawerExercises, closeDrawerExercisesHandler }: Props) => {
    const dispatch = useAppDispatch();
    const { selectedDate, createdTraining } = useAppSelector(trainingSelector);
    const [excerciseName, setExcerciseName] = useState('');
    const [replays, setReplays] = useState(1);
    const [weight, setWeight] = useState(0);
    const [approaches, setApproaches] = useState(1);

    const closeHandler = () => {
        if (excerciseName)
            dispatch(
                addExercise({
                    exercise: {
                        name: excerciseName,
                        replays,
                        weight,
                        approaches,
                    },
                }),
            );
        closeDrawerExercisesHandler();
    };

    const addExcerciseHandler = () => {
        dispatch(
            addExercise({
                exercise: {
                    name: excerciseName,
                    replays,
                    weight,
                    approaches,
                },
            }),
        );
        setExcerciseName('');
        setReplays(1);
        setWeight(0);
        setApproaches(1);
    };

    const onChangeExcerciseName = (e: React.ChangeEvent<HTMLInputElement>) =>
        setExcerciseName(e.target.value);

    const onChangesetReplays = (value: number | null) => setReplays(value as number);
    const onChangesetWeight = (value: number | null) => setWeight(value as number);
    const onChangeApproaches = (value: number | null) => setApproaches(value as number);

    return (
        <Drawer
            title='Добавление упражнений'
            destroyOnClose={true}
            placement='right'
            closeIcon={<PlusOutlined />}
            open={openDrawerExercises}
            className={styles.DrawerExercises}
            extra={
                <Button type='text' size='small' icon={<CloseOutlined />} onClick={closeHandler} />
            }
        >
            <div className={styles.Status}>
                <BadgeCustom text={createdTraining?.name as string} />
                <p>{moment(selectedDate).format('DD.MM.YYYY')}</p>
            </div>
            <div className={styles.Exercises}>
                <Input
                    className={styles.Input}
                    placeholder='Упражнениe'
                    value={excerciseName}
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
                        value={replays}
                        onChange={onChangesetReplays}
                    />
                    <div className={styles.InputWrapper}>
                        <InputNumber
                            className={styles.Input}
                            value={weight}
                            onChange={onChangesetWeight}
                        />
                        <PlusOutlined className={styles.Multi} />
                        <InputNumber
                            className={styles.Input}
                            min={1}
                            value={approaches}
                            onChange={onChangeApproaches}
                        />
                    </div>
                </div>

                <div className={styles.Buttons}>
                    <Button
                        type='link'
                        icon={<PlusOutlined />}
                        size='small'
                        onClick={addExcerciseHandler}
                    >
                        Добавить ещё
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};
