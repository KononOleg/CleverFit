import React from 'react';

import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Button } from 'antd';

import styles from './download-app.module.scss';

export const DownloadApp: React.FC = () => (
    <div className={styles.downloadApp}>
        <div className={styles.download}>
            <Button type='link' size='large'>
                Скачать на телефон
            </Button>
            <p>Доступно в PRO-тарифе</p>
        </div>
        <div className={styles.buttons}>
            <Button type='text' icon={<AndroidFilled />}>
                Android OS
            </Button>
            <Button type='text' icon={<AppleFilled />}>
                Apple iOS
            </Button>
        </div>
    </div>
);
