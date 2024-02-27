import { GooglePlusOutlined } from '@ant-design/icons';
import { AUTH_TAB, PATH } from '@constants/index';
import { Button, Tabs, TabsProps } from 'antd';
import { useNavigate } from 'react-router-dom';

import styles from './authorization-page.module.scss';
import { LoginForm } from './components/login-form';
import { RegistrationForm } from './components/registration-form';

const tabsItems: TabsProps['items'] = [
    { label: 'Вход', key: AUTH_TAB.LOGIN, children: <LoginForm /> },
    { label: 'Регистрация', key: AUTH_TAB.REGISTER, children: <RegistrationForm /> },
];

type Props = {
    tab: string;
};

export const AuthorizationPage = ({ tab }: Props) => {
    const navigate = useNavigate();

    const onChange = (key: string) =>
        navigate(key === AUTH_TAB.LOGIN ? PATH.AUTH : PATH.REGISTER, { replace: true });

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
