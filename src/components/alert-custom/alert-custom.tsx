import { DATA_TEST_ID } from '@constants/index';
import { Alert } from 'antd';

import styles from './alert-custom.module.scss';

type Props = {
    description: string;
    dataTestId?: string;
};

export const AlertCustom = ({ description, dataTestId }: Props) => (
    <div className={styles.AlertWrapper}>
        <Alert
            message={description}
            type='success'
            className={styles.Alert}
            data-test-id={dataTestId || DATA_TEST_ID.ALERT}
            closable={true}
            showIcon={true}
        />
    </div>
);
