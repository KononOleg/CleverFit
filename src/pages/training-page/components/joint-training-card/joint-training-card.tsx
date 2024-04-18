import { useCallback } from 'react';
import { CheckCircleFilled, ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Highlighter } from '@components/highlighter';
import { DATA_TEST_ID } from '@constants/index';
import { INVITE_STATUS } from '@constants/invite-status';
import { useSendInviteAnswerMutation } from '@redux/services/invite-service';
import { Avatar, Button, Card } from 'antd';
import cn from 'classnames';

import styles from './joint-training-card.module.scss';

import { JointTrainig } from '@/types/index';

type Props = {
    partner: JointTrainig;
    index: number;
    searchValue?: string;
    isMyPartner?: boolean;
    onChangeTrainingHandler?: (partner: JointTrainig) => void;
    onClickHandler?: (partner: JointTrainig) => void;
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

    const isAccepted = partner.status === INVITE_STATUS.ACCEPTED;
    const isPending = partner.status === INVITE_STATUS.PENDING;
    const isRejected = partner.status === INVITE_STATUS.REJECTED;

    const createTrainingHandler = () => {
        if (onChangeTrainingHandler) onChangeTrainingHandler(partner);
    };

    const clickTrainingButtonHandler = () =>
        isAccepted
            ? sendInviteAnswer({ id: partner.inviteId as string, status: INVITE_STATUS.REJECTED })
            : createTrainingHandler();

    const onClick = () => onClickHandler && onClickHandler(partner);

    return (
        <Card
            className={cn(styles.userCard, {
                [styles.userCardSecond]: isMyPartner,
                [styles.userCardThird]: !isMyPartner,
                [styles.userCardFourth]: isRejected,
            })}
            key={partner.id}
            data-test-id={`${DATA_TEST_ID.JOINT_TRAINING_CARDS}${index}`}
            onClick={onClick}
        >
            <div>
                <div className={styles.userInfo}>
                    <Avatar
                        size={42}
                        alt={partner.name}
                        src={partner.imageSrc}
                        icon={!partner.imageSrc && <UserOutlined />}
                    />

                    <h6>{highlight(partner.name)}</h6>
                </div>
                <div className={styles.trainings}>
                    <div className={styles.training}>
                        <span className={styles.trainingType}>Тип тренировки:</span>
                        <span className={styles.trainingInfo}>{partner.trainingType}</span>
                    </div>

                    <div className={styles.training}>
                        <span className={styles.trainingType}>Средняя нагрузка:</span>
                        <span className={styles.trainingInfo}>
                            {partner.avgWeightInWeek} кг/нед
                        </span>
                    </div>
                </div>
                {!isMyPartner && (
                    <div className={styles.buttons}>
                        <Button
                            block={true}
                            size='middle'
                            type={isAccepted ? 'default' : 'primary'}
                            disabled={isRejected || isPending}
                            onClick={clickTrainingButtonHandler}
                        >
                            {isAccepted ? 'Отменить тренировку' : 'Создать тренировку'}
                        </Button>

                        {partner.status && (
                            <div className={styles.status}>
                                {isPending && 'ожидает подтверждения'}
                                {isAccepted && 'запрос одобрен'}
                                {isRejected && 'запрос отклонен'}
                                {isAccepted && (
                                    <CheckCircleFilled className={styles.acceptedStatus} />
                                )}
                                {isRejected && (
                                    <ExclamationCircleOutlined className={styles.rejectedStatus} />
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};
