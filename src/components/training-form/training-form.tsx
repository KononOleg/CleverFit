import { useState } from 'react';
import { DATA_TEST_ID } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { TrainingListSelect } from '@pages/calendar-page/components/training-select';
import { setCreatedTraining } from '@redux/reducers/training-slice';
import { trainingSelector } from '@redux/selectors';
import { getPeriodByItem, periodOptions } from '@utils/find-period-option';
import { isOldDate } from '@utils/index';
import { Checkbox, DatePicker, DatePickerProps } from 'antd';
import moment, { Moment } from 'moment';

import styles from './training-form.module.scss';

export const TrainingForm = () => {
    const dispatch = useAppDispatch();
    const { training, trainingList, createdTraining } = useAppSelector(trainingSelector);
    const [isShowPeriod, setIsShowPeriod] = useState(false);

    const dateCellRender = (pickerDate: Moment) => {
        const trainingToday = training.find(({ date }) => pickerDate.isSame(date, 'days'));

        if (trainingToday) return <div className={styles.DisabledDate}>{pickerDate.date()}</div>;

        return pickerDate.date();
    };

    const disabledDateHandler = (pickerDate: Moment) => isOldDate(pickerDate.toISOString(true));

    const onChangeDate: DatePickerProps['onChange'] = (date) =>
        dispatch(setCreatedTraining({ ...createdTraining, date: moment(date).toISOString(true) }));
    const onChangeName = (name: string) =>
        dispatch(setCreatedTraining({ ...createdTraining, name }));
    const onChangePeriod = (period: string) =>
        dispatch(
            setCreatedTraining({
                ...createdTraining,
                parameters: {
                    repeat: true,
                    period: getPeriodByItem(period) as number,
                    jointTraining: false,
                },
            }),
        );
    const changePeriodHandler = () => {
        if (isShowPeriod)
            dispatch(
                setCreatedTraining({
                    ...createdTraining,
                    parameters: undefined,
                }),
            );
        else
            dispatch(
                setCreatedTraining({
                    ...createdTraining,
                    parameters: {
                        repeat: true,
                        period: getPeriodByItem(periodOptions[0].name) as number,
                        jointTraining: false,
                    },
                }),
            );
        setIsShowPeriod(!isShowPeriod);
    };

    return (
        <div className={styles.TrainingForm}>
            <TrainingListSelect
                dataTestId={DATA_TEST_ID.MODAL_CREATE_EXERCISE_SELECT}
                trainingList={trainingList}
                selectedTrainings={[]}
                changeSelectHandler={onChangeName}
                defaultValue={null}
            />

            <div className={styles.Period}>
                <div className={styles.InputWrapper}>
                    <DatePicker
                        size='small'
                        data-test-id={DATA_TEST_ID.MODAL_DRAWER_RIGHT_DATE_PICKER}
                        disabledDate={disabledDateHandler}
                        dateRender={dateCellRender}
                        onChange={onChangeDate}
                    />
                </div>
                <Checkbox
                    data-test-id={DATA_TEST_ID.MODAL_DRAWER_RIGHT_CHECKBOX_PERIOD}
                    checked={isShowPeriod}
                    onChange={changePeriodHandler}
                >
                    С периодичностью
                </Checkbox>
            </div>

            {isShowPeriod && (
                <div className={styles.InputWrapper}>
                    <TrainingListSelect
                        dataTestId={DATA_TEST_ID.MODAL_DRAWER_RIGHT_SELECT_PERIOD}
                        trainingList={periodOptions}
                        selectedTrainings={[]}
                        changeSelectHandler={onChangePeriod}
                        defaultValue={periodOptions[0].name}
                    />
                </div>
            )}
        </div>
    );
};
