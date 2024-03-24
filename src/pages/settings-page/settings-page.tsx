import { Button, Card } from 'antd';
import styles from './settings-page.module.scss';
import { TariffCards } from './components/tariff-cards';
import { TariffOptions } from './components/tariff-options';
import { DrawerTariff } from './components/comparing-drawer';
import { useState } from 'react';
import { ModalFeedback } from '@pages/feedbacks-page/components/modal-feedback';
import { Link } from 'react-router-dom';
import { PATH } from '@constants/index';
import { useGetTrainingListQuery } from '@redux/services/training-service';

export const SettingsPage = () => {
    const { refetch } = useGetTrainingListQuery();
    const [openTariffSider, setOpenTariffSider] = useState(false);
    const [openNewFeedback, setOpenNewFeedback] = useState(false);

    const closeTariffSiderHandler = () => setOpenTariffSider(false);
    const openTariffSiderHandler = () => setOpenTariffSider(true);
    const openNewFeedbackHandler = () => setOpenNewFeedback(true);
    const handleRefetch = () => refetch();

    return (
        <>
            <Card className={styles.SettingsPage}>
                <TariffCards handleOpen={openTariffSiderHandler} />
                <TariffOptions />
                <div className={styles.Buttons}>
                    <Button type='primary' onClick={openNewFeedbackHandler}>
                        Написать отзыв
                    </Button>
                    <Button type='link'>
                        <Link to={PATH.FEEDBACKS}>Смотреть все отзывы</Link>
                    </Button>
                </div>
            </Card>
            <ModalFeedback
                open={openNewFeedback}
                setOpen={setOpenNewFeedback}
                handleRefetch={handleRefetch}
            />
            <DrawerTariff open={openTariffSider} handleClose={closeTariffSiderHandler} />
        </>
    );
};
