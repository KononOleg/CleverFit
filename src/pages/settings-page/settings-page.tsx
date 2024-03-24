import { Card } from 'antd';
import styles from './settings-page.module.scss';
import { TariffCards } from './components/tariff-cards';
import { TariffOptions } from './components/tariff-options';
import { DrawerTariff } from './components/comparing-drawer';
import { useState } from 'react';

export const SettingsPage = () => {
    const [openTariffSider, setOpenTariffSider] = useState(false);

    const closeTariffSiderHandler = () => setOpenTariffSider(false);
    const openTariffSiderHandler = () => setOpenTariffSider(true);

    return (
        <>
            <Card className={styles.SettingsPage}>
                <TariffCards handleOpen={openTariffSiderHandler} />
                <TariffOptions />
            </Card>
            <DrawerTariff open={openTariffSider} handleClose={closeTariffSiderHandler} />
        </>
    );
};
