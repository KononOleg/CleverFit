import React, { useState } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { inviteSelector } from '@redux/selectors';
import { List, Typography } from 'antd';

import { JointTrainig } from '../../../../types';
import { JointTrainingCard } from '../joint-training-card';
import { JointTrainingModal } from '../joint-training-modal';

import styles from './training-pals.module.scss';

export const TrainingPals = () => {
    const { trainingPals } = useAppSelector(inviteSelector);
    const [openJointTrainingModal, setOpenJointTrainingModal] = useState(false);
    const [selectedTrainingPal, setSelectedTrainingPal] = useState<JointTrainig>();

    const isEmptyTrainingPals = trainingPals && trainingPals.length === 0;

    const openJointTrainingModalHandler = (partner: JointTrainig) => {
        setOpenJointTrainingModal(true);
        setSelectedTrainingPal(partner);
    };
    const closeJointTrainingModalHandler = () => setOpenJointTrainingModal(false);

    return (
        <React.Fragment>
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
                            <JointTrainingCard
                                partner={partner}
                                index={index}
                                isMyPartner={true}
                                onClickHandler={openJointTrainingModalHandler}
                            />
                        )}
                        className={styles.PalsList}
                    />
                )}
            </div>

            {selectedTrainingPal && (
                <JointTrainingModal
                    open={openJointTrainingModal}
                    onClose={closeJointTrainingModalHandler}
                    partner={selectedTrainingPal}
                />
            )}
        </React.Fragment>
    );
};
