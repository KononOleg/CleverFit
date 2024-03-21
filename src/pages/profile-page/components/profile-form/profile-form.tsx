import { DatePicker, Typography, Button, Form, Input } from 'antd';

import { confirmPasswordRule } from '@utils/index';
import {
    PASSWORD_MESSAGE_ERROR,
    VALIDATION_EMAIL,
    VALIDATION_FIELD_REQUIRED,
    VALIDATION_PASSWORD,
} from '@constants/index';

import styles from './profile-form.module.scss';
import { UploadAvatar } from '../upload-avatar/upload-avatar';

const { Title } = Typography;

type FormValues = {
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    password: string;
    confirmPassword: boolean;
};

export const ProfileForm = () => {
    const [form] = Form.useForm<FormValues>();

    const handleFinish = (inputs: FormValues) => console.log(inputs);
    return (
        <Form className={styles.ProfileForm} form={form} onFinish={handleFinish}>
            <Title level={5}>Личная информация</Title>
            <div className={styles.Personal}>
                <UploadAvatar />
                <div className={styles.PersonalInputs}>
                    <Form.Item name='firstName'>
                        <Input placeholder='Имя' size='large' />
                    </Form.Item>
                    <Form.Item name='lastName'>
                        <Input size='large' placeholder='Фамилия' />
                    </Form.Item>
                    <Form.Item name='birthday'>
                        <DatePicker
                            format='DD.MM.YYYY'
                            className={styles.Datepicker}
                            placeholder='Дата рождения'
                            size='large'
                        />
                    </Form.Item>
                </div>
            </div>

            <Title level={5}>Приватность и авторизация</Title>

            <Form.Item name='email' rules={[VALIDATION_FIELD_REQUIRED, VALIDATION_EMAIL]}>
                <Input addonBefore='e-mail:' size='large' />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[VALIDATION_FIELD_REQUIRED, VALIDATION_PASSWORD]}
                help={PASSWORD_MESSAGE_ERROR}
            >
                <Input.Password size='large' placeholder='Пароль' />
            </Form.Item>
            <Form.Item
                name='confirmPassword'
                dependencies={['password']}
                rules={[VALIDATION_FIELD_REQUIRED, confirmPasswordRule('password')]}
            >
                <Input.Password size='large' placeholder='Повторите пароль' />
            </Form.Item>
            <Button
                className={styles.LoginButton}
                disabled
                type='primary'
                htmlType='submit'
                size='large'
            >
                Сохранить изменения
            </Button>
        </Form>
    );
};
