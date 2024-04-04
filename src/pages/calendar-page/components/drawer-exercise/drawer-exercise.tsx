import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { TrainingForm } from '@components/training-form';
import { DATA_TEST_ID, DD_MM_YYYY, PATH } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { addExercise, deleteExercises, resetCreatedTraining } from '@redux/reducers/training-slice';
import { appSelector, trainingSelector } from '@redux/selectors';
import { Button, Drawer } from 'antd';
import moment from 'moment';

import { BadgeCustom } from '../badge-custom';
import { ExerciseForm } from '../exercise-form';

import styles from './drawer-exercise.module.scss';

type Props = {
    openDrawerExercises: boolean;
    isEditExercises: boolean;
    selectedTraining: string;
    closeDrawerExercisesHandler: () => void;
    saveTrainingHandler?: () => void;
    createTrainingHandler?: () => void;
    isJointTraining?: boolean;
};

export const DrawerExercise = ({
    openDrawerExercises,
    isEditExercises,
    selectedTraining,
    closeDrawerExercisesHandler,
    saveTrainingHandler,
    createTrainingHandler,
    isJointTraining,
}: Props) => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { isDesktopVersion } = useAppSelector(appSelector);
    const { selectedDate, createdTraining } = useAppSelector(trainingSelector);
    const [indexes, setIndexes] = useState<number[]>([]);

    const titleExercises = isEditExercises ? 'Редактирование' : 'Добавление упражнений';
    const title = isJointTraining ? 'Совместная тренировка' : titleExercises;

    const isTrainingPage = pathname === PATH.TRAINING;
    const isDisabledSave =
        !createdTraining.date || !createdTraining.name || !createdTraining.exercises[0].name;
    const isDisabledJoint = !createdTraining.date || !createdTraining.exercises[0].name;

    const closeHandler = () => closeDrawerExercisesHandler();
    const addExcerciseHandler = () => dispatch(addExercise());
    const deleteExerciseHandler = () => dispatch(deleteExercises(indexes));

    useEffect(() => {
        if (isTrainingPage && !isEditExercises) dispatch(resetCreatedTraining());
    }, [dispatch, isEditExercises, isTrainingPage, openDrawerExercises]);

    const onSetIndex = (index: number) => {
        if (indexes.includes(index)) setIndexes(indexes.filter((element) => element !== index));
        else setIndexes([...indexes, index]);
    };

    return (
        <Drawer
            title={title}
            destroyOnClose={true}
            placement='right'
            width={isDesktopVersion ? 408 : 360}
            closeIcon={isEditExercises && !isJointTraining ? <EditOutlined /> : <PlusOutlined />}
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
            footer={
                isTrainingPage &&
                (isJointTraining ? (
                    <Button
                        size='large'
                        type='primary'
                        disabled={isDisabledJoint}
                        block={true}
                        onClick={createTrainingHandler}
                    >
                        Отправить приглашение
                    </Button>
                ) : (
                    <Button
                        size='large'
                        type='primary'
                        disabled={isDisabledSave}
                        block={true}
                        onClick={saveTrainingHandler}
                    >
                        Сохранить
                    </Button>
                ))
            }
        >
            {isTrainingPage ? (
                <TrainingForm isEditExercises={isEditExercises} />
            ) : (
                <div className={styles.Status}>
                    <BadgeCustom text={selectedTraining} />
                    <p>
                        {moment(selectedDate || (createdTraining?.name as string)).format(
                            DD_MM_YYYY,
                        )}
                    </p>
                </div>
            )}
            <div className={styles.Exercises}>
                {createdTraining.exercises.map(
                    ({ _id, name, replays, weight, approaches }, index) => (
                        <div key={`${_id}${index.toString()}`}>
                            <ExerciseForm
                                excerciseNameInitial={name}
                                replaysInitial={replays}
                                weightInitial={weight}
                                approachesInitial={approaches}
                                index={index}
                                isCheck={isEditExercises}
                                indexes={indexes}
                                onCheckedHandler={onSetIndex}
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
