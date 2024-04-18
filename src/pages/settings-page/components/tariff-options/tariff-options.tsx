import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { AlertCustom } from '@components/alert-custom';
import { TARIFF_OPTIONS } from '@constants/tariff-options';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appSelector, profileSelector } from '@redux/selectors';
import { useUpdateUserMutation } from '@redux/services/profile-service';
import { Form, FormProps, Switch, Tooltip } from 'antd';
import cn from 'classnames';

import styles from './tariff-options.module.scss';

import { User } from '@/types/index';

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

        updateUser({ ...profile, [name]: value } as User);
    };

    return (
        <React.Fragment>
            <Form
                className={styles.options}
                initialValues={profile as User}
                onFieldsChange={onFieldsChange}
            >
                {TARIFF_OPTIONS.map(
                    ({ title, tooltip, name, dataTestId, dataTestIdIcon, forPro }) => {
                        const isShowPro = !isProUser && forPro;

                        return (
                            <div className={styles.option} key={title}>
                                <div
                                    className={cn(styles.title, {
                                        [styles.disabled]: isShowPro,
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
                    },
                )}
            </Form>
            {isSuccess && <AlertCustom description='Данные профиля успешно обновлены' />}
        </React.Fragment>
    );
};
