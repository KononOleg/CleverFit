import { DATA_TEST_ID } from '@constants/index';
import { useCreateFeedbackMutation } from '@redux/services/feedback-service';
import { characterRender } from '@utils/characterRateRender';
import { Button, Input, Modal, Rate } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
    const [openModalSucces, setOpenModalSucces] = useState(false);
    const [openModalError, setOpenModalError] = useState(false);
    const [createFeedback, { isError, isSuccess }] = useCreateFeedbackMutation();

    const isSubmitDisabled = !rating;

    useEffect(() => {
        if (isSuccess) {
            handleRefetch();
            setOpenModalSucces(true);
        }
    }, [handleRefetch, isSuccess]);

    useEffect(() => {
        if (isError) setOpenModalError(true);
    }, [isError]);

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
        handleCancel();
        setOpenModalSucces(false);
    };

    const handleCloseModalError = () => {
        setOpenModalError(false);
    };

    const handleRefetchFeedback = () => {
        setOpen(true);
        setOpenModalError(false);
    };

    const handleChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setMessage(e.target.value);
    const handleChangeRate = (value: number) => setRating(value);

    return (
        <>
            <Modal
                open={open}
                title='Ваш отзыв'
                className={styles.ModalFeedback}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
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
                open={openModalSucces}
                handleCloseModalSuccess={handleCloseModalSuccess}
            />
            <ModalFeedbackError
                open={openModalError}
                handleCloseModalError={handleCloseModalError}
                handleRefetchFeedback={handleRefetchFeedback}
            />
        </>
    );
};
