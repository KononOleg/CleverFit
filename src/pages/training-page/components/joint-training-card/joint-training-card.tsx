import { CheckCircleTwoTone, UserOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { INVITE_STATUS } from '@constants/invite-status';
import { Avatar, Button, Card } from 'antd';
import cn from 'classnames';

import { UserJointTrainig } from '../../../../types';

import styles from './joint-training-card.module.scss';

type Props = {
    partner: UserJointTrainig;
    index: number;
    isMyPartner?: boolean;
    onChangeTrainingHandler?: (partner: UserJointTrainig) => void;
    onClickHandler?: (partner: UserJointTrainig) => void;
};

export const JointTrainingCard = ({
    partner,
    isMyPartner,
    index,
    onChangeTrainingHandler,
    onClickHandler,
}: Props) => {
    const [name, surName] = partner.name.split(' ') ?? [];

    const createTrainingHandler = () => {
        if (onChangeTrainingHandler) onChangeTrainingHandler(partner);
    };

    const onClick = () => onClickHandler && onClickHandler(partner);

    return (
        <Card
            className={cn(styles.UserCard, {
                [styles.UserCardSecond]: isMyPartner,
                [styles.UserCardThird]: !isMyPartner,
            })}
            key={partner.id}
            data-test-id={`${DATA_TEST_ID.JOINT_TRAINING_CARDS}${index}`}
            onClick={onClick}
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
                        <Button
                            block={true}
                            size='middle'
                            type={partner.status === INVITE_STATUS.ACCEPTED ? 'default' : 'primary'}
                            disabled={
                                partner.status === INVITE_STATUS.REJECTED ||
                                partner.status === INVITE_STATUS.PENDING
                            }
                            onClick={createTrainingHandler}
                        >
                            {partner.status === INVITE_STATUS.ACCEPTED
                                ? 'Отменить тренировку'
                                : 'Создать тренировку'}
                        </Button>

                        {partner.status && (
                            <div className={styles.Status}>
                                {partner.status === INVITE_STATUS.PENDING &&
                                    'ожидает подтверждения'}
                                {partner.status === INVITE_STATUS.ACCEPTED && 'запрос одобрен'}
                                {partner.status === INVITE_STATUS.REJECTED && 'запрос отклонен'}
                                {partner.status === INVITE_STATUS.ACCEPTED && (
                                    <CheckCircleTwoTone />
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};
