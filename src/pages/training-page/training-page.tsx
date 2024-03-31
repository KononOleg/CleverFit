import React, { useEffect, useState } from 'react';
import { ModalRequestError } from '@components/modal-request-error';
import { DATA_TEST_ID } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setTrainingList } from '@redux/reducers/training-slice';
import { useGetTrainingListQuery } from '@redux/services/training-service';
import { Card, Tabs, TabsProps } from 'antd';
import cn from 'classnames';

import { Marathons } from './components/marathons';
import { MyWorkouts } from './components/my-workouts';

import styles from './training-page.module.scss';

const tabsItems: TabsProps['items'] = [
    {
        label: 'Мои тренировки',
        key: 'my-workouts',
        children: <MyWorkouts />,
    },
    {
        label: 'Совместные тренировки',
        key: 'group-workouts',
        children: <div />,
    },
    {
        label: 'Марафоны',
        key: 'marathons',
        children: <Marathons />,
    },
];

export const TrainingPage = () => {
    const dispatch = useAppDispatch();
    const [currentTab, setCurrentTab] = useState('');
    const { data: trainingList, isError, refetch } = useGetTrainingListQuery();

    const isMarathonsTab = currentTab === 'marathons';

    useEffect(() => {
        if (trainingList) dispatch(setTrainingList(trainingList));
    }, [dispatch, trainingList]);

    const onChangeHandler = (activeKey: string) => setCurrentTab(activeKey);
    const refetchHandler = () => refetch();

    return (
        <React.Fragment>
            <Card
                className={cn(styles.TrainingPage, {
                    [styles.MarathonsTab]: isMarathonsTab,
                })}
            >
                <Tabs items={tabsItems} onChange={onChangeHandler} />
            </Card>
            <ModalRequestError
                title='При открытии данных произошла ошибка'
                type='info'
                isError={isError}
                subtitle='Попробуйте ещё раз.'
                okText='Обновить'
                closable={true}
                onClickButton={refetchHandler}
                dataTestId={DATA_TEST_ID.MODAL_ERROR_USER_TRAINING_BUTTON}
            />
        </React.Fragment>
    );
};
