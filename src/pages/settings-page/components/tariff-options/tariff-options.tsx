import { Form, FormProps, Switch, Tooltip } from 'antd';
import cn from 'classnames';

import styles from './tariff-options.module.scss';
import { InfoCircleOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appSelector, profileSelector } from '@redux/selectors';
import { useUpdateUserMutation } from '@redux/services/profile-service';
import { AlertCustom } from '@components/alert-custom';

const Options = [
    {
        title: 'Открыт для совместных тренировок',
        tooltip: 'включеная функция позволит участвовать в совместных тренировках',
        name: 'readyForJointTraining',
        dataTestId: DATA_TEST_ID.TARIFF_TRAININGS,
        dataTestIdIcon: DATA_TEST_ID.TARIFF_TRAININGS_ICON,
    },
    {
        title: 'Уведомления',
        tooltip: 'включеная функция позволит получать уведомления об активностях',
        name: 'sendNotification',
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

type Props = {
    isProUser: boolean;
};
export const TariffOptions = ({ isProUser }: Props) => {
    const { profile } = useAppSelector(profileSelector);
    const { isDesktopVersion } = useAppSelector(appSelector);
    const [updateUser, { isSuccess }] = useUpdateUserMutation();

    const switchSize = isDesktopVersion ? 'default' : 'small';
    const tooltipPlacement = isDesktopVersion ? 'bottom' : 'top';

    const onFieldsChange: FormProps['onFieldsChange'] = (fields) => {
        const { name: names, value } = fields[0];
        const name = names[0];

        updateUser({ ...profile, [name]: value } as any);
    };

    return (
        <>
            <Form
                className={styles.Options}
                initialValues={profile as any}
                onFieldsChange={onFieldsChange}
            >
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
                                <Tooltip title={tooltip} placement={tooltipPlacement}>
                                    <InfoCircleOutlined
                                        data-test-id={dataTestIdIcon}
                                        className={styles.Icon}
                                    />
                                </Tooltip>
                            </div>
                            <Form.Item name={name} key={title} valuePropName='checked'>
                                <Switch
                                    disabled={isShowPro}
                                    data-test-id={dataTestId}
                                    size={switchSize}
                                />
                            </Form.Item>
                        </div>
                    );
                })}
            </Form>
            {isSuccess && <AlertCustom description='Данные профиля успешно обновлены' />}
        </>
    );
};
