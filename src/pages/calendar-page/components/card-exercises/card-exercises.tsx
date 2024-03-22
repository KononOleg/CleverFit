import { ArrowLeftOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { addCreatedTraining, closeModal } from '@redux/reducers/training-slice';
import { trainingSelector } from '@redux/selectors';
import {
    useCreateTrainingMutation,
    useUpdateTrainingMutation,
} from '@redux/services/training-service';
import { isOldDate } from '@utils/index';
import { Button, Card } from 'antd';

import { Nullable, Training } from '../../../../types';
import { BadgeCustom } from '../badge-custom';
import styles from '../card-modal/card-modal.module.scss';
import { Empty } from '../empty';
import { ModalRequestError } from '../../../../components/modal-request-error';
import { TrainingListSelect } from '../training-select';

type Props = {
    trainingByDay: Training[];
    isEditExercises: boolean;
    selectedTraining: Nullable<string>;
    prevModalHandler: () => void;
    openDrawerExercisesHandler: () => void;
    setSelectedTraining: (value: string) => void;
    onChange: () => void;
};

export const CardExercises = ({
    trainingByDay,
    isEditExercises,
    selectedTraining,
    prevModalHandler,
    openDrawerExercisesHandler,
    setSelectedTraining,
    onChange,
}: Props) => {
    const dispatch = useAppDispatch();
    const { selectedDate, trainingList, createdTraining } = useAppSelector(trainingSelector);
    const [createTraining, { isLoading: isCreateLoading, isError: isCreateError }] =
        useCreateTrainingMutation();
    const [updateTraining, { isLoading: isUpdateLoading, isError: isUpdateError }] =
        useUpdateTrainingMutation();

    const isUpdatePast = isOldDate(selectedDate as string);

    const selectedTrainings = trainingByDay
        .filter(({ name }) => trainingList.find((training) => training.name === name))
        .map(({ name }) => name);

    const isEmptyCreatedTraining =
        !createdTraining?.exercises[0].name ||
        (createdTraining?.exercises && createdTraining?.exercises.length === 0);
    const isDisabledAddExercise = !selectedTraining;
    const isDisabledSaveExercise = !createdTraining || isEmptyCreatedTraining;

    const createTrainingHandler = () => createTraining(createdTraining);

    const updateTrainingHandler = () =>
        isUpdatePast
            ? updateTraining({ ...createdTraining, isImplementation: true })
            : updateTraining(createdTraining);

    const onSaveHandler = () =>
        isEditExercises ? updateTrainingHandler() : createTrainingHandler();

    const closeModalHandler = () => dispatch(closeModal());

    const changeSelectHandler = (name: string) => {
        dispatch(
            addCreatedTraining({
                name,
                date: selectedDate as string,
                exercises: [],
            }),
        );
        setSelectedTraining(name);
    };

    return (
        <>
            <Card
                className={styles.CardModal}
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
                        {isUpdatePast ? 'Сохранить изменения' : 'Сохранить'}
                    </Button>,
                ]}
            >
                {isEmptyCreatedTraining ? (
                    <Empty />
                ) : (
                    createdTraining.exercises.map(({ _id, name }, index) => (
                        <div key={_id}>
                            <BadgeCustom
                                text={name}
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
                dataTestId={DATA_TEST_ID.MODAL_ERROR_USER_TRAINING_BUTTON}
            />
        </>
    );
};
