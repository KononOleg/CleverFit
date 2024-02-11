import {
    CalendarOutlined,
    HeartFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProfileOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import cn from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ExitPNG from '../../assets/icons/exit.png';
import styles from './sider.module.scss';

const { Sider: SiderAntd } = Layout;

export const Sider: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <SiderAntd
            trigger={null}
            theme='light'
            collapsed={collapsed}
            className={cn(styles.menu, {
                [styles.menuHide]: collapsed,
            })}
            width={208}
            collapsedWidth={65}
        >
            <div
                className={cn(styles.menuWrapper, {
                    [styles.menuWrapperCollapsed]: !collapsed,
                })}
            >
                <div>
                    <Link to='/' className={styles.logoWrapper}>
                        <div className={!collapsed ? styles.logo : styles.logoSmall} />
                    </Link>
                    <Menu
                        mode='inline'
                        selectable={false}
                        inlineIndent={0}
                        className={styles.menuWrapperItem}
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
                            className={cn(styles.exit, {
                                [styles.exitImg]: collapsed,
                                [styles.exitImgHide]: !collapsed,
                            })}
                            src={ExitPNG}
                            alt='exit'
                        />
                        <span
                            className={cn(styles.exit, {
                                [styles.open]: !collapsed,
                                [styles.hide]: collapsed,
                            })}
                        >
                            Выход
                        </span>
                    </Link>
                </div>
            </div>
        </SiderAntd>
    );
};
