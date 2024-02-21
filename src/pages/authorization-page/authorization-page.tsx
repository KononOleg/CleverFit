import React from 'react';

import styles from './authorization-page.module.scss';
import { Button, Tabs, TabsProps } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { LoginForm } from './components/login-form';
import { RegistrationForm } from './components/registration-form';
import { useNavigate } from 'react-router-dom';
import { AUTH_TAB, PATH } from '@constants/index';

const tabsItems: TabsProps['items'] = [
    { label: 'Вход', key: AUTH_TAB.Login, children: <LoginForm /> },
    { label: 'Регистрация', key: AUTH_TAB.Register, children: <RegistrationForm /> },
];

type Props = {
    tab: string;
};

export const AuthorizationPage: React.FC<Props> = ({ tab }) => {
    const navigate = useNavigate();

    const onChange = (key: string) =>
        navigate(key === AUTH_TAB.Login ? PATH.Auth : PATH.Register, { replace: true });

    return (
        <>
            <div className={styles.logo}></div>
            <Tabs
                className={styles.tabs}
                items={tabsItems}
                activeKey={tab}
                centered
                onChange={onChange}
            />

            <Button
                className={styles.googleButton}
                icon={<GooglePlusOutlined />}
                block
                htmlType='button'
                size='large'
            >
                Войти через Google
            </Button>
        </>
    );
};
