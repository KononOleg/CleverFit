import { Calendar } from 'antd';
import { useGetTrainingListQuery } from '@redux/services/training-service';
import { CardModal } from './components/card-modal';

import styles from './calendar-page.module.scss';
import { useEffect, useState } from 'react';
import { Portal } from '@components/portal';
import moment, { Moment } from 'moment';
import { BadgeTraining } from './components/badge-training';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { setSelectedDate, setTrainingList } from '@redux/reducers/training-slice';
import { getSelectedCell, getTrainingByDay } from '@utils/index';
import { ModalRequestError } from './components/modal-request-error';

export const CalendarPage = () => {
    const dispatch = useAppDispatch();
    const { training, selectedDate } = useAppSelector(trainingSelector);
    const [selectedCell, setSelectedCell] = useState<Element | undefined>(undefined);

    const { data: trainingList, isError, refetch } = useGetTrainingListQuery();

    const isOpenModal = selectedCell && selectedDate;

    useEffect(() => {
        if (trainingList) dispatch(setTrainingList({ trainingList }));
    }, [dispatch, trainingList]);

    const onSelectHandler = (date: Moment) => {
        dispatch(setSelectedDate({ selectedDate: moment(date).toISOString(true) }));
        setSelectedCell(getSelectedCell(date));
    };

    const dateCellRender = (date: Moment) => (
        <BadgeTraining training={getTrainingByDay(date.toISOString(true), training)} />
    );

    return (
        <>
            <div className={styles.CalendarPage}>
                {isOpenModal && (
                    <Portal container={selectedCell}>
                        <CardModal />
                    </Portal>
                )}

                <Calendar onSelect={onSelectHandler} dateCellRender={dateCellRender} />
            </div>

            <ModalRequestError
                title='При открытии данных произошла ошибка'
                type='info'
                isError={isError}
                subtitle='Попробуйте ещё раз.'
                okText='Обновить'
                onClickButton={() => refetch()}
            />
        </>
    );
};
