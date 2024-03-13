import { SettingOutlined } from '@ant-design/icons';
import { PATH } from '@constants/index';
import { Breadcrumb, Button } from 'antd';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import styles from './header.module.scss';

export const Header = () => {
    const { pathname } = useLocation();

    const isMainPage = pathname === PATH.MAIN;
    const isFeedbacksPage = pathname === PATH.FEEDBACKS;
    const isCalendarPage = pathname === PATH.CALENDAR;

    return (
        <header className={styles.header}>
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
            {isMainPage && (
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться
                        своей мечты!
                    </h1>

                    <Button type='text' size='middle' icon={<SettingOutlined />}>
                        Настройки
                    </Button>
                </div>
            )}

            {isCalendarPage && (
                <div className={cn(styles.container, styles.containerRight)}>
                    <Button type='text' size='middle' icon={<SettingOutlined />}>
                        Настройки
                    </Button>
                </div>
            )}
        </header>
    );
};
