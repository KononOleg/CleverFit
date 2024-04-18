import { DATA_TEST_ID } from '@constants/index';
import { Form, Radio, Typography } from 'antd';

import styles from './tariff-cost.module.scss';

import { Tariff } from '@/types/index';

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
            className={styles.tariffCost}
            onFieldsChange={onFieldsChange}
            onFinish={onFinishHandler}
            data-test-id={DATA_TEST_ID.TARIFF_COST}
        >
            <div className={styles.title}>Стоимость тарифа</div>
            <Form.Item name='days'>
                <Radio.Group className={styles.costs}>
                    {tariffs[0]?.periods.map(({ text, cost, days }) => (
                        <Radio value={days} key={text} data-test-id={`tariff-${cost}`}>
                            <div className={styles.cost}>
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
