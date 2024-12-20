import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    CalendarOutlined,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import { JointNotification } from '@components/joint-notification';
import { DATA_TEST_ID, PATH } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { signOut } from '@redux/reducers/auth-slice';
import { appSelector } from '@redux/selectors';
import { Button, Layout, Menu } from 'antd';
import cn from 'classnames';

import ExitPNG from '../../assets/icons/exit.png';

import styles from './sider.module.scss';

const { Sider: SiderAntd } = Layout;
const items = [
    {
        key: '1',
        icon: <CalendarOutlined />,
        label: <Link to={PATH.CALENDAR}>Календарь</Link>,
    },
    {
        key: '2',
        icon: <JointNotification />,
        label: <Link to={PATH.TRAINING}>Тренировки</Link>,
    },
    {
        key: '3',
        icon: <TrophyFilled />,
        label: <Link to=''>Достижения</Link>,
    },
    {
        key: '4',
        icon: <IdcardOutlined />,
        label: <Link to={PATH.PROFILE}>Профиль</Link>,
    },
];

export const Sider = () => {
    const { isDesktopVersion } = useAppSelector(appSelector);
    const [collapsed, setCollapsed] = useState(true);
    const dispatch = useAppDispatch();

    const signOutHandler = () => dispatch(signOut());
    const setCollapsedHandler = () => setCollapsed(!collapsed);

    return (
        <SiderAntd
            trigger={null}
            theme='light'
            collapsed={collapsed}
            className={styles.menu}
            width={isDesktopVersion ? '208' : '106'}
            collapsedWidth={isDesktopVersion ? '64' : '1'}
        >
            <div
                className={cn(styles.menuWrapper, {
                    [styles.menuWrapperCollapsed]: !collapsed,
                })}
            >
                <div>
                    <Link to='/' className={styles.logoWrapper}>
                        <div className={collapsed ? styles.logoSmall : styles.logo} />
                    </Link>
                    <Menu
                        mode='inline'
                        selectable={false}
                        inlineIndent={0}
                        className={styles.menuWrapperItem}
                        items={items}
                    />

                    <div className={styles.btnClose}>
                        <Button
                            type='link'
                            data-test-id={
                                isDesktopVersion
                                    ? DATA_TEST_ID.SIDER_SWITCH
                                    : DATA_TEST_ID.SIDER_SWITCH_MOBILE
                            }
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            className={styles.siderBtn}
                            onClick={setCollapsedHandler}
                        />
                    </div>
                </div>
                <div className={styles.exitWrapper}>
                    <Link className={styles.exit} to={PATH.AUTH} onClick={signOutHandler}>
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
