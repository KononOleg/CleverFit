import { SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';

import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import { PATH } from '@constants/index';

type Props = {
    isBreadcrumb?: boolean;
};

export const Header = ({ isBreadcrumb }: Props) => (
    <header className={styles.header}>
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to={PATH.MAIN}>Главная</Link>
            </Breadcrumb.Item>
            {isBreadcrumb && (
                <Breadcrumb.Item>
                    <Link to={PATH.FEEDBACKS}>Отзывы пользователей</Link>
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
        {!isBreadcrumb && (
            <div className={styles.container}>
                <h1 className={styles.title}>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </h1>
                <Button type='text' size='middle' icon={<SettingOutlined />}>
                    Настройки
                </Button>
            </div>
        )}
    </header>
);
