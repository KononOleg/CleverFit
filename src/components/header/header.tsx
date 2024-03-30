import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, SettingOutlined } from '@ant-design/icons';
import { DATA_TEST_ID, PATH } from '@constants/index';
import { Breadcrumb, Button, Typography } from 'antd';
import cn from 'classnames';

import styles from './header.module.scss';

export const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isMainPage = pathname === PATH.MAIN;
    const isFeedbacksPage = pathname === PATH.FEEDBACKS;
    const isCalendarPage = pathname === PATH.CALENDAR;
    const isProfilePage = pathname === PATH.PROFILE;
    const isSettingsPage = pathname === PATH.SETTINGS;
    const isTrainingPage = pathname === PATH.TRAINING;

    const isShowBreadcrumb = !isProfilePage && !isSettingsPage;

    const prevPageHandler = () => navigate(-1);

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

            {(isCalendarPage || isTrainingPage) && (
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
            {isSettingsPage && (
                <Button
                    data-test-id={DATA_TEST_ID.SETTINGS_BACK}
                    type='text'
                    className={styles.back}
                    onClick={prevPageHandler}
                >
                    <ArrowLeftOutlined />
                    <Typography.Title level={4}>Настройки</Typography.Title>
                </Button>
            )}
        </header>
    );
};

Header.Setting = () => (
    <Button
        type='text'
        size='middle'
        icon={<SettingOutlined />}
        className={styles.buttonSettings}
        data-test-id={DATA_TEST_ID.HEADER_SETTINGS}
    >
        <Link to={PATH.SETTINGS}>Настройки</Link>
    </Button>
);
