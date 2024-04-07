import { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { inviteSelector } from '@redux/selectors';
import { Button, List, Typography } from 'antd';

import { InviteCard } from '../invite-card';

import styles from './invite-list.module.scss';

export const InviteList = () => {
    const [collapsed, setCollapsed] = useState(true);
    const { inviteList } = useAppSelector(inviteSelector);

    const inviteListToRender = collapsed ? [inviteList[0]] : inviteList;

    const collapseHandler = () => setCollapsed(!collapsed);

    if (!inviteList.length) return null;

    return (
        <div className={styles.InviteList}>
            <Typography.Text type='secondary'>
                Новое сообщение ({inviteList.length})
            </Typography.Text>
            <List
                dataSource={inviteListToRender}
                renderItem={(invite) => <InviteCard invite={invite} />}
            />
            {inviteList.length > 1 && (
                <Button
                    className={styles.CollapseButton}
                    type='link'
                    ghost={true}
                    icon={collapsed ? <DownOutlined /> : <UpOutlined />}
                    onClick={collapseHandler}
                >
                    {collapsed ? 'Показать все сообщения' : 'Скрыть все сообщения'}
                </Button>
            )}
        </div>
    );
};
