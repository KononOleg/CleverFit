import React, { useState } from 'react';
import { CheckCircleFilled, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { DATA_TEST_ID, TRAITS } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appSelector, profileSelector } from '@redux/selectors';
import { useBuyTariffMutation } from '@redux/services/profile-service';
import { Button, Drawer, Typography } from 'antd';

import { TariffCost } from '../tariff-cost';
import { TariffSuccessModal } from '../tariff-modal';

import styles from './drawer-tariff.module.scss';

type Props = {
    open: boolean;
    handleClose: () => void;
    isProUser: boolean;
    month: number;
    day: number;
};

export const DrawerTariff = ({ open, handleClose, isProUser, month, day }: Props) => {
    const { isDesktopVersion } = useAppSelector(appSelector);
    const [buyTariff, { isSuccess }] = useBuyTariffMutation();
    const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
    const { tariffs } = useAppSelector(profileSelector);

    const isShowTariffCost = !isProUser && tariffs;

    const onFieldsChangeHandler = () => setIsDisabledSubmit(false);

    const onFinishHandler = ({ days }: { days: number }) => {
        buyTariff({
            // eslint-disable-next-line no-underscore-dangle
            tariffId: tariffs[0]._id as string,
            days,
        });
        handleClose();
    };

    return (
        <React.Fragment>
            <Drawer
                className={styles.drawerTariff}
                title='Сравнить тарифы'
                data-test-id={DATA_TEST_ID.TARIFF_SIDER}
                open={open}
                width={isDesktopVersion ? 408 : 360}
                onClose={handleClose}
                destroyOnClose={true}
                footer={
                    !isProUser && (
                        <Button
                            form='form'
                            type='primary'
                            htmlType='submit'
                            data-test-id={DATA_TEST_ID.TARIFF_SUBMIT}
                            disabled={isDisabledSubmit}
                            block={true}
                        >
                            Выбрать и оплатить
                        </Button>
                    )
                }
            >
                {isProUser && (
                    <div className={styles.tariffPro}>
                        <Typography.Title level={5}>
                            Ваш PRO tarif активен до {String(day).padStart(2, '0')}.
                            {String(month).padStart(2, '0')}
                        </Typography.Title>
                    </div>
                )}
                <div className={styles.buttons}>
                    <div className={styles.tariff}>FREE</div>
                    <div className={styles.tariff}>
                        PRO {isProUser && <CheckCircleOutlined className={styles.checkCircle} />}
                    </div>
                </div>
                <div className={styles.traits}>
                    {TRAITS.map(({ title, free }) => (
                        <div key={title} className={styles.trait}>
                            <div className={styles.title}>{title}</div>
                            {free ? (
                                <CheckCircleFilled />
                            ) : (
                                <CloseCircleOutlined className={styles.closeCircle} />
                            )}
                            <CheckCircleFilled className={styles.lastTrait} />
                        </div>
                    ))}
                </div>

                {isShowTariffCost && (
                    <TariffCost
                        tariffs={tariffs}
                        onFieldsChangeHandler={onFieldsChangeHandler}
                        onFinishHandler={onFinishHandler}
                    />
                )}
            </Drawer>
            {isSuccess && <TariffSuccessModal />}
        </React.Fragment>
    );
};
