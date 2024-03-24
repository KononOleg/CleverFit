import { Modal, Typography } from 'antd';

import styles from './tariff-success-modal.module.scss';
import { CheckCircleFilled } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { useState } from 'react';
import { profileSelector } from '@redux/selectors';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { signOut } from '@redux/reducers/auth-slice';

export const TariffSuccessModal = () => {
    const { profile } = useAppSelector(profileSelector);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(true);

    const handleCancel = () => {
        setOpen(false);
        dispatch(signOut());
    };

    return (
        <Modal
            className={styles.TariffSuccessModal}
            open={open}
            closable={true}
            footer={false}
            onCancel={handleCancel}
            centered={true}
            data-test-id={DATA_TEST_ID.TARIFF_MODAL_SUCCESS}
        >
            <div className={styles.Wrapper}>
                <CheckCircleFilled className={styles.Icon} />
                <div>
                    <Typography.Title level={3}>Чек для оплаты у вас на почте</Typography.Title>
                    Мы отправили инструкцию для оплаты вам на e-mail
                    <span>{profile?.email}</span>. После подтверждения оплаты войдите в приложение
                    заново.
                </div>
                <div>Не пришло письмо? Проверьте папку Спам.</div>
            </div>
        </Modal>
    );
};