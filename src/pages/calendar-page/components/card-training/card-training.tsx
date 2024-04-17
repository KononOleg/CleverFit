import React, { useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { DATA_TEST_ID, DD_MM_YYYY } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { closeModal, resetCreatedTraining } from '@redux/reducers/training-slice';
import { trainingSelector } from '@redux/selectors';
import { isOldDate } from '@utils/index';
import { Button, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import moment from 'moment';

import { BadgeTraining } from '../badge-training';
import { Empty } from '../empty';

import styles from '../card-modal/card-modal.module.scss';

import { Training } from '@/types/index';

type Props = {
    trainingByDay: Training[];
    nextModalHandler: () => void;
    onChange: (name: string) => void;
};

export const CardTraining = ({ trainingByDay, nextModalHandler, onChange }: Props) => {
    const dispatch = useAppDispatch();
    const { selectedDate, trainingList } = useAppSelector(trainingSelector);

    useEffect(() => {
        dispatch(resetCreatedTraining());
    }, [dispatch]);

    const isEmptyTrainingByDay = trainingByDay && trainingByDay.length === 0;
    const isDisabled =
        trainingByDay.length === trainingList.length || isOldDate(selectedDate as string);

    const closeModalHandler = () => dispatch(closeModal());

    return (
        <Card
            className={styles.CardModal}
            data-test-id={DATA_TEST_ID.MODAL_CREATE_TRAINING}
            title={
                <React.Fragment>
                    <Meta
                        title={`Тренировки на ${moment(selectedDate).format(DD_MM_YYYY)}`}
                        description={isEmptyTrainingByDay && 'Нет активных тренировок'}
                    />
                    <Button
                        data-test-id={DATA_TEST_ID.MODAL_CREATE_TRAINING_BUTTON_CLOSE}
                        className={styles.CloseButton}
                        type='text'
                        size='small'
                        icon={<CloseOutlined />}
                        onClick={closeModalHandler}
                    />
                </React.Fragment>
            }
            actions={[
                <Button
                    block={true}
                    size='large'
                    type='primary'
                    onClick={nextModalHandler}
                    disabled={isDisabled}
                >
                    Создать тренировку
                </Button>,
            ]}
        >
            {isEmptyTrainingByDay ? (
                <Empty />
            ) : (
                <BadgeTraining training={trainingByDay} isEdit={true} onChange={onChange} />
            )}
        </Card>
    );
};
