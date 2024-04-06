import { useCallback } from 'react';
import { CheckCircleFilled, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Highlighter } from '@components/highlighter';
import { DATA_TEST_ID } from '@constants/index';
import { INVITE_STATUS } from '@constants/invite-status';
import { useSendInviteAnswerMutation } from '@redux/services/invite-service';
import { Avatar, Button, Card } from 'antd';
import cn from 'classnames';

import { UserJointTrainig } from '../../../../types';

import styles from './joint-training-card.module.scss';

type Props = {
    partner: UserJointTrainig;
    index: number;
    searchValue?: string;
    isMyPartner?: boolean;
    onChangeTrainingHandler?: (partner: UserJointTrainig) => void;
    onClickHandler?: (partner: UserJointTrainig) => void;
};

export const JointTrainingCard = ({
    partner,
    isMyPartner,
    index,
    searchValue,
    onChangeTrainingHandler,
    onClickHandler,
}: Props) => {
    const [sendInviteAnswer] = useSendInviteAnswerMutation();
    const highlight = useCallback(
        (text: string) => <Highlighter searchValue={searchValue as string} text={text} />,
        [searchValue],
    );

    const createTrainingHandler = () => {
        if (onChangeTrainingHandler) onChangeTrainingHandler(partner);
    };

    const clickTrainingButtonHandler = () =>
        partner.status === INVITE_STATUS.ACCEPTED
            ? sendInviteAnswer({ id: partner.inviteId as string, status: INVITE_STATUS.REJECTED })
            : createTrainingHandler();

    const onClick = () => onClickHandler && onClickHandler(partner);

    return (
        <Card
            className={cn(styles.UserCard, {
                [styles.UserCardSecond]: isMyPartner,
                [styles.UserCardThird]: !isMyPartner,
                [styles.UserCardFourth]: partner.status === INVITE_STATUS.REJECTED,
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

                    <h6>{highlight(partner.name)}</h6>
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
                            onClick={clickTrainingButtonHandler}
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
                                    <CheckCircleFilled className={styles.AcceptedStatus} />
                                )}
                                {partner.status === INVITE_STATUS.REJECTED && (
                                    <ExclamationCircleOutlined className={styles.RejectedStatus} />
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};
