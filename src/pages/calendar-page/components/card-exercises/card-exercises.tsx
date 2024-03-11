import { Button, Card } from 'antd';

import styles from '../card-modal/card-modal.module.scss';

import { ArrowLeftOutlined } from '@ant-design/icons';

import { TrainingListSelect } from '../training-select';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { Empty } from '../empty';
import { BadgeCustom } from '../badge-custom';
import { Training } from '../../../../types';
import { useState } from 'react';
import { addTraining, closeModal } from '@redux/reducers/training-slice';
import { useCreateTrainingMutation } from '@redux/services/training-service';
import { ModalRequestError } from '../modal-request-error';
import { DATA_TEST_ID } from '@constants/index';

type Props = {
    trainingByDay: Training[];
    prevModalHandler: () => void;
    openDrawerExercisesHandler: () => void;
};

export const CardExercises = ({
    trainingByDay,
    prevModalHandler,
    openDrawerExercisesHandler,
}: Props) => {
    const dispatch = useAppDispatch();
    const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
    const { selectedDate, trainingList, exercises, createdTraining } =
        useAppSelector(trainingSelector);
    const [createTraining, { isLoading, isError }] = useCreateTrainingMutation();

    const exercisesMap = exercises.concat(createdTraining?.exercises).slice(0, -1);

    const isEmptyExercises = exercisesMap && exercisesMap.length === 0;
    const isEmptyCreatedTraining =
        createdTraining?.exercises && createdTraining?.exercises.length === 1;

    const selectedTrainings = trainingByDay
        .filter(({ name }) => trainingList.find((training) => training.name === name))
        .map(({ name }) => name);

    const isDisabledAddExercise = !selectedTraining;
    const isDisabledSaveExercise = !createdTraining || isEmptyCreatedTraining;

    const createTrainingHandler = () => createTraining(createdTraining as Training);
    const closeModalHandler = () => dispatch(closeModal());

    const changeSelectHandler = (value: string) => {
        dispatch(
            addTraining({
                training: {
                    name: value,
                    date: selectedDate as string,
                    exercises: [],
                },
            }),
        );
        setSelectedTraining(value);
    };

    return (
        <>
            <Card
                className={styles.cardModal}
                data-test-id={DATA_TEST_ID.MODAL_CREATE_EXERCISE}
                title={
                    <div className={styles.headWrapper}>
                        <Button
                            data-test-id={DATA_TEST_ID.MODAL_EXERCISE_TRAINING_BUTTON_CLOSE}
                            type='text'
                            size='small'
                            icon={<ArrowLeftOutlined />}
                            onClick={prevModalHandler}
                        />

                        <TrainingListSelect
                            trainingList={trainingList}
                            selectedTrainings={selectedTrainings}
                            changeSelectHandler={changeSelectHandler}
                        />
                    </div>
                }
                actions={[
                    <Button
                        block
                        size='large'
                        onClick={openDrawerExercisesHandler}
                        disabled={isDisabledAddExercise}
                    >
                        Добавить упражнения
                    </Button>,
                    <Button
                        block
                        size='large'
                        type='link'
                        onClick={createTrainingHandler}
                        disabled={isDisabledSaveExercise}
                        loading={isLoading}
                    >
                        Сохранить
                    </Button>,
                ]}
            >
                {isEmptyExercises ? (
                    <Empty />
                ) : (
                    exercisesMap.map((exercise) => (
                        <BadgeCustom text={exercise.name} isEdit={true} isExercise={true} />
                    ))
                )}
            </Card>
            <ModalRequestError
                title='При сохранении данных произошла ошибка'
                type='error'
                isError={isError}
                subtitle='Придётся попробовать ещё раз'
                okText='Закрыть'
                onClickButton={closeModalHandler}
            />
        </>
    );
};
