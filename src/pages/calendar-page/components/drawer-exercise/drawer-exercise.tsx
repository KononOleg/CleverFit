import { Button, Drawer } from 'antd';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './drawer-exercise.module.scss';

import moment from 'moment';
import { BadgeCustom } from '../badge-custom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';

import { addExercise, deleteExercises } from '@redux/reducers/training-slice';
import { ExerciseForm } from '../exercise-form';
import { DATA_TEST_ID } from '@constants/index';
import { useState } from 'react';
import { Training } from '../../../../types';

type Props = {
    openDrawerExercises: boolean;
    closeDrawerExercisesHandler: () => void;
    isEditExercises: boolean;
    selectedTraining: string;
    trainingByDay: Training[];
};

export const DrawerExercise = ({
    openDrawerExercises,
    closeDrawerExercisesHandler,
    isEditExercises,
    selectedTraining,
}: Props) => {
    const dispatch = useAppDispatch();
    const { selectedDate, createdTraining } = useAppSelector(trainingSelector);
    const [indexes, setIndexes] = useState<number[]>([]);

    const closeHandler = () => closeDrawerExercisesHandler();
    const addExcerciseHandler = () => dispatch(addExercise());
    const deleteExerciseHandler = () => dispatch(deleteExercises(indexes));

    const onSetIndex = (index: number) => {
        if (indexes.includes(index)) setIndexes(indexes.filter((element) => element !== index));
        else setIndexes([...indexes, index]);
    };

    return (
        <Drawer
            title={isEditExercises ? 'Редактирование' : 'Добавление упражнений'}
            destroyOnClose={true}
            placement='right'
            closeIcon={isEditExercises ? <EditOutlined /> : <PlusOutlined />}
            open={openDrawerExercises}
            className={styles.DrawerExercises}
            data-test-id={DATA_TEST_ID.MODAL_DRAWER_RIGHT}
            extra={
                <Button
                    data-test-id={DATA_TEST_ID.MODAL_DRAWER_RIGHT_BUTTON_CLOSE}
                    type='text'
                    size='small'
                    icon={<CloseOutlined />}
                    onClick={closeHandler}
                />
            }
        >
            <div className={styles.Status}>
                <BadgeCustom text={selectedTraining} />
                <p>
                    {moment(selectedDate || (createdTraining?.name as string)).format('DD.MM.YYYY')}
                </p>
            </div>
            <div className={styles.Exercises}>
                {createdTraining.exercises.map(
                    ({ _id, name, replays, weight, approaches }, index) => (
                        <div key={`${_id}${index}`}>
                            <ExerciseForm
                                excerciseNameInitial={name}
                                replaysInitial={replays}
                                weightInitial={weight}
                                approachesInitial={approaches}
                                index={index}
                                isCheck={isEditExercises}
                                indexes={indexes}
                                onCheckedElement={onSetIndex}
                            />
                        </div>
                    ),
                )}

                <div className={styles.Buttons}>
                    <Button
                        type='link'
                        icon={<PlusOutlined />}
                        size='small'
                        onClick={addExcerciseHandler}
                    >
                        Добавить ещё
                    </Button>
                    {isEditExercises && (
                        <Button
                            type='link'
                            icon={<MinusOutlined />}
                            size='small'
                            disabled={!indexes.length}
                            onClick={deleteExerciseHandler}
                        >
                            Удалить
                        </Button>
                    )}
                </div>
            </div>
        </Drawer>
    );
};
