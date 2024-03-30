import { useState } from 'react';
import { Card, Tabs, TabsProps } from 'antd';
import cn from 'classnames';

import { Marathons } from './components/marathons';

import styles from './training-page.module.scss';

const tabsItems: TabsProps['items'] = [
    {
        label: 'Мои тренировки',
        key: 'my-workouts',
        children: <div />,
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
    const [currentTab, setCurrentTab] = useState('');

    const isMarathonsTab = currentTab === 'marathons';

    const onChangeHandler = (activeKey: string) => setCurrentTab(activeKey);

    return (
        <Card
            className={cn(styles.TrainingPage, {
                [styles.MarathonsTab]: isMarathonsTab,
            })}
        >
            <Tabs items={tabsItems} onChange={onChangeHandler} />
        </Card>
    );
};
