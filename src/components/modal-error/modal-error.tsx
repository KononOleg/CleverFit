import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DATA_TEST_ID, PATH } from '@constants/index';
import { Button, Modal, Result } from 'antd';

import styles from './modal-error.module.scss';

type Props = {
    isError: boolean;
};

export const ModalError = ({ isError }: Props) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) setOpen(true);
    }, [isError]);

    const handleCancel = () => {
        navigate(PATH.MAIN);
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            centered={true}
            className={styles.ModalError}
            onCancel={handleCancel}
            footer={null}
            closable={false}
            data-test-id={DATA_TEST_ID.MODAL_NO_REVIEW}
        >
            <Result
                status='500'
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте ещё раз.'
                extra={
                    <Button type='primary' onClick={handleCancel}>
                        Назад
                    </Button>
                }
            />
        </Modal>
    );
};
