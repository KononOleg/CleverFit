import { PlusOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { Button } from 'antd';

import { Training } from '../../../../types';
import { TableExercises } from '../table-exercises';

import styles from './training-list.module.scss';

type Props = {
    openDrawerExercisesHandler: () => void;
    onChangeTrainingHandler: (training: Training) => void;
};

export const TrainingList = ({ openDrawerExercisesHandler, onChangeTrainingHandler }: Props) => {
    const { trainingList } = useAppSelector(trainingSelector);

    const isTrainingListEmpty = trainingList && trainingList.length === 0;

    return (
        <div className={styles.TrainingList}>
            <TableExercises onChangeTrainingHandler={onChangeTrainingHandler} />

            {!isTrainingListEmpty && (
                <Button
                    type='primary'
                    size='large'
                    icon={<PlusOutlined />}
                    className={styles.AddButton}
                    data-test-id={DATA_TEST_ID.CREATE_NEW_TRAINING_BUTTON}
                    onClick={openDrawerExercisesHandler}
                >
                    Новая тренировка
                </Button>
            )}
        </div>
    );
};
