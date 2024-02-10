import React from 'react';

import styles from './footer.module.scss';
import { Button } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <Button type='link' size='large'>
                Смотреть отзывы
            </Button>
            <div className={styles.card}>
                <div>
                    <Button type='link' size='large'>
                        Скачать на телефон
                    </Button>
                    <p>Доступно в PRO-тарифе</p>
                </div>
                <div className={styles.cards}>
                    <Button type='text' icon={<AndroidFilled />}>
                        Android OS
                    </Button>
                    <Button type='text' icon={<AppleFilled />}>
                        Apple iOS
                    </Button>
                </div>
            </div>
        </footer>
    );
};
