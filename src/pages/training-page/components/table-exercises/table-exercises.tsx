/* eslint-disable no-underscore-dangle */

import { useState } from 'react';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { BadgeCustom } from '@pages/calendar-page/components/badge-custom';
import { trainingSelector } from '@redux/selectors';
import { getKeyByPeriod } from '@utils/find-period-option';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { Training } from '../../../../types';
import { EditTraining } from '../edit-training';

import styles from './table-exercises.module.scss';

type Props = {
    onChangeTrainingHandler: (training: Training) => void;
};

export const TableExercises = ({ onChangeTrainingHandler }: Props) => {
    const { training } = useAppSelector(trainingSelector);
    const [openEditTraining, setOpenEditTraining] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState<Training>();

    const openEditTrainingHandler = (record: Training) => {
        setOpenEditTraining(true);
        setSelectedTraining(record);
    };
    const closeEditTrainingHandler = () => setOpenEditTraining(false);

    const columns: ColumnsType<Training> = [
        {
            title: 'Тип тренировки',
            dataIndex: 'trainingType',
            key: 'trainingType',
            render: (_, record) => (
                <div className={styles.TrainingType}>
                    <BadgeCustom isEdit={false} text={record.name} />
                    <Button type='link' onClick={() => openEditTrainingHandler(record)}>
                        <DownOutlined />
                    </Button>
                    {openEditTraining && record._id === selectedTraining?._id && (
                        <EditTraining
                            selectedTraining={record}
                            closeEditTrainingHandler={closeEditTrainingHandler}
                            onChangeTrainingHandler={onChangeTrainingHandler}
                        />
                    )}
                </div>
            ),
        },
        {
            key: 'period',
            title: 'Периодичность',
            dataIndex: 'period',
            render: (_, record) => <div>{getKeyByPeriod(record.parameters?.period)}</div>,
            sorter: (a, b) => Number(a.parameters?.period) - Number(b.parameters?.period),
        },
        {
            key: 'action',
            dataIndex: 'action',
            width: 30,
            render: (_, record, index) => (
                <Button
                    type='link'
                    className={styles.EditButton}
                    data-test-id={`${DATA_TEST_ID.UPDATE_MY_TRAINING_TABLE_ICON}${index}`}
                    onClick={() => onChangeTrainingHandler(record)}
                    disabled={record.isImplementation}
                    icon={<EditOutlined />}
                />
            ),
        },
    ];

    return (
        <Table
            data-test-id={DATA_TEST_ID.MY_TRAININGS_TABLE}
            className={styles.TableExercises}
            columns={columns}
            pagination={{ position: ['bottomLeft', 'bottomLeft'] }}
            dataSource={training}
            size='small'
        />
    );
};
