import { Calendar } from 'antd';
import { useGetTrainingListQuery, useGetTrainingQuery } from '@redux/services/training-service';
import { CardModal } from './components/card-modal';

import styles from './calendar-page.module.scss';
import { useEffect, useState } from 'react';
import { Portal } from '@components/portal';
import moment, { Moment } from 'moment';
import { BadgeTraining } from './components/badge-training';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { setSelectedDate, setTraining, setTrainingList } from '@redux/reducers/training-slice';
import { getSelectedCell, getTrainingByDay } from '@utils/index';

export const CalendarPage = () => {
    const dispatch = useAppDispatch();
    const { training } = useAppSelector(trainingSelector);
    const [selectedCell, setSelectedCell] = useState<Element | undefined>(undefined);

    const { data } = useGetTrainingQuery(); // Delete
    const { data: trainingList } = useGetTrainingListQuery();

    useEffect(() => {
        if (trainingList) dispatch(setTrainingList({ trainingList }));
        if (data) dispatch(setTraining({ training: data })); // Delete
    }, [data, dispatch, trainingList]);

    const closeModalHandler = () => setSelectedCell(undefined);

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
                {selectedCell && (
                    <Portal container={selectedCell}>
                        <CardModal closeModalHandler={closeModalHandler} />
                    </Portal>
                )}

                <Calendar onSelect={onSelectHandler} dateCellRender={dateCellRender} />
            </div>
        </>
    );
};
