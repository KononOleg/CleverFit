import { useEffect, useState } from 'react';
import { DATA_TEST_ID } from '@constants/index';
import { Button, Modal, Result } from 'antd';

import styles from './modal-feedback-error.module.scss';

type Props = {
    isError: boolean;
    handleRefetchFeedback: () => void;
};

export const ModalFeedbackError = ({
    isError,
    handleRefetchFeedback,
}: Props) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isError) setOpen(true);
    }, [isError]);

    const handleCancel = () => setOpen(false);

    return (
        <Modal
            open={open}
            centered={true}
            className={styles.ModalFeedbackError}
            onCancel={handleCancel}
            footer={null}
            closable={false}
        >
            <Result
                status='error'
                title='Данные не сохранились'
                subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                extra={[
                    <Button
                        type='primary'
                        key='refetch'
                        onClick={handleRefetchFeedback}
                        data-test-id={DATA_TEST_ID.WRITE_REVIEW_NOT_SAVED_MODAL}
                    >
                        Написать отзыв
                    </Button>,
                    <Button key='close' onClick={handleCancel}>
                        Закрыть
                    </Button>,
                ]}
            />
        </Modal>
    );
};
