import React, { Dispatch, SetStateAction, useState } from 'react';
import { DATA_TEST_ID } from '@constants/index';
import { useCreateFeedbackMutation } from '@redux/services/feedback-service';
import { characterRender } from '@utils/character-rate-render';
import { Button, Input, Modal, Rate } from 'antd';

import { ModalFeedbackError } from '../modal-feedback-error';
import { ModalFeedbackSuccess } from '../modal-feedback-success';

import styles from './modal-feedback.module.scss';

type Props = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    handleRefetch: () => void;
};

const { TextArea } = Input;

export const ModalFeedback = ({ open, setOpen, handleRefetch }: Props) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [createFeedback, { isError, isSuccess }] = useCreateFeedbackMutation();

    const isSubmitDisabled = !rating;

    const handleOk = () => {
        setOpen(false);
        createFeedback({ message, rating });
    };

    const handleCancel = () => {
        setMessage('');
        setRating(0);
        setOpen(false);
    };

    const handleCloseModalSuccess = () => {
        handleRefetch();
        handleCancel();
    };

    const handleRefetchFeedback = () => setOpen(true);

    const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setMessage(e.target.value);
    const handleChangeRate = (value: number) => setRating(value);

    return (
        <React.Fragment>
            <Modal
                open={open}
                title='Ваш отзыв'
                className={styles.modalFeedback}
                onOk={handleOk}
                onCancel={handleCancel}
                centered={true}
                footer={[
                    <Button
                        type='primary'
                        key='publish'
                        onClick={handleOk}
                        data-test-id={DATA_TEST_ID.NEW_REVIEW_SUBMIT_BUTTON}
                        disabled={isSubmitDisabled}
                    >
                        Опубликовать
                    </Button>,
                ]}
            >
                <Rate
                    value={rating}
                    onChange={handleChangeRate}
                    character={({ index }) => characterRender(index, rating)}
                />

                <TextArea
                    value={message}
                    placeholder='Расскажите, почему Вам понравилось наше приложение.'
                    rows={2}
                    onChange={handleChangeMessage}
                />
            </Modal>
            <ModalFeedbackSuccess
                isSuccess={isSuccess}
                handleCloseModalSuccess={handleCloseModalSuccess}
            />
            <ModalFeedbackError isError={isError} handleRefetchFeedback={handleRefetchFeedback} />
        </React.Fragment>
    );
};
