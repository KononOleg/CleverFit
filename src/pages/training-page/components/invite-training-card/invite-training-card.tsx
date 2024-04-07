import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { DATA_TEST_ID, DD_MM_YYYY } from '@constants/index';
import { BadgeCustom } from '@pages/calendar-page/components/badge-custom';
import { getKeyByPeriod } from '@utils/find-period-option';
import { Button, Card, Typography } from 'antd';
import moment from 'moment';

import { Training } from '../../../../types';

import styles from './invite-training-card.module.scss';

type Props = {
    training: Training;
    onCloseHandler: () => void;
};

export const InviteTrainingCard = ({ training, onCloseHandler }: Props) => (
    <Card
        className={styles.InviteTrainingCard}
        data-test-id={DATA_TEST_ID.JOINT_TRAINING_REVIEW_CARD}
        title={
            <React.Fragment>
                <BadgeCustom text={training.name} />
                <Button
                    data-test-id={DATA_TEST_ID.MODAL_CREATE_TRAINING_BUTTON_CLOSE}
                    className={styles.CloseButton}
                    type='text'
                    size='small'
                    icon={<CloseOutlined />}
                    onClick={onCloseHandler}
                />
            </React.Fragment>
        }
    >
        <React.Fragment>
            {training.parameters?.period && (
                <div className={styles.Column}>
                    <Typography.Text className={styles.Period}>
                        {getKeyByPeriod(training.parameters?.period)}
                    </Typography.Text>
                    <Typography.Text>{moment(training.date).format(DD_MM_YYYY)}</Typography.Text>
                </div>
            )}

            {training.exercises?.map(({ name, approaches, replays }) => (
                <div className={styles.Column}>
                    <Typography.Text type='secondary'>{name}</Typography.Text>
                    <Typography.Text className={styles.Approaches}>
                        {`${approaches} x (${replays})`}
                    </Typography.Text>
                </div>
            ))}
        </React.Fragment>
    </Card>
);
