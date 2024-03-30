import { Card, Tabs, TabsProps } from 'antd';

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
        children: <div />,
    },
];

export const TrainingPage = () => (
    <Card className={styles.TrainingPage}>
        <Tabs items={tabsItems} />
    </Card>
);
