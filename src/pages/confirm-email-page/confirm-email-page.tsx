import { useState } from 'react';
import cn from 'classnames';

import styles from './confirm-email-page.module.scss';

import { Result, Typography } from 'antd';
import VerificationInput from 'react-verification-input';
import { authSelector, useConfirmEmailMutation } from '@redux/services/auth-service';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { DATA_TEST_ID } from '@constants/index';

const { Text } = Typography;

export const ConfirmEmailPage = () => {
    const [isError, setIsError] = useState(false);
    const [codeValue, setCodeValue] = useState('');

    const { email } = useAppSelector(authSelector);

    const [confirmEmail] = useConfirmEmailMutation();

    const onCompleteHandler = async (code: string) => {
        try {
            await confirmEmail({ email, code }).unwrap();
        } catch {
            setIsError(true);
            setCodeValue('');
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
                        Мы отправили вам на e-mail <span className='body_strong'>{email}</span>
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
                        value={codeValue}
                        onComplete={onCompleteHandler}
                        inputProps={{ 'data-test-id': DATA_TEST_ID.VERIFICATION_INPUT }}
                        onChange={(value) => setCodeValue(value)}
                    />
                }
            />
            <Text type='secondary' className='recovery__text_bottom'>
                Не пришло письмо? Проверьте папку Спам.
            </Text>
        </>
    );
};
