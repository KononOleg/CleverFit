import React, { useEffect, useState } from 'react';
import { Portal } from '@components/portal';
import { DATA_TEST_ID, LocalData } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setSelectedDate, setTrainingList } from '@redux/reducers/training-slice';
import { appSelector, trainingSelector } from '@redux/selectors';
import { useGetTrainingListQuery } from '@redux/services/training-service';
import { getOffsetTop, getSelectedCell, getTrainingByDay } from '@utils/index';
import { Calendar } from 'antd';
import moment, { Moment } from 'moment';

import { ModalRequestError } from '../../components/modal-request-error';

import { BadgeTraining } from './components/badge-training';
import { CardModal } from './components/card-modal';

import styles from './calendar-page.module.scss';

export const CalendarPage = () => {
    const dispatch = useAppDispatch();
    const { training, selectedDate } = useAppSelector(trainingSelector);
    const { isDesktopVersion } = useAppSelector(appSelector);
    const [selectedCell, setSelectedCell] = useState<Element | undefined>(undefined);
    const [offsetTop, setOffsetTop] = useState(0);
    const { data: trainingList, isError, refetch } = useGetTrainingListQuery();

    const isOpenModal = selectedDate;

    useEffect(() => {
        if (trainingList) dispatch(setTrainingList(trainingList));
    }, [dispatch, trainingList]);

    const onSelectHandler = (date: Moment) => {
        dispatch(setSelectedDate(moment(date).toISOString(true)));

        if (isDesktopVersion) {
            setSelectedCell(getSelectedCell(date));
            setOffsetTop(0);
        } else {
            setSelectedCell(undefined);
            setOffsetTop(getOffsetTop(date));
        }
    };

    const dateCellRender = (date: Moment) => {
        const trainingByDay = getTrainingByDay(date.toISOString(true), training);

        if (!isDesktopVersion)
            return trainingByDay?.length ? <div className={styles.СellMobile} /> : undefined;

        return <BadgeTraining training={getTrainingByDay(date.toISOString(true), training)} />;
    };

    return (
        <React.Fragment>
            <div className={styles.CalendarPage}>
                {isOpenModal && (
                    <Portal container={selectedCell}>
                        <CardModal offsetTop={offsetTop} />
                    </Portal>
                )}

                <Calendar
                    onSelect={onSelectHandler}
                    dateCellRender={dateCellRender}
                    locale={LocalData}
                    fullscreen={isDesktopVersion}
                />
            </div>

            <ModalRequestError
                title='При открытии данных произошла ошибка'
                type='info'
                isError={isError}
                subtitle='Попробуйте ещё раз.'
                okText='Обновить'
                onClickButton={() => refetch()}
                dataTestId={DATA_TEST_ID.MODAL_ERROR_USER_TRAINING_BUTTON}
            />
        </React.Fragment>
    );
};
