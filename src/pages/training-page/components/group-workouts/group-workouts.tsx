import React, { useState } from 'react';
import { ModalRequestError } from '@components/modal-request-error';
import { DATA_TEST_ID } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { DrawerExercise } from '@pages/calendar-page/components/drawer-exercise';
import { setCreatedTrainingPal } from '@redux/reducers/invite-slice';
import { inviteSelector, trainingSelector } from '@redux/selectors';
import {
    useGetTrainingPalsQuery,
    useLazyGetUserJointTrainingListQuery,
    useSendInviteMutation,
} from '@redux/services/invite-service';
import { useCreateTrainingMutation } from '@redux/services/training-service';
import { getFavouriteTraining } from '@utils/favourite-training-type';
import { Button, Typography } from 'antd';

import { JointTrainig } from '../../../../types';
import { InviteList } from '../invite-list';
import { JointTrainingList } from '../joint-training-list';
import { TrainingPals } from '../training-pals';

import styles from './group-workouts.module.scss';

export const GroupWorkouts = () => {
    const dispatch = useAppDispatch();
    const { training, trainingList, createdTraining } = useAppSelector(trainingSelector);
    const { createdTrainingPal } = useAppSelector(inviteSelector);
    const [openDrawerExercises, setOpenDrawerExercises] = useState(false);
    const [showJointList, setShowJointList] = useState(false);
    const [createTraining] = useCreateTrainingMutation();
    const [sendInvite] = useSendInviteMutation();
    const [getUserJointTrainingList, { isError }] = useLazyGetUserJointTrainingListQuery();

    useGetTrainingPalsQuery();

    const goBackHandler = () => setShowJointList(false);
    const getJointTrainingListHandler = () => {
        getUserJointTrainingList({});
        setShowJointList(true);
    };
    const getJointTrainingListByTypeHandler = () => {
        const trainingType = getFavouriteTraining(training, trainingList);

        getUserJointTrainingList({ trainingType });
        setShowJointList(true);
    };

    const closeDrawerExercisesHandler = () => setOpenDrawerExercises(false);
    const openDrawerExercisesHandler = () => setOpenDrawerExercises(true);

    const onChangeTrainingHandler = (partner: JointTrainig) => {
        dispatch(setCreatedTrainingPal(partner));

        openDrawerExercisesHandler();
    };

    const createTrainingHandler = async () => {
        closeDrawerExercisesHandler();
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { _id } = await createTraining(createdTraining).unwrap();

        sendInvite({
            to: createdTrainingPal?.id as string,
            trainingId: _id as string,
        });
    };

    if (showJointList && !isError) {
        return (
            <React.Fragment>
                <JointTrainingList
                    goBackHandler={goBackHandler}
                    onChangeTrainingHandler={onChangeTrainingHandler}
                />
                <DrawerExercise
                    openDrawerExercises={openDrawerExercises}
                    closeDrawerExercisesHandler={closeDrawerExercisesHandler}
                    isEditExercises={true}
                    selectedTraining={null as unknown as string}
                    createTrainingHandler={createTrainingHandler}
                    isJointTraining={true}
                />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <div className={styles.GroupWorkouts}>
                <InviteList />
                <div className={styles.Description}>
                    <Typography.Title className={styles.Title} level={3}>
                        Хочешь тренироваться с тем, кто разделяет твои цели и темп? <br /> Можешь
                        найти друга для совместных тренировок среди других пользователей.
                    </Typography.Title>
                    <Typography.Text>
                        Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой
                        уровень и вид тренировки, и мы найдем тебе идеального <br /> спортивного
                        друга.
                    </Typography.Text>

                    <div className={styles.Buttons}>
                        <Button type='link' block={true} onClick={getJointTrainingListHandler}>
                            Случайный выбор
                        </Button>
                        <Button
                            type='text'
                            block={true}
                            onClick={getJointTrainingListByTypeHandler}
                        >
                            Выбор друга по моим тренировкам
                        </Button>
                    </div>
                </div>
                <TrainingPals />
            </div>

            <ModalRequestError
                title='При открытии данных произошла ошибка'
                type='info'
                isError={isError}
                subtitle='Попробуйте ещё раз.'
                okText='Обновить'
                closable={true}
                onClickButton={() => getUserJointTrainingList({})}
                dataTestId={DATA_TEST_ID.MODAL_ERROR_USER_TRAINING_BUTTON}
            />
        </React.Fragment>
    );
};
