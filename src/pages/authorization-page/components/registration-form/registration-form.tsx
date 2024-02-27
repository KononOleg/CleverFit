import {
    DATA_TEST_ID,
    PASSWORD_MESSAGE_ERROR,
    PATH,
    VALIDATION_EMAIL,
    VALIDATION_FIELD_REQUIRED,
    VALIDATION_PASSWORD,
} from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector, prevLocationsSelector } from '@redux/configure-store';
import { useRegistrationMutation } from '@redux/services/auth-service';
import { Button, Form, Input } from 'antd';
import { useEffect } from 'react';

import { checkPrevPath, confirmPasswordRule } from '../../../../utils';
import styles from '../../authorization-page.module.scss';

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
            <Form.Item name='email' rules={[VALIDATION_FIELD_REQUIRED, VALIDATION_EMAIL]}>
                <Input
                    addonBefore='e-mail:'
                    size='large'
                    data-test-id={DATA_TEST_ID.REGISTRATION_EMAIL}
                />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[VALIDATION_FIELD_REQUIRED, VALIDATION_PASSWORD]}
                help={PASSWORD_MESSAGE_ERROR}
            >
                <Input.Password
                    size='large'
                    placeholder='Пароль'
                    data-test-id={DATA_TEST_ID.REGISTRATION_PASSWORD}
                />
            </Form.Item>

            <Form.Item
                name='confirmPassword'
                dependencies={['password']}
                rules={[VALIDATION_FIELD_REQUIRED, confirmPasswordRule('password')]}
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
