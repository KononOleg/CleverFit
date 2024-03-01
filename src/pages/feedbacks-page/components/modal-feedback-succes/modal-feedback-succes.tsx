import { Button, Modal, Result } from 'antd';

import styles from './modal-feedback-succes.module.scss';

type Props = {
    open: boolean;
    handleCloseModalSucces: () => void;
};

export const ModalFeedbackSuccess = ({ open, handleCloseModalSucces }: Props) => {
    return (
        <Modal
            open={open}
            className={styles.ModalFeedbackSuccess}
            centered={true}
            onCancel={handleCloseModalSucces}
            footer={null}
            closable={false}
            maskStyle={{ backdropFilter: 'blur(6px)' }}
        >
            <Result
                status='success'
                title='Отзыв успешно опубликован'
                extra={
                    <Button type='primary' block onClick={handleCloseModalSucces}>
                        Отлично
                    </Button>
                }
            />
        </Modal>
    );
};
