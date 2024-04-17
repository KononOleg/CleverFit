import { useEffect, useState } from 'react';
import {
    DATA_TEST_ID,
    VALIDATION_EMAIL,
    VALIDATION_FIELD_REQUIRED,
    VALIDATION_PASSWORD,
} from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { authSelector, prevLocationsSelector } from '@redux/selectors';
import { useCheckEmailMutation, useLoginMutation } from '@redux/services/auth-service';
import { PATH } from '@routes/path';
import { Button, Checkbox, Form, Input } from 'antd';

import { checkPrevPath } from '../../../../utils';

import styles from '../../authorization-page.module.scss';

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
            <Form.Item name='email' rules={[VALIDATION_FIELD_REQUIRED, VALIDATION_EMAIL]}>
                <Input addonBefore='e-mail:' size='large' data-test-id={DATA_TEST_ID.LOGIN_EMAIL} />
            </Form.Item>

            <Form.Item name='password' rules={[VALIDATION_FIELD_REQUIRED, VALIDATION_PASSWORD]}>
                <Input.Password
                    size='large'
                    placeholder='Пароль'
                    data-test-id={DATA_TEST_ID.LOGIN_PASSWORD}
                />
            </Form.Item>

            <div className={styles.rememberWrap}>
                <Form.Item name='remember' valuePropName='checked' noStyle={true}>
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
                block={true}
                data-test-id={DATA_TEST_ID.LOGIN_SUBMIT_BUTTON}
            >
                Войти
            </Button>
        </Form>
    );
};
