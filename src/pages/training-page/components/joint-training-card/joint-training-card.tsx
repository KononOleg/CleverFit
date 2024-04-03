import { UserOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { Avatar, Button, Card } from 'antd';
import cn from 'classnames';

import { UserJointTrainig } from '../../../../types';

import styles from './joint-training-card.module.scss';

type Props = {
    partner: UserJointTrainig;
    index: number;
    isMyPartner?: boolean;
};

export const JointTrainingCard = ({ partner, isMyPartner, index }: Props) => {
    const [name, surName] = partner.name.split(' ') ?? [];

    return (
        <Card
            className={cn(styles.UserCard, {
                [styles.UserCardSecond]: isMyPartner,
                [styles.UserCardThird]: !isMyPartner,
            })}
            key={partner.id}
            data-test-id={`${DATA_TEST_ID.JOINT_TRAINING_CARDS}${index}`}
        >
            <div>
                <div className={styles.UserInfo}>
                    <Avatar
                        size={42}
                        alt={partner.name}
                        src={partner.imageSrc}
                        icon={!partner.imageSrc && <UserOutlined />}
                    />

                    <h6>
                        {name}
                        <br /> {surName}
                    </h6>
                </div>
                <div className={styles.Trainings}>
                    <div className={styles.Training}>
                        <span className={styles.TrainingType}>Тип тренировки:</span>
                        <span className={styles.TrainingInfo}>{partner.trainingType}</span>
                    </div>

                    <div className={styles.Training}>
                        <span className={styles.TrainingType}>Средняя нагрузка:</span>
                        <span className={styles.TrainingInfo}>
                            {partner.avgWeightInWeek} кг/нед
                        </span>
                    </div>
                </div>
                {!isMyPartner && (
                    <div className={styles.Buttons}>
                        {partner.status ? (
                            <Button block={true} size='middle' type='primary'>
                                Создать тренировку
                            </Button>
                        ) : (
                            <Button
                                block={true}
                                size='middle'
                                type={partner.status === 'ACCEPTED' ? 'default' : 'primary'}
                                disabled={
                                    partner.status === 'REJECTED' || partner.status === 'PENDING'
                                }
                            >
                                {partner.status === 'ACCEPTED'
                                    ? 'Отменить тренировку'
                                    : 'Создать тренировку'}
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};
