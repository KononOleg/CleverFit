import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { inviteSelector } from '@redux/selectors';
import { List, Typography } from 'antd';

import { JointTrainingCard } from '../joint-training-card';

import styles from './training-pals.module.scss';

export const TrainingPals = () => {
    const { trainingPals } = useAppSelector(inviteSelector);

    const isEmptyTrainingPals = trainingPals && trainingPals.length === 0;

    return (
        <div className={styles.TrainingPals}>
            <Typography.Title level={4} className={styles.Title}>
                Мои партнёры по тренировкам
            </Typography.Title>
            {isEmptyTrainingPals ? (
                <Typography.Text>
                    У вас пока нет партнёров для совместных тренировок
                </Typography.Text>
            ) : (
                <List
                    dataSource={trainingPals}
                    renderItem={(partner, index) => (
                        <JointTrainingCard partner={partner} index={index} isMyPartner={true} />
                    )}
                    className={styles.PalsList}
                />
            )}
        </div>
    );
};
