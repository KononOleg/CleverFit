import { Button, Card } from 'antd';

import styles from '../card-modal/card-modal.module.scss';
import Meta from 'antd/lib/card/Meta';
import { CloseOutlined } from '@ant-design/icons';
import moment from 'moment';

import { BadgeTraining } from '../badge-training';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';

import { Empty } from '../empty';
import { Training } from '../../../../types';

type Props = {
    trainingByDay: Training[];
    closeModalHandler: () => void;
    nextModalHandler: () => void;
};

export const CardTraining = ({ trainingByDay, closeModalHandler, nextModalHandler }: Props) => {
    const { selectedDate } = useAppSelector(trainingSelector);

    const isEmptyTrainingByDay = trainingByDay && trainingByDay.length === 0;

    return (
        <Card
            className={styles.cardModal}
            title={
                <>
                    <Meta
                        title={`Тренировки на ${moment(selectedDate).format('DD.MM.YYYY')}`}
                        description={isEmptyTrainingByDay && 'Нет активных тренировок'}
                    />
                    <Button
                        className={styles.CloseButton}
                        type='text'
                        size='small'
                        icon={<CloseOutlined />}
                        onClick={closeModalHandler}
                    />
                </>
            }
            actions={[
                <Button block size='large' type='primary' onClick={nextModalHandler}>
                    {isEmptyTrainingByDay ? 'Создать тренировку' : 'Добавить тренировку'}
                </Button>,
            ]}
        >
            {isEmptyTrainingByDay ? (
                <Empty />
            ) : (
                <BadgeTraining training={trainingByDay} isEdit={true} />
            )}
        </Card>
    );
};
