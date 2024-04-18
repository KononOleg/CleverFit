import { ArrowLeftOutlined } from '@ant-design/icons';
import { BadgeCustom } from '@pages/calendar-page/components/badge-custom';
import { getBadgeColor } from '@utils/get-badge-color';
import { Button, Card } from 'antd';

import styles from './edit-training.module.scss';

import { Training } from '@/types/index';

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
            className={styles.editTraining}
            actions={[
                <Button size='middle' type='ghost' block={true} onClick={editExercisesHandel}>
                    Добавить упражнения
                </Button>,
            ]}
        >
            <div
                className={styles.title}
                style={{ borderBottom: `2px solid ${getBadgeColor(selectedTraining.name)}` }}
            >
                <Button
                    type='text'
                    size='large'
                    icon={<ArrowLeftOutlined />}
                    onClick={closeEditTrainingHandler}
                />
                <span>{selectedTraining?.name}</span>
            </div>
            <div className={styles.body}>
                {selectedTraining.exercises.map(({ _id, name }, index) => (
                    <div key={_id}>
                        <BadgeCustom text={name} isEdit={false} isExercise={true} index={index} />
                    </div>
                ))}
            </div>
        </Card>
    );
};
