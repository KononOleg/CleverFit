import { Button, Card } from 'antd';

import styles from '../card-modal/card-modal.module.scss';

import { ArrowLeftOutlined } from '@ant-design/icons';

import { TrainingListSelect } from '../training-select';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { Empty } from '../empty';
import { BadgeCustom } from '../badge-custom';
import { Training } from '../../../../types';

import { addTraining, closeModal } from '@redux/reducers/training-slice';
import {
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
} from '@redux/services/training-service';
import { ModalRequestError } from '../modal-request-error';
import { DATA_TEST_ID } from '@constants/index';

type Props = {
    trainingByDay: Training[];
    prevModalHandler: () => void;
    openDrawerExercisesHandler: () => void;
    selectedTraining: string | null;
    setSelectedTraining: (value: string) => void;
    onChange: () => void;
    isEditExercises: boolean;
};

export const CardExercises = ({
    trainingByDay,
    prevModalHandler,
    openDrawerExercisesHandler,
    selectedTraining,
    setSelectedTraining,
    onChange,
    isEditExercises,
}: Props) => {
    const dispatch = useAppDispatch();
    const { selectedDate, trainingList, createdTraining } = useAppSelector(trainingSelector);
    const [createTraining, { isLoading: isCreateLoading, isError: isCreateError }] =
        useCreateTrainingMutation();
    const [updateTraining, { isLoading: isUpdateLoading, isError: isUpdateError }] =
        useUpdateTrainingMutation();

    const isEmptyCreatedTraining =
        createdTraining?.exercises && createdTraining?.exercises.length === 1;

    const selectedTrainings = trainingByDay
        .filter(({ name }) => trainingList.find((training) => training.name === name))
        .map(({ name }) => name);

    const isDisabledAddExercise = !selectedTraining;
    const isDisabledSaveExercise = !createdTraining || isEmptyCreatedTraining;

    const createTrainingHandler = () => createTraining(createdTraining as Training);
    const updateTrainingHandler = () => updateTraining(createdTraining as Training);

    const onSaveHandler = () =>
        !isEditExercises ? createTrainingHandler() : updateTrainingHandler();

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
                            defaultValue={selectedTraining}
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
                        onClick={onSaveHandler}
                        disabled={isDisabledSaveExercise}
                        loading={isCreateLoading || isUpdateLoading}
                    >
                        Сохранить
                    </Button>,
                ]}
            >
                {isEmptyCreatedTraining ? (
                    <Empty />
                ) : (
                    createdTraining.exercises.map((exercise, index) => (
                        <div key={exercise._id}>
                            <BadgeCustom
                                text={exercise.name}
                                isEdit={true}
                                isExercise={true}
                                onChange={onChange}
                                index={index}
                            />
                        </div>
                    ))
                )}
            </Card>
            <ModalRequestError
                title='При сохранении данных произошла ошибка'
                type='error'
                isError={isUpdateError || isCreateError}
                subtitle='Придётся попробовать ещё раз'
                okText='Закрыть'
                onClickButton={closeModalHandler}
            />
        </>
    );
};
