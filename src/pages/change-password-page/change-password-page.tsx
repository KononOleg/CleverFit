import { useEffect } from 'react';
import {
    DATA_TEST_ID,
    PASSWORD_MESSAGE_ERROR,
    VALIDATION_FIELD_REQUIRED,
    VALIDATION_PASSWORD,
} from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector, prevLocationsSelector } from '@redux/selectors';
import { useChangePasswordMutation } from '@redux/services/auth-service';
import { PATH } from '@routes/path';
import { Button, Form, Input, Typography } from 'antd';

import { checkPrevPath, confirmPasswordRule } from '../../utils';

import styles from './change-password-page.module.scss';

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
        <Form className={styles.form} form={form} onFinish={handleFinish}>
            <Title level={3}>Восстановление аккаунта</Title>
            <Form.Item
                name='password'
                rules={[VALIDATION_FIELD_REQUIRED, VALIDATION_PASSWORD]}
                help={PASSWORD_MESSAGE_ERROR}
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
                rules={[VALIDATION_FIELD_REQUIRED, confirmPasswordRule('password')]}
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
                block={true}
                data-test-id={DATA_TEST_ID.CHANGE_SUBMIT_BUTTON}
            >
                Сохранить
            </Button>
        </Form>
    );
};
