import { Button, Drawer } from 'antd';

import styles from './drawer-tariff.module.scss';
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { TariffCost } from '../tariff-cost';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { appSelector, profileSelector } from '@redux/selectors';
import { useState } from 'react';
import { useBuyTariffMutation } from '@redux/services/profile-service';
import { TariffSuccessModal } from '../tariff-modal';

const Traits = [
    {
        title: 'Статистика за месяц',
        free: true,
    },
    {
        title: 'Статистика за всё время',
        free: false,
    },
    {
        title: 'Совместные тренировки',
        free: true,
    },
    {
        title: 'Участие в марафонах',
        free: false,
    },
    {
        title: 'Приложение iOS',
        free: false,
    },
    {
        title: 'Приложение Android',
        free: false,
    },
    {
        title: 'Индивидуальный Chat GPT',
        free: false,
    },
];

type Props = {
    open: boolean;
    handleClose: () => void;
};

export const DrawerTariff = ({ open, handleClose }: Props) => {
    const { isDesktopVersion } = useAppSelector(appSelector);
    const [buyTariff, { isSuccess }] = useBuyTariffMutation();
    const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
    const { tariffs } = useAppSelector(profileSelector);
    const isProUser = false;

    const onFieldsChangeHandler = () => setIsDisabledSubmit(false);

    const onFinishHandler = ({ days }: { days: number }) => {
        buyTariff({
            tariffId: tariffs[0]._id as string,
            days,
        });
        handleClose();
    };

    return (
        <>
            <Drawer
                className={styles.DrawerTariff}
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
                            block
                        >
                            Выбрать и оплатить
                        </Button>
                    )
                }
            >
                <div className={styles.Buttons}>
                    <div className={styles.Tariff}>FREE</div>
                    <div className={styles.Tariff}>PRO</div>
                </div>
                <div className={styles.Traits}>
                    {Traits.map(({ title, free }) => (
                        <div key={title} className={styles.Trait}>
                            <div className={styles.Title}>{title}</div>
                            {free ? (
                                <CheckCircleFilled />
                            ) : (
                                <CloseCircleOutlined className={styles.CloseCircle} />
                            )}
                            <CheckCircleFilled className={styles.LastTrait} />
                        </div>
                    ))}
                </div>
                <TariffCost
                    tariffs={tariffs}
                    onFieldsChangeHandler={onFieldsChangeHandler}
                    onFinishHandler={onFinishHandler}
                />
            </Drawer>
            {isSuccess && <TariffSuccessModal />}
        </>
    );
};
