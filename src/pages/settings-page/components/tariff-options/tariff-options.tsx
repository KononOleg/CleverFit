import { Form, Switch, Tooltip } from 'antd';
import cn from 'classnames';

import styles from './tariff-options.module.scss';
import { InfoCircleOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';

const Options = [
    {
        title: 'Открыт для совместных тренировок',
        tooltip: 'включеная функция позволит участвовать в совместных тренировках',
        name: 'trainings',
        dataTestId: DATA_TEST_ID.TARIFF_TRAININGS,
        dataTestIdIcon: DATA_TEST_ID.TARIFF_TRAININGS_ICON,
    },
    {
        title: 'Уведомления',
        tooltip: 'включеная функция позволит получать уведомления об активностях',
        name: 'notifications',
        dataTestId: DATA_TEST_ID.TARIFF_NOTIFICATIONS,
        dataTestIdIcon: DATA_TEST_ID.TARIFF_NOTIFICATIONS_ICON,
    },
    {
        title: 'Тёмная тема',
        tooltip: 'темная тема доступна для PRO tarif',
        dataTestId: DATA_TEST_ID.TARIFF_THEME,
        dataTestIdIcon: DATA_TEST_ID.TARIFF_THEME_ICON,
        forPro: true,
    },
];
export const TariffOptions = () => {
    const isProUser = false;

    return (
        <Form className={styles.Options}>
            {Options.map(({ title, tooltip, name, dataTestId, dataTestIdIcon, forPro }) => {
                const isShowPro = !isProUser && forPro;

                return (
                    <div className={styles.Option} key={title}>
                        <div
                            className={cn(styles.Title, {
                                [styles.Disabled]: isShowPro,
                            })}
                        >
                            <span>{title}</span>
                            <Tooltip title={tooltip}>
                                <InfoCircleOutlined
                                    data-test-id={dataTestIdIcon}
                                    className={styles.Icon}
                                />
                            </Tooltip>
                        </div>
                        <Form.Item name={name} key={title}>
                            <Switch disabled={isShowPro} data-test-id={dataTestId} />
                        </Form.Item>
                    </div>
                );
            })}
        </Form>
    );
};
