import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { Modal } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import styles from './modal-request-error.module.scss';

type Props = {
    isError: boolean;
    title: string;
    type: 'info' | 'error';
    subtitle: string;
    okText: string;
    onClickButton?: () => void;
    dataTestId?: string;
};
export const ModalRequestError = ({
    title,
    isError,
    subtitle,
    onClickButton,
    okText,
    type,
    dataTestId,
}: Props) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isError) setOpen(true);
    }, [isError]);

    const handleCancel = () => setOpen(false);

    const onOkHandler = useCallback(() => {
        setOpen(false);
        onClickButton && onClickButton();
    }, [onClickButton]);

    useEffect(() => {
        const config = {
            title: <span data-test-id={DATA_TEST_ID.MODAL_ERROR_USER_TRAINING_TITLE}>{title}</span>,
            content: (
                <span data-test-id={DATA_TEST_ID.MODAL_ERROR_USER_TRAINING_SUBTITLE}>
                    {subtitle}
                </span>
            ),
            className: styles.ModalRequestError,
            handleCancel,
            closable: true,
            centered: true,
            icon: <CloseCircleOutlined />,
            closeIcon: (
                <CloseOutlined data-test-id={DATA_TEST_ID.MODAL_ERROR_USER_TRAINING_BUTTON_CLOSE} />
            ),
            okText: <span data-test-id={dataTestId}>{okText}</span>,
            onOk: onOkHandler,
        };
        if (open) {
            type === 'info' ? Modal.info(config) : Modal.error(config);
        }
    }, [dataTestId, okText, onOkHandler, open, subtitle, title, type]);

    return null;
};
