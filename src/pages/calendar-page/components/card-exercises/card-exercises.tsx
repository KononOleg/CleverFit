import { Button, Card } from 'antd';

import styles from '../card-modal/card-modal.module.scss';

import { ArrowLeftOutlined } from '@ant-design/icons';

import { TrainingSelect } from '../training-select';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { Empty } from '../empty';

type Props = {
    prevModalHandler: () => void;
    openDrawerExercisesHandler: () => void;
};

export const CardExercises = ({ prevModalHandler, openDrawerExercisesHandler }: Props) => {
    const { trainingList } = useAppSelector(trainingSelector);

    return (
        <Card
            className={styles.cardModal}
            title={
                <div className={styles.headWrapper}>
                    <Button
                        type='text'
                        size='small'
                        icon={<ArrowLeftOutlined />}
                        onClick={prevModalHandler}
                    />

                    <TrainingSelect trainingList={trainingList} />
                </div>
            }
            actions={[
                <Button block size='large' onClick={openDrawerExercisesHandler}>
                    Добавить упражнения
                </Button>,
                <Button block size='large' type='link' disabled>
                    Сохранить
                </Button>,
            ]}
        >
            <Empty />
        </Card>
    );
};
