import { useEffect } from 'react';

import styles from '../../authorization-page.module.scss';

import { Button, Form, Input } from 'antd';

import {
    checkPrevPath,
    confirmPasswordRule,
    emailRule,
    passwordRule,
    requiredRule,
} from '../../../../helpers';
import { useRegistrationMutation } from '@redux/services/auth-service';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector, prevLocationsSelector } from '@redux/configure-store';
import { DATA_TEST_ID, PATH } from '@constants/index';

type FormValues = {
    email: string;
    password: string;
    confirmPassword: boolean;
};

export const RegistrationForm = () => {
    const [registration] = useRegistrationMutation();
    const [form] = Form.useForm<FormValues>();
    const { email, password } = useAppSelector(authSelector);
    const prevLocation = useAppSelector(prevLocationsSelector);

    useEffect(() => {
        if (checkPrevPath(prevLocation, PATH.ERROR)) registration({ email, password });
    }, [email, password, prevLocation, registration]);

    const handleFinish = ({ email, password }: FormValues) => registration({ email, password });

    return (
        <Form className={styles.Form} form={form} onFinish={handleFinish}>
            <Form.Item name='email' rules={[requiredRule, emailRule]}>
                <Input
                    addonBefore='e-mail:'
                    size='large'
                    data-test-id={DATA_TEST_ID.REGISTRATION_EMAIL}
                />
            </Form.Item>

            <Form.Item name='password' rules={[requiredRule, passwordRule]}>
                <Input.Password
                    size='large'
                    placeholder='Пароль'
                    data-test-id={DATA_TEST_ID.REGISTRATION_PASSWORD}
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
                    data-test-id={DATA_TEST_ID.REGISTRATION_CONFIRM_PASSWORD}
                />
            </Form.Item>
            <Button
                className={styles.LoginButton}
                type='primary'
                htmlType='submit'
                size='large'
                block
                data-test-id={DATA_TEST_ID.REGISTRATION_SUBMIT_BUTTON}
            >
                Войти
            </Button>
        </Form>
    );
};
