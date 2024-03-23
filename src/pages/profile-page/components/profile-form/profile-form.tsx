import { DatePicker, Typography, Button, Form, Input } from 'antd';

import { confirmPasswordRule } from '@utils/index';
import {
    DATA_TEST_ID,
    PASSWORD_MESSAGE_ERROR,
    VALIDATION_EMAIL,
    VALIDATION_FIELD_REQUIRED,
    VALIDATION_PASSWORD,
} from '@constants/index';

import styles from './profile-form.module.scss';
import { UploadAvatar } from '../upload-avatar/upload-avatar';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { profileSelector } from '@redux/selectors';
import { User } from '../../../../types';
import { useState } from 'react';
import moment from 'moment';

const { Title } = Typography;

type FormValues = {
    imgSrc: string;
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    password: string;
    confirmPassword: boolean;
};

type Props = {
    submitHandler: (inputs: User) => void;
};

export const ProfileForm = ({ submitHandler }: Props) => {
    const { profile } = useAppSelector(profileSelector);
    const [form] = Form.useForm<FormValues>();
    const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);

    const handleFinish = (inputs: FormValues) => {
        submitHandler(inputs as unknown as User);
        setIsDisabledSubmit(true);
        form.setFieldValue('password', '');
        form.setFieldValue('confirmPassword', '');
    };

    const onFieldsChange = (values: any[]) => {
        if (values[0].name[0] === 'imgSrc' && values[0].value?.file.error)
            setIsDisabledSubmit(true);
        else setIsDisabledSubmit(false);
    };

    return (
        <Form
            initialValues={
                { ...profile, birthday: profile?.birthday && moment(profile.birthday) } as User
            }
            className={styles.ProfileForm}
            form={form}
            onFinish={handleFinish}
            onFieldsChange={onFieldsChange}
        >
            <Title level={5}>Личная информация</Title>
            <div className={styles.Personal}>
                <UploadAvatar imgSrc={profile?.imgSrc as string} />
                <div className={styles.PersonalInputs}>
                    <Form.Item name='firstName'>
                        <Input
                            placeholder='Имя'
                            size='large'
                            data-test-id={DATA_TEST_ID.PROFILE_NAME}
                        />
                    </Form.Item>
                    <Form.Item name='lastName'>
                        <Input
                            size='large'
                            placeholder='Фамилия'
                            data-test-id={DATA_TEST_ID.PROFILE_SURNAME}
                        />
                    </Form.Item>
                    <Form.Item name='birthday'>
                        <DatePicker
                            format='DD.MM.YYYY'
                            className={styles.Datepicker}
                            placeholder='Дата рождения'
                            size='large'
                            data-test-id={DATA_TEST_ID.PROFILE_BIRTHDAY}
                        />
                    </Form.Item>
                </div>
            </div>

            <Title level={5}>Приватность и авторизация</Title>

            <Form.Item name='email' rules={[VALIDATION_FIELD_REQUIRED, VALIDATION_EMAIL]}>
                <Input
                    addonBefore='e-mail:'
                    size='large'
                    data-test-id={DATA_TEST_ID.PROFILE_EMAIL}
                />
            </Form.Item>
            <Form.Item name='password' rules={[VALIDATION_PASSWORD]} help={PASSWORD_MESSAGE_ERROR}>
                <Input.Password
                    size='large'
                    placeholder='Пароль'
                    data-test-id={DATA_TEST_ID.PROFILE_PASSWORD}
                />
            </Form.Item>
            <Form.Item
                name='confirmPassword'
                dependencies={['password']}
                rules={[confirmPasswordRule('password')]}
            >
                <Input.Password
                    size='large'
                    placeholder='Повторите пароль'
                    data-test-id={DATA_TEST_ID.PROFILE_REPEAT_PASSWORD}
                />
            </Form.Item>
            <Button
                className={styles.ProfileButton}
                disabled={isDisabledSubmit}
                type='primary'
                htmlType='submit'
                size='large'
                data-test-id={DATA_TEST_ID.PROFILE_SUBMIT}
            >
                Сохранить изменения
            </Button>
        </Form>
    );
};
