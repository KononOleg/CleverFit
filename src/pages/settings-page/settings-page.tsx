import { Card } from 'antd';
import styles from './settings-page.module.scss';
import { TariffCards } from './components/tariff-cards';

export const SettingsPage = () => {
    return (
        <Card className={styles.SettingsPage}>
            <TariffCards />
        </Card>
    );
};
