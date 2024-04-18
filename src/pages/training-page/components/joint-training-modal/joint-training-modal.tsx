import React from 'react';
import { CheckCircleFilled, UserOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { useRemoveInviteMutation } from '@redux/services/invite-service';
import { Avatar, Button, Modal } from 'antd';

import styles from './joint-training-modal.module.scss';

import { JointTrainig } from '@/types/index';

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
            className={styles.jointTrainingModal}
            open={open}
            centered={true}
            onCancel={onClose}
            footer={null}
        >
            <React.Fragment>
                <div className={styles.block}>
                    <div className={styles.userInfo}>
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
                </div>

                <div className={styles.block}>
                    <div className={styles.status}>
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
