import React from 'react';

import styles from './header.module.scss';
import { Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <span className='body_regular'>Главная</span>
            <div className={styles.container}>
                <h1>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </h1>
                <Button type='text' icon={<SettingOutlined />}>
                    Настройки
                </Button>
            </div>
        </header>
    );
};
