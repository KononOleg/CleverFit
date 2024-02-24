import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './confirm-email-page.module.scss';

import { Result, Typography } from 'antd';
import VerificationInput from 'react-verification-input';
import { authSelector, useConfirmEmailMutation } from '@redux/services/auth-service';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '@constants/index';

const { Text } = Typography;

export const ConfirmEmailPage: React.FC = () => {
    const [isError, setIsError] = useState(false);
    const { email } = useAppSelector(authSelector);
    const [confirmEmail] = useConfirmEmailMutation();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state) {
            navigate(PATH.Auth);
        }
    }, [location, navigate]);

    const onCompleteHandler = async (code: string) => {
        try {
            await confirmEmail({ email, code }).unwrap();
        } catch {
            setIsError(true);
        }
    };

    return (
        <>
            <Result
                className={styles.result}
                status={isError ? 'error' : 'info'}
                title={`${isError ? 'Неверный код.' : ''} Введите код для восстановления аккауанта`}
                subTitle={
                    <p>
                        Мы отправили вам на e-mail <span className='body_strong'>{email}</span>{' '}
                        шестизначный код. Введите его в поле ниже.
                    </p>
                }
                extra={
                    <VerificationInput
                        classNames={{
                            container: cn(styles.recoveryInput, {
                                [styles.recoveryInputError]: isError,
                            }),
                        }}
                        onComplete={onCompleteHandler}
                        inputProps={{ 'data-test-id': '' }}
                    />
                }
            />
            <Text type='secondary' className='recovery__text_bottom'>
                Не пришло письмо? Проверьте папку Спам.
            </Text>
        </>
    );
};
