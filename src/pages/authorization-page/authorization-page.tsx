import { GooglePlusOutlined } from '@ant-design/icons';
import { API_HOST, API_PATH, AUTH_TAB, PATH } from '@constants/index';
import { Button, Tabs, TabsProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './components/login-form';
import { RegistrationForm } from './components/registration-form';

import styles from './authorization-page.module.scss';

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

    const handleGoogleAuth = () => (window.location.href = `${API_HOST}${API_PATH.GOOGLE}`);

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
                onClick={handleGoogleAuth}
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
