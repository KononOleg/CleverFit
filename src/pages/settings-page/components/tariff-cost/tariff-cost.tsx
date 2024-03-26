import { DATA_TEST_ID } from '@constants/index';
import { Form, Radio, Typography } from 'antd';

import { Tariff } from '../../../../types';

import styles from './tariff-cost.module.scss';

type Props = {
    tariffs: Tariff[];
    onFieldsChangeHandler: () => void;
    onFinishHandler: ({ days }: { days: number }) => void;
};

export const TariffCost = ({ tariffs, onFieldsChangeHandler, onFinishHandler }: Props) => {
    const onFieldsChange = () => onFieldsChangeHandler();

    return (
        <Form
            id='form'
            className={styles.TariffCost}
            onFieldsChange={onFieldsChange}
            onFinish={onFinishHandler}
            data-test-id={DATA_TEST_ID.TARIFF_COST}
        >
            <div className={styles.Title}>Стоимость тарифа</div>
            <Form.Item name='days'>
                <Radio.Group className={styles.Costs}>
                    {tariffs[0]?.periods.map(({ text, cost, days }) => (
                        <Radio value={days} key={text} data-test-id={`tariff-${cost}`}>
                            <div className={styles.Cost}>
                                {text}
                                <Typography.Title level={5}>
                                    {String(cost).replace('.', ',')} $
                                </Typography.Title>
                            </div>
                        </Radio>
                    ))}
                </Radio.Group>
            </Form.Item>
        </Form>
    );
};
