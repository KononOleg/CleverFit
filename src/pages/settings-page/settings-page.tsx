import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ModalFeedback } from '@pages/feedbacks-page/components/modal-feedback';
import { profileSelector } from '@redux/selectors';
import { useGetTariffListQuery } from '@redux/services/profile-service';
import { useGetTrainingListQuery } from '@redux/services/training-service';
import { Button, Card } from 'antd';
import moment from 'moment';

import { DrawerTariff } from './components/drawer-tariff';
import { TariffCards } from './components/tariff-cards';
import { TariffOptions } from './components/tariff-options';

import styles from './settings-page.module.scss';

export const SettingsPage = () => {
    const { profile } = useAppSelector(profileSelector);
    const { refetch } = useGetTrainingListQuery();

    useGetTariffListQuery();
    const [openTariffSider, setOpenTariffSider] = useState(false);
    const [openNewFeedback, setOpenNewFeedback] = useState(false);

    const isProUser = profile?.tariff as unknown as boolean;
    const date = moment(profile?.tariff?.expired);
    const month = date.month() + 1;
    const day = date.date();

    const closeTariffSiderHandler = () => setOpenTariffSider(false);
    const openTariffSiderHandler = () => setOpenTariffSider(true);
    const openNewFeedbackHandler = () => setOpenNewFeedback(true);
    const handleRefetch = () => refetch();

    return (
        <React.Fragment>
            <Card className={styles.SettingsPage}>
                <TariffCards
                    handleOpen={openTariffSiderHandler}
                    isProUser={isProUser}
                    month={month}
                    day={day}
                />
                <TariffOptions isProUser={isProUser} />
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
            <DrawerTariff
                open={openTariffSider}
                handleClose={closeTariffSiderHandler}
                isProUser={isProUser}
                month={month}
                day={day}
            />
        </React.Fragment>
    );
};
