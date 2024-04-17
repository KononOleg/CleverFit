import React, { useState } from 'react';
import { AlertCustom } from '@components/alert-custom';
import { ModalRequestError } from '@components/modal-request-error';
import { DATA_TEST_ID } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { DrawerExercise } from '@pages/calendar-page/components/drawer-exercise';
import { setCreatedTraining } from '@redux/reducers/training-slice';
import { trainingSelector } from '@redux/selectors';
import {
    useCreateTrainingMutation,
    useLazyGetTrainingQuery,
    useUpdateTrainingMutation,
} from '@redux/services/training-service';
import { isOldDate } from '@utils/index';
import { Button, Typography } from 'antd';

import { TrainingList } from '../training-list';

import styles from './my-workouts.module.scss';

import { Training } from '@/types/index';

export const MyWorkouts = () => {
    const dispatch = useAppDispatch();
    const { training, createdTraining } = useAppSelector(trainingSelector);
    const [createTraining, { isError: isCreateError, isSuccess: isCreateSuccess }] =
        useCreateTrainingMutation();
    const [updateTraining, { isError: isUpdateError, isSuccess: isUpdateSuccess }] =
        useUpdateTrainingMutation();

    const [getTraining] = useLazyGetTrainingQuery();
    const [openDrawerExercises, setOpenDrawerExercises] = useState(false);
    const [isEditTraining, setIsEditTraining] = useState(false);

    const isUpdatePast = isOldDate(createdTraining.date as string);

    const closeDrawerExercisesHandler = () => {
        setOpenDrawerExercises(false);
        setIsEditTraining(false);
    };
    const openDrawerExercisesHandler = () => setOpenDrawerExercises(true);

    const createTrainingHandler = () => createTraining(createdTraining);
    const updateTrainingHandler = () =>
        isUpdatePast
            ? updateTraining({ ...createdTraining, isImplementation: true })
            : updateTraining(createdTraining);

    const saveTrainingHandler = () => {
        if (isEditTraining) updateTrainingHandler();
        else createTrainingHandler();
        closeDrawerExercisesHandler();
    };

    const onChangeTrainingHandler = (record: Training) => {
        dispatch(setCreatedTraining(record));
        setIsEditTraining(true);
        setOpenDrawerExercises(true);
        getTraining();
    };

    return (
        <React.Fragment>
            {training ? (
                <TrainingList
                    openDrawerExercisesHandler={openDrawerExercisesHandler}
                    onChangeTrainingHandler={onChangeTrainingHandler}
                />
            ) : (
                <div className={styles.myWorkoutsEmpty}>
                    <Typography.Text>У вас еще нет созданных тренировок</Typography.Text>
                    <Button
                        type='primary'
                        size='large'
                        onClick={openDrawerExercisesHandler}
                        data-test-id={DATA_TEST_ID.CREATE_NEW_TRAINING_BUTTON}
                    >
                        Создать тренировку
                    </Button>
                </div>
            )}

            <DrawerExercise
                openDrawerExercises={openDrawerExercises}
                closeDrawerExercisesHandler={closeDrawerExercisesHandler}
                isEditExercises={isEditTraining}
                selectedTraining={null as unknown as string}
                saveTrainingHandler={saveTrainingHandler}
            />
            <ModalRequestError
                title='При сохранении данных произошла ошибка'
                type='error'
                isError={isCreateError || isUpdateError}
                subtitle='Придётся попробовать ещё раз'
                okText='Закрыть'
                closable={true}
                dataTestId={DATA_TEST_ID.MODAL_ERROR_USER_TRAINING_BUTTON}
            />

            {isCreateSuccess && (
                <AlertCustom
                    description='Новая тренировка успешно добавлена'
                    dataTestId={DATA_TEST_ID.CREATE_TRAINING_SUCCESS_ALERT}
                />
            )}
            {isUpdateSuccess && (
                <AlertCustom
                    description='Тренировка успешно обновлена'
                    dataTestId={DATA_TEST_ID.CREATE_TRAINING_SUCCESS_ALERT}
                />
            )}
        </React.Fragment>
    );
};
