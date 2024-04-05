import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { DD_MM_YYYY } from '@constants/index';
import { INVITE_STATUS } from '@constants/invite-status';
import { TRAININGS } from '@constants/training-types';
import {
    useLazyGetTrainingPalsQuery,
    useSendInviteAnswerMutation,
} from '@redux/services/invite-service';
import { Avatar, Button, Typography } from 'antd';
import moment from 'moment';

import { Invite } from '../../../../types';
import { InviteTrainingCard } from '../invite-training-card';

import styles from './invite-card.module.scss';

type Props = {
    invite: Invite;
};

export const InviteCard = ({ invite }: Props) => {
    const [openInviteTrainingCard, setOpenInviteTrainingCard] = useState(false);
    const [sendInviteAnswer] = useSendInviteAnswerMutation();
    const [getTrainingPals] = useLazyGetTrainingPalsQuery();

    const closeInviteTrainingCardHandler = () => setOpenInviteTrainingCard(false);
    const openInviteTrainingCardHandler = () => setOpenInviteTrainingCard(true);

    const acceptInviteHandler = async () => {
        closeInviteTrainingCardHandler();
        // eslint-disable-next-line no-underscore-dangle
        await sendInviteAnswer({ id: invite._id, status: INVITE_STATUS.ACCEPTED });
        await getTrainingPals();
    };

    const rejectInviteHandler = () => {
        // eslint-disable-next-line no-underscore-dangle
        sendInviteAnswer({ id: invite._id, status: INVITE_STATUS.REJECTED });
        closeInviteTrainingCardHandler();
    };

    return (
        // eslint-disable-next-line no-underscore-dangle
        <div key={invite._id} className={styles.InviteCard}>
            <div className={styles.UserInfo}>
                <Avatar
                    size={42}
                    alt={invite.from.firstName}
                    src={invite.from.imageSrc}
                    icon={<UserOutlined />}
                />
                <div className={styles.UserName}>
                    <h6>{invite.from.firstName}</h6>
                    <h6>{invite.from.lastName}</h6>
                </div>
            </div>
            <div className={styles.Message}>
                <Typography.Text className={styles.Date}>
                    {moment(invite.createdAt).format(DD_MM_YYYY)}
                </Typography.Text>
                <Typography.Title level={5} className={styles.Greeting}>
                    {`Привет, я ищу партнёра для совместных [${TRAININGS.get(
                        invite.training.name,
                    )}]. Ты хочешь присоединиться ко мне на
                    следующих тренировках?`}
                </Typography.Title>
                <Button type='link' onClick={openInviteTrainingCardHandler}>
                    Посмотреть детали тренировки
                </Button>
                {openInviteTrainingCard && (
                    <InviteTrainingCard
                        training={invite.training}
                        onCloseHandler={closeInviteTrainingCardHandler}
                    />
                )}
            </div>
            <div className={styles.Buttons}>
                <Button type='primary' size='large' onClick={acceptInviteHandler}>
                    Тренироваться вместе
                </Button>

                <Button size='large' onClick={rejectInviteHandler}>
                    Отклонить запрос
                </Button>
            </div>
        </div>
    );
};
