import styles from './authorization-result-page.module.scss';

import { Button, Result } from 'antd';
import { useParams } from 'react-router-dom';
import { resultConfigs } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { push } from 'redux-first-history';

export const AuthorizationResultPage = () => {
    const { status } = useParams();
    const dispatch = useAppDispatch();

    const config = resultConfigs[status as string];

    return (
        <Result
            className={styles.result}
            status={config.status}
            title={config.title}
            subTitle={config.subTitle}
            extra={
                <Button
                    block
                    type='primary'
                    size='large'
                    onClick={() => dispatch(push(config.href))}
                    data-test-id={config.dataTestId}
                >
                    {config.buttonText}
                </Button>
            }
        />
    );
};
