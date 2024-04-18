import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { push } from 'redux-first-history';
import {
    CalendarOutlined,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import { JointNotification } from '@components/joint-notification';
import { ModalError } from '@components/modal-error';
import { DATA_TEST_ID } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { signOut } from '@redux/reducers/auth-slice';
import { setTraining } from '@redux/reducers/training-slice';
import { appSelector } from '@redux/selectors';
import { useLazyGetTrainingQuery } from '@redux/services/training-service';
import { PATH } from '@routes/path';
import { Button, Layout, Menu } from 'antd';
import cn from 'classnames';

import ExitPNG from '../../assets/icons/exit.png';

import styles from './sider.module.scss';

const { Sider: SiderAntd } = Layout;
const items = [
    {
        key: PATH.CALENDAR,
        icon: <CalendarOutlined />,
        label: <span>Календарь</span>,
    },
    {
        key: PATH.TRAINING,
        icon: <JointNotification />,
        label: <span>Тренировки</span>,
    },
    {
        key: PATH.ACHIEVEMENTS,
        icon: <TrophyFilled />,
        label: <span data-test-id={DATA_TEST_ID.SIDEBAR_ACHIEVEMENTS}>Достижения</span>,
    },
    {
        key: PATH.PROFILE,
        icon: <IdcardOutlined />,
        label: <span>Профиль</span>,
    },
];

export const Sider = () => {
    const dispatch = useAppDispatch();
    const { isDesktopVersion } = useAppSelector(appSelector);
    const [collapsed, setCollapsed] = useState(true);

    const [getTraining, { isError }] = useLazyGetTrainingQuery();

    const handleItemClick = async ({ key }: { key: string }) => {
        if (key === PATH.PROFILE) dispatch(push(key));
        else {
            const { data: training } = await getTraining();

            if (training) {
                dispatch(setTraining(training));
                dispatch(push(key));
            }
        }
    };

    const signOutHandler = () => dispatch(signOut());
    const setCollapsedHandler = () => setCollapsed(!collapsed);

    return (
        <Fragment>
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
                            onClick={handleItemClick}
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
            <ModalError isError={isError} />
        </Fragment>
    );
};
