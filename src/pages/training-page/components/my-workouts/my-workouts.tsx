import React from 'react';
import { DATA_TEST_ID } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { Button, Typography } from 'antd';

import { TrainingList } from '../training-list';

import styles from './my-workouts.module.scss';

export const MyWorkouts = () => {
    const { training } = useAppSelector(trainingSelector);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <React.Fragment>
            {training ? (
                <TrainingList />
            ) : (
                <div className={styles.MyWorkoutsEmpty}>
                    <Typography.Text>У вас еще нет созданных тренировок</Typography.Text>
                    <Button
                        type='primary'
                        size='large'
                        data-test-id={DATA_TEST_ID.CREATE_NEW_TRAINING_BUTTON}
                    >
                        Создать тренировку
                    </Button>
                </div>
            )}
        </React.Fragment>
    );
};
