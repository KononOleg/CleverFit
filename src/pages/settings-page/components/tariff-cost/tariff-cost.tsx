import { Form, Radio, Typography } from 'antd';

import styles from './tariff-cost.module.scss';
import { DATA_TEST_ID } from '@constants/index';
import { Tariff } from '../../../../types';

type Props = {
    tariffs: Tariff[];
    onFieldsChangeHandler: () => void;
};

export const TariffCost = ({ tariffs, onFieldsChangeHandler }: Props) => {
    const onFieldsChange = () => onFieldsChangeHandler();

    return (
        <Form
            className={styles.TariffCost}
            onFieldsChange={onFieldsChange}
            data-test-id={DATA_TEST_ID.TARIFF_COST}
        >
            <div className={styles.Title}>Стоимость тарифа</div>
            <Form.Item name='cost'>
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
