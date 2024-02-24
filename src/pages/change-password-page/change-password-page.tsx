import React, { useEffect } from 'react';

import styles from './change-password-page.module.scss';
import { useChangePasswordMutation } from '@redux/services/auth-service';
import { Form, Input, Typography } from 'antd';
import { confirmPassword, password, required } from '../../helpers/';
import { SubmitButton } from '@components/submit-button';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '@constants/index';

const { Title } = Typography;

type FormValues = {
    password: string;
    confirmPassword: string;
};

export const ChangePasswordPage: React.FC = () => {
    const [changePassword] = useChangePasswordMutation();
    const [form] = Form.useForm<FormValues>();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state) {
            navigate(PATH.Auth);
        }
    }, [location, navigate]);

    const handleFinish = (credentials: FormValues) => changePassword(credentials);

    return (
        <Form className={styles.Form} form={form} onFinish={handleFinish}>
            <Title level={3}>Восстановление аккаунта</Title>
            <Form.Item name='password' rules={[required, password]}>
                <Input.Password size='large' placeholder='Новый пароль' />
            </Form.Item>

            <Form.Item
                name='confirmPassword'
                dependencies={['password']}
                rules={[required, confirmPassword('password')]}
            >
                <Input.Password size='large' placeholder='Повторите пароль' />
            </Form.Item>

            <SubmitButton form={form} buttonText='Сохранить' />
        </Form>
    );
};
