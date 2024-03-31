import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { BadgeCustom } from '@pages/calendar-page/components/badge-custom';
import { trainingSelector } from '@redux/selectors';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { Training } from '../../../../types';

import styles from './table-exercises.module.scss';

export const TableExercises = () => {
    const { training } = useAppSelector(trainingSelector);

    const columns: ColumnsType<Training> = [
        {
            title: 'Тип тренировки',
            dataIndex: 'trainingType',
            key: 'trainingType',
            render: (_text, record) => (
                <div className={styles.TrainingType}>
                    <BadgeCustom isEdit={false} text={record.name} />
                    <Button type='link'>
                        <DownOutlined />
                    </Button>
                </div>
            ),
        },
        {
            key: 'period',
            title: 'Сортировка по периоду',
            dataIndex: 'period',
            render: () => <div>Через 1 день</div>,
            sorter: (a, b) => Number(a.parameters?.period) - Number(b.parameters?.period),
        },
        {
            key: 'action',
            dataIndex: 'action',
            width: 30,
            render: () => (
                <Button type='link' className={styles.EditButton}>
                    <EditOutlined />
                </Button>
            ),
        },
    ];

    return (
        <Table
            className={styles.TableExercises}
            columns={columns}
            pagination={{ position: ['bottomLeft', 'bottomLeft'] }}
            dataSource={training}
            size='small'
        />
    );
};
