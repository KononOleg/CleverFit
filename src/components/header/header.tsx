import { SettingOutlined } from '@ant-design/icons';
import { PATH } from '@constants/index';
import { Breadcrumb, Button, Typography } from 'antd';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import styles from './header.module.scss';

export const Header = () => {
    const { pathname } = useLocation();

    const isMainPage = pathname === PATH.MAIN;
    const isFeedbacksPage = pathname === PATH.FEEDBACKS;
    const isCalendarPage = pathname === PATH.CALENDAR;
    const isProfilePage = pathname === PATH.PROFILE;

    const isShowBreadcrumb = !isProfilePage;

    return (
        <header className={styles.header}>
            {isShowBreadcrumb && (
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={PATH.MAIN}>Главная</Link>
                    </Breadcrumb.Item>
                    {isFeedbacksPage && (
                        <Breadcrumb.Item>
                            <Link to={PATH.FEEDBACKS}>Отзывы пользователей</Link>
                        </Breadcrumb.Item>
                    )}
                    {isCalendarPage && (
                        <Breadcrumb.Item>
                            <Link to={PATH.CALENDAR}>Календарь</Link>
                        </Breadcrumb.Item>
                    )}
                </Breadcrumb>
            )}

            {isMainPage && (
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться
                        своей мечты!
                    </h1>
                    <Header.Setting />
                </div>
            )}

            {isCalendarPage && (
                <div className={cn(styles.container, styles.containerRight)}>
                    <Header.Setting />
                </div>
            )}
            {isProfilePage && (
                <div className={styles.profile}>
                    <Typography.Title level={4}>Профиль</Typography.Title>
                    <Header.Setting />
                </div>
            )}
        </header>
    );
};

Header.Setting = () => (
    <Button type='text' size='middle' icon={<SettingOutlined />}>
        Настройки
    </Button>
);
