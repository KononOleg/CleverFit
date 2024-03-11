import { Modal } from 'antd';

import styles from './modal-request-error.module.scss';
import { useEffect, useState } from 'react';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';

type Props = {
    isError: boolean;
    title: string;
    type: 'info' | 'error';
    onClickButton: () => void;
    subtitle: string;
    okText: string;
};
export const ModalRequestError = ({
    title,
    isError,
    subtitle,
    onClickButton,
    okText,
    type,
}: Props) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isError) setOpen(true);
    }, [isError]);

    const handleCancel = () => setOpen(false);

    const onOkHandler = () => {
        setOpen(false);
        onClickButton();
    };

    const config = {
        title: <span data-test-id={DATA_TEST_ID.MODAL_ERROR_USER_TRAINING_TITLE}>{title}</span>,
        content: (
            <span data-test-id={DATA_TEST_ID.MODAL_ERROR_USER_TRAINING_SUBTITLE}>{subtitle}</span>
        ),
        className: styles.ModalRequestError,
        handleCancel,
        closable: true,
        centered: true,
        icon: <CloseCircleOutlined />,
        closeIcon: (
            <CloseOutlined data-test-id={DATA_TEST_ID.MODAL_ERROR_USER_TRAINING_BUTTON_CLOSE} />
        ),
        okText: <span data-test-id={DATA_TEST_ID.MODAL_ERROR_USER_TRAINING_BUTTON}>{okText}</span>,
        onOk: onOkHandler,
    };

    useEffect(() => {
        if (open) {
            type === 'info' ? Modal.info(config) : Modal.error(config);
        }
    }, [open]);

    return null;
};
