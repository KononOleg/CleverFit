import { useEffect } from 'react';

import styles from './change-password-page.module.scss';
import { useChangePasswordMutation } from '@redux/services/auth-service';
import { Button, Form, Input, Typography } from 'antd';
import {
    checkPrevPath,
    confirmPasswordRule,
    passwordMessageError,
    passwordRule,
    requiredRule,
} from '../../helpers/';

import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector, prevLocationsSelector } from '@redux/configure-store';
import { DATA_TEST_ID, PATH } from '@constants/index';

const { Title } = Typography;

type FormValues = {
    password: string;
    confirmPassword: string;
};

export const ChangePasswordPage = () => {
    const [changePassword] = useChangePasswordMutation();
    const [form] = Form.useForm<FormValues>();
    const { password } = useAppSelector(authSelector);
    const handleFinish = (credentials: FormValues) => changePassword(credentials);

    const prevLocation = useAppSelector(prevLocationsSelector);

    useEffect(() => {
        if (checkPrevPath(prevLocation, PATH.ERROR_CHANGE_PASSWORD))
            changePassword({
                password,
                confirmPassword: password,
            });
    }, [changePassword, password, prevLocation]);

    return (
        <Form className={styles.Form} form={form} onFinish={handleFinish}>
            <Title level={3}>Восстановление аккаунта</Title>
            <Form.Item
                name='password'
                rules={[requiredRule, passwordRule]}
                help={passwordMessageError}
            >
                <Input.Password
                    size='large'
                    placeholder='Новый пароль'
                    data-test-id={DATA_TEST_ID.CHANGE_PASSWORD}
                />
            </Form.Item>

            <Form.Item
                name='confirmPassword'
                dependencies={['password']}
                rules={[requiredRule, confirmPasswordRule('password')]}
            >
                <Input.Password
                    size='large'
                    placeholder='Повторите пароль'
                    data-test-id={DATA_TEST_ID.CHANGE_CONFIRM_PASSWORD}
                />
            </Form.Item>
            <Button
                className={styles.LoginButton}
                type='primary'
                htmlType='submit'
                size='large'
                block
                data-test-id={DATA_TEST_ID.CHANGE_SUBMIT_BUTTON}
            >
                Сохранить
            </Button>
        </Form>
    );
};
