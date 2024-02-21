import React from 'react';

import styles from '../../authorization-page.module.scss';

import { Form, Input } from 'antd';

import { SubmitButton } from '@components/submit-button';
import { confirmPassword, email, password, required } from '../../../../helpers';

type FormValues = {
    email: string;
    password: string;
    confirmPassword: boolean;
};

export const RegistrationForm: React.FC = () => {
    const [form] = Form.useForm<FormValues>();

    const handleFinish = ({ email, password, confirmPassword }: FormValues) =>
        console.log({ email, password, confirmPassword });

    return (
        <Form className={styles.Form} form={form} onFinish={handleFinish}>
            <Form.Item name='email' rules={[required, email]}>
                <Input addonBefore='e-mail:' size='large' />
            </Form.Item>

            <Form.Item name='password' rules={[required, password]}>
                <Input.Password size='large' placeholder='Пароль' />
            </Form.Item>

            <Form.Item
                name='confirmPassword'
                dependencies={['password']}
                rules={[required, confirmPassword('password')]}
            >
                <Input.Password size='large' placeholder='Повторите пароль' />
            </Form.Item>

            <SubmitButton form={form} />
        </Form>
    );
};
