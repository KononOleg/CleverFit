import { DATA_TEST_ID } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector, useConfirmEmailMutation } from '@redux/services/auth-service';
import { Result, Typography } from 'antd';
import cn from 'classnames';
import { useState } from 'react';
import VerificationInput from 'react-verification-input';

import styles from './confirm-email-page.module.scss';

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
                className={styles.Result}
                status={isError ? 'error' : 'info'}
                title={`${isError ? 'Неверный код.' : ''} Введите код для восстановления аккаунта`}
                subTitle={
                    <p>
                        Мы отправили вам на e-mail{' '}
                        <span className={styles.bodyStrong}>{email}</span> шестизначный код. Введите
                        его в поле ниже.
                    </p>
                }
                extra={
                    <VerificationInput
                        classNames={{
                            container: styles.container,
                            character: cn(styles.character, {
                                [styles.characterError]: isError,
                            }),

                            characterInactive: styles.characterInactive,
                            characterSelected: styles.characterSelected,
                        }}
                        value={codeValue}
                        placeholder=''
                        onComplete={onCompleteHandler}
                        inputProps={{ 'data-test-id': DATA_TEST_ID.VERIFICATION_INPUT }}
                        onChange={(value) => setCodeValue(value)}
                    />
                }
            />
            <Text type='secondary'>Не пришло письмо? Проверьте папку Спам.</Text>
        </>
    );
};
