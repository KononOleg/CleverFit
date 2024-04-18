import { HeartFilled } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { inviteSelector } from '@redux/selectors';
import { Badge } from 'antd';

import styles from './joint-notification.module.scss';

export const JointNotification = () => {
    const { inviteList } = useAppSelector(inviteSelector);

    return (
        <Badge
            data-test-id={DATA_TEST_ID.NOTIFICATION_ABOUT_JOINT_TRAINING}
            count={inviteList.length}
            size='small'
            className={`anticon anticon-calendar ant-menu-item-icon ${styles.jointNotification}`}
        >
            <HeartFilled />
        </Badge>
    );
};
