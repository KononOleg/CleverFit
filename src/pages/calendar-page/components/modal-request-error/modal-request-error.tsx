import { Modal } from 'antd';

import styles from './modal-request-error.module.scss';
import { useEffect, useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';

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
        title,
        content: subtitle,
        className: styles.ModalRequestError,
        handleCancel: { handleCancel },
        closable: true,
        centered: true,
        icon: <CloseCircleOutlined />,
        okText,
        onOk: onOkHandler,
    };

    useEffect(() => {
        if (open) {
            type === 'info' ? Modal.info(config) : Modal.error(config);
        }
    }, [open]);

    return null;
};
