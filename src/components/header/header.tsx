import { SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './header.module.scss';

export const Header = () => (
    <header className={styles.header}>
        <span>Главная</span>
        <div className={styles.container}>
            <h1 className={styles.title}>
                Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                мечты!
            </h1>
            <Button type='text' size='middle' icon={<SettingOutlined />}>
                Настройки
            </Button>
        </div>
    </header>
);
