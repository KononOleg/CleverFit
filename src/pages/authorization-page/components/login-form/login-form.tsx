import React from 'react';

import styles from '../../authorization-page.module.scss';

import { Button, Checkbox, Form, Input } from 'antd';

import { SubmitButton } from '@components/submit-button';
import { email, required } from '../../../../helpers';
import { useLoginMutation } from '@redux/services/auth-service';

type FormValues = {
    email: string;
    password: string;
    remember: boolean;
};

export const LoginForm: React.FC = () => {
    const [login] = useLoginMutation();
    const [form] = Form.useForm<FormValues>();

    const handleFinish = (credentials: FormValues) => login(credentials).unwrap();

    return (
        <Form className={styles.Form} form={form} onFinish={handleFinish}>
            <Form.Item name='email' rules={[required, email]}>
                <Input addonBefore='e-mail:' size='large' />
            </Form.Item>

            <Form.Item name='password' rules={[required]}>
                <Input.Password size='large' placeholder='Пароль' />
            </Form.Item>

            <div className={styles.rememberWrap}>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Button type='link' size='middle' disabled>
                    Забыли пароль?
                </Button>
            </div>

            <SubmitButton form={form} />
        </Form>
    );
};
