import { ArrowLeftOutlined } from '@ant-design/icons';
import { colors } from '@constants/index';
import { BadgeCustom } from '@pages/calendar-page/components/badge-custom';
import { Button, Card } from 'antd';

import { Training } from '../../../../types';

import styles from './edit-training.module.scss';

type CardProps = {
    selectedTraining: Training;
    closeEditTrainingHandler: VoidFunction;
    onChangeTrainingHandler: (training: Training) => void;
};

export const EditTraining: React.FC<CardProps> = ({
    selectedTraining,
    closeEditTrainingHandler,
    onChangeTrainingHandler,
}) => {
    const editExercisesHandel = () => onChangeTrainingHandler(selectedTraining);

    return (
        <Card
            className={styles.EditTraining}
            actions={[
                <Button size='middle' type='ghost' block={true} onClick={editExercisesHandel}>
                    Добавить упражнения
                </Button>,
            ]}
        >
            <div
                className={styles.Title}
                style={{ borderBottom: `2px solid ${colors.get(selectedTraining.name)}` }}
            >
                <Button
                    type='text'
                    size='large'
                    icon={<ArrowLeftOutlined />}
                    onClick={closeEditTrainingHandler}
                />
                <span>{selectedTraining?.name}</span>
            </div>
            <div className={styles.Body}>
                {selectedTraining.exercises.map(({ _id, name }, index) => (
                    <div key={_id}>
                        <BadgeCustom text={name} isEdit={false} isExercise={true} index={index} />
                    </div>
                ))}
            </div>
        </Card>
    );
};
