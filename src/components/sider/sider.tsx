import React, { useState } from 'react';

import ExitPNG from '../../assets/icons/exit.png';
import styles from './sider.module.scss';

import { Button, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
    CalendarOutlined,
    HeartFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProfileOutlined,
    TrophyFilled,
} from '@ant-design/icons';

const { Sider: SiderAntd } = Layout;

export const Sider: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <SiderAntd
            trigger={null}
            theme='light'
            collapsed={collapsed}
            className={!collapsed ? styles.menu : `${styles.menu} ${styles.menuHide}`}
        >
            <div className={styles.menuWrapper}>
                <div className={styles.menuWrapperItem}>
                    <Link to='/' className={styles.logoWrapper}>
                        <div className={!collapsed ? styles.logo : styles.logoSmall} />
                    </Link>
                    <Menu
                        mode='inline'
                        selectable={false}
                        items={[
                            {
                                key: '1',
                                icon: <CalendarOutlined />,
                                label: <Link to=''>Календарь</Link>,
                            },
                            {
                                key: '2',
                                icon: <HeartFilled />,
                                label: <Link to=''>Тренировки</Link>,
                            },
                            {
                                key: '3',
                                icon: <TrophyFilled />,
                                label: <Link to=''>Достижения</Link>,
                            },
                            {
                                key: '4',
                                icon: <ProfileOutlined />,
                                label: <Link to=''>Профиль</Link>,
                            },
                        ]}
                    />

                    <div className={styles.btnClose} onClick={() => setCollapsed(!collapsed)}>
                        <Button
                            type='link'
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            className={styles.siderBtn}
                        />
                    </div>
                </div>
                <div className={styles.exitWrapper}>
                    <Link className={styles.exit} to='/'>
                        <img
                            className={collapsed ? styles.exitImg : styles.exitImgHide}
                            src={ExitPNG}
                            alt='exit'
                        />
                        <span className={!collapsed ? styles.open : styles.hide}>Выход</span>
                    </Link>
                </div>
            </div>
        </SiderAntd>
    );
};
