import React from 'react';
import { CheckCircleFilled, UserOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { useRemoveInviteMutation } from '@redux/services/invite-service';
import { Avatar, Button, Modal } from 'antd';

import { JointTrainig } from '../../../../types';

import styles from './joint-training-modal.module.scss';

type Props = {
    open: boolean;
    onClose: () => void;
    partner: JointTrainig;
};

export const JointTrainingModal = ({ open, onClose, partner }: Props) => {
    const [removeInvite] = useRemoveInviteMutation();

    const [name, surName] = partner.name.split(' ') ?? [];

    const rejectInviteHandler = () => {
        removeInvite({ id: partner.inviteId as string });
        onClose();
    };

    return (
        <Modal
            data-test-id={DATA_TEST_ID.PARTNER_MODAL}
            className={styles.JointTrainingModal}
            open={open}
            centered={true}
            onCancel={onClose}
            footer={null}
        >
            <React.Fragment>
                <div className={styles.Block}>
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
                </div>

                <div className={styles.Block}>
                    <div className={styles.Status}>
                        тренировка одобрена
                        <CheckCircleFilled />
                    </div>
                    <Button size='large' onClick={rejectInviteHandler}>
                        Отменить тренировку
                    </Button>
                </div>
            </React.Fragment>
        </Modal>
    );
};
