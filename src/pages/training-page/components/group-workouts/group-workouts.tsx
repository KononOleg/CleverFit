import React, { useState } from 'react';
import { ModalRequestError } from '@components/modal-request-error';
import { DATA_TEST_ID } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import {
    useGetTrainingPalsQuery,
    useLazyGetUserJointTrainingListQuery,
} from '@redux/services/invite-service';
import { getFavouriteTraining } from '@utils/favourite-training-type';
import { Button, Typography } from 'antd';

import { JointTrainingList } from '../joint-training-list';
import { TrainingPals } from '../training-pals';

import styles from './group-workouts.module.scss';

export const GroupWorkouts = () => {
    const { training, trainingList } = useAppSelector(trainingSelector);

    const [showJointList, setShowJointList] = useState(false);
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

    if (showJointList && !isError) {
        return <JointTrainingList goBackHandler={goBackHandler} />;
    }

    return (
        <React.Fragment>
            <div className={styles.GroupWorkouts}>
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
