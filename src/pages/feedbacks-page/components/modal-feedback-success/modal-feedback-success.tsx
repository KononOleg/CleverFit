import { Button, Modal, Result } from 'antd';

import styles from './modal-feedback-success.module.scss';

type Props = {
    open: boolean;
    handleCloseModalSuccess: () => void;
};

export const ModalFeedbackSuccess = ({ open, handleCloseModalSuccess }: Props) => (
    <Modal
        open={open}
        className={styles.ModalFeedbackSuccess}
        centered={true}
        onCancel={handleCloseModalSuccess}
        footer={null}
        closable={false}
    >
        <Result
            status='success'
            title='Отзыв успешно опубликован'
            extra={
                <Button type='primary' block={true} onClick={handleCloseModalSuccess}>
                    Отлично
                </Button>
            }
        />
    </Modal>
);
