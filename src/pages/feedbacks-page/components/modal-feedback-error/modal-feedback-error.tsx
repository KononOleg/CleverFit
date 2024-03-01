import { Button, Modal, Result } from 'antd';
import { DATA_TEST_ID } from '@constants/index';

import styles from './modal-feedback-error.module.scss';

type Props = {
    open: boolean;
    handleCloseModalError: () => void;
    handleRefetchFeedback: () => void;
};

export const ModalFeedbackError = ({
    open,
    handleCloseModalError,
    handleRefetchFeedback,
}: Props) => {
    return (
        <Modal
            open={open}
            centered={true}
            className={styles.ModalFeedbackError}
            onCancel={handleCloseModalError}
            footer={null}
            closable={false}
            maskStyle={{ backdropFilter: 'blur(6px)' }}
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
                    <Button key='close' onClick={handleCloseModalError}>
                        Закрыть
                    </Button>,
                ]}
            />
        </Modal>
    );
};
