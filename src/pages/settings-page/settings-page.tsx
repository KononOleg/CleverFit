import { Card } from 'antd';
import styles from './settings-page.module.scss';
import { TariffCards } from './components/tariff-cards';
import { TariffOptions } from './components/tariff-options';

export const SettingsPage = () => {
    return (
        <Card className={styles.SettingsPage}>
            <TariffCards />
            <TariffOptions />
        </Card>
    );
};
