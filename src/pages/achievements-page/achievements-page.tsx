import { useEffect } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setTraining, setTrainingList } from '@redux/reducers/training-slice';
import { useGetTrainingListQuery, useGetTrainingQuery } from '@redux/services/training-service';
import { Card, Tabs, TabsProps } from 'antd';

import { Achievements } from './components/achievements';

import styles from './achievements-page.module.scss';

const tabsItems: TabsProps['items'] = [
    {
        label: 'За неделю',
        key: 'week',
        children: <Achievements period='week' />,
    },
    {
        label: 'За месяц',
        key: 'month',
        children: <Achievements period='month' />,
    },
    {
        label: 'За всё время (PRO)',
        key: 'all-time',
        children: <Achievements period='allTime' />,
        disabled: true,
    },
];

export const AchievementsPage = () => {
    const dispatch = useAppDispatch();
    const { data: trainingList } = useGetTrainingListQuery();
    const { data: training } = useGetTrainingQuery();

    useEffect(() => {
        if (trainingList && training) {
            dispatch(setTrainingList(trainingList));
            dispatch(setTraining(training));
        }
    }, [dispatch, training, trainingList]);

    return (
        <Card className={styles.achievementsPage}>
            <Tabs items={tabsItems} destroyInactiveTabPane={true} />
        </Card>
    );
};
