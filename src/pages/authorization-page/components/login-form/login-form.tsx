import { useEffect, useState } from 'react';

import styles from '../../authorization-page.module.scss';

import { Button, Checkbox, Form, Input } from 'antd';

import { checkPrevPath, emailRule, passwordRule, requiredRule } from '../../../../helpers';
import { useCheckEmailMutation, useLoginMutation } from '@redux/services/auth-service';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector, prevLocationsSelector } from '@redux/configure-store';
import { DATA_TEST_ID, PATH } from '@constants/index';

type FormValues = {
    email: string;
    password: string;
    remember: boolean;
};

export const LoginForm = () => {
    const [login] = useLoginMutation();
    const [checkEmail] = useCheckEmailMutation();
    const [form] = Form.useForm<FormValues>();
    const [isEmailValid, setIsEmailValid] = useState(false);
    const { email } = useAppSelector(authSelector);

    const prevLocation = useAppSelector(prevLocationsSelector);

    useEffect(() => {
        if (checkPrevPath(prevLocation, PATH.ERROR_CHECK_EMAIL)) checkEmail({ email });
    }, [checkEmail, email, prevLocation]);

    const handleFinish = (credentials: FormValues) => login(credentials);

    const handleFormChange = () => {
        if (form.getFieldError('email').length) setIsEmailValid(true);
        else setIsEmailValid(false);
    };

    const confirmEmailHandler = () => {
        if (form.getFieldValue('email')) checkEmail({ email: form.getFieldValue('email') });
    };
    return (
        <Form
            className={styles.Form}
            form={form}
            onFinish={handleFinish}
            onFieldsChange={handleFormChange}
        >
            <Form.Item name='email' rules={[requiredRule, emailRule]}>
                <Input addonBefore='e-mail:' size='large' data-test-id={DATA_TEST_ID.LOGIN_EMAIL} />
            </Form.Item>

            <Form.Item name='password' rules={[requiredRule, passwordRule]}>
                <Input.Password
                    size='large'
                    placeholder='Пароль'
                    data-test-id={DATA_TEST_ID.LOGIN_PASSWORD}
                />
            </Form.Item>

            <div className={styles.rememberWrap}>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox data-test-id={DATA_TEST_ID.LOGIN_REMEMBER}>Запомнить меня</Checkbox>
                </Form.Item>
                <Button
                    type='link'
                    size='middle'
                    disabled={isEmailValid}
                    onClick={confirmEmailHandler}
                    data-test-id={DATA_TEST_ID.LOGIN_FORGOT_BUTTON}
                >
                    Забыли пароль?
                </Button>
            </div>
            <Button
                className={styles.LoginButton}
                type='primary'
                htmlType='submit'
                size='large'
                block
                data-test-id={DATA_TEST_ID.LOGIN_SUBMIT_BUTTON}
            >
                Войти
            </Button>
        </Form>
    );
};
