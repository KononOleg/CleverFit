import { DATA_TEST_ID } from '@constants/index';
import { Alert } from 'antd';

import styles from './alert-custom.module.scss';

type Props = {
    description: string;
};

export const AlertCustom = ({ description }: Props) => {
    return (
        <div className={styles.AlertWrapper}>
            <Alert
                message={description}
                type='success'
                className={styles.Alert}
                data-test-id={DATA_TEST_ID.ALERT}
                closable
                showIcon
            />
        </div>
    );
};
