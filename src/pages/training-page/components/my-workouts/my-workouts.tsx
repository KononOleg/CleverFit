import React, { useState } from 'react';
import { AlertCustom } from '@components/alert-custom';
import { ModalRequestError } from '@components/modal-request-error';
import { DATA_TEST_ID } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { DrawerExercise } from '@pages/calendar-page/components/drawer-exercise';
import { trainingSelector } from '@redux/selectors';
import { useCreateTrainingMutation } from '@redux/services/training-service';
import { Button, Typography } from 'antd';

import { TrainingList } from '../training-list';

import styles from './my-workouts.module.scss';

export const MyWorkouts = () => {
    const { training, createdTraining } = useAppSelector(trainingSelector);
    const [createTraining, { isError, isSuccess }] = useCreateTrainingMutation();
    const [openDrawerExercises, setOpenDrawerExercises] = useState(false);

    const closeDrawerExercisesHandler = () => setOpenDrawerExercises(false);
    const openDrawerExercisesHandler = () => setOpenDrawerExercises(true);

    const createTrainingHandler = () => {
        createTraining(createdTraining);
        closeDrawerExercisesHandler();
    };

    return (
        <React.Fragment>
            {training ? (
                <TrainingList openDrawerExercisesHandler={openDrawerExercisesHandler} />
            ) : (
                <div className={styles.MyWorkoutsEmpty}>
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
                isEditExercises={false}
                selectedTraining={null as unknown as string}
                createTrainingHandler={createTrainingHandler}
            />
            <ModalRequestError
                title='При сохранении данных произошла ошибка'
                type='error'
                isError={isError}
                subtitle='Придётся попробовать ещё раз'
                okText='Закрыть'
                closable={true}
                dataTestId={DATA_TEST_ID.MODAL_ERROR_USER_TRAINING_BUTTON}
            />

            {isSuccess && (
                <AlertCustom
                    description='Новая тренировка успешно добавлена'
                    dataTestId={DATA_TEST_ID.CREATE_TRAINING_SUCCESS_ALERT}
                />
            )}
        </React.Fragment>
    );
};
