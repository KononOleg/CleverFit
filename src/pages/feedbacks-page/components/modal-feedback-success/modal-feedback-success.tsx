import { useEffect, useState } from 'react';
import { Button, Modal, Result } from 'antd';

import styles from './modal-feedback-success.module.scss';

type Props = {
    isSuccess: boolean;
    handleCloseModalSuccess: () => void;
};

export const ModalFeedbackSuccess = ({ isSuccess, handleCloseModalSuccess }: Props) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isSuccess) setOpen(true);
    }, [isSuccess]);

    const handleCancel = () => {
        handleCloseModalSuccess();
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            className={styles.modalFeedbackSuccess}
            centered={true}
            footer={null}
            closable={false}
        >
            <Result
                status='success'
                title='Отзыв успешно опубликован'
                extra={
                    <Button type='primary' block={true} onClick={handleCancel}>
                        Отлично
                    </Button>
                }
            />
        </Modal>
    );
};
