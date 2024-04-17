import { useParams } from 'react-router-dom';
import { push } from 'redux-first-history';
import { RESULT_CONFIGS } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { Button, Result } from 'antd';

export const AuthorizationResultPage = () => {
    const { status } = useParams();
    const dispatch = useAppDispatch();

    const config = RESULT_CONFIGS[status as string];

    return (
        <Result
            status={config.status}
            title={config.title}
            subTitle={config.subTitle}
            extra={
                <Button
                    block={true}
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
