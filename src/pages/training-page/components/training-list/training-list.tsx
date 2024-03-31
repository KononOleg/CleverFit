import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { Button } from 'antd';

import { TableExercises } from '../table-exercises';

import styles from './training-list.module.scss';

export const TrainingList = () => {
    const { trainingList } = useAppSelector(trainingSelector);

    const isTrainingListEmpty = trainingList && trainingList.length === 0;

    return (
        <div className={styles.TrainingList}>
            <TableExercises />

            {!isTrainingListEmpty && (
                <Button
                    type='primary'
                    size='large'
                    icon={<PlusOutlined />}
                    className={styles.AddButton}
                >
                    Новая тренировка
                </Button>
            )}
        </div>
    );
};
