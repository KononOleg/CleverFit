import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { DATA_TEST_ID } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { BadgeCustom } from '@pages/calendar-page/components/badge-custom';
import { TrainingListSelect } from '@pages/calendar-page/components/training-select';
import { setCreatedTraining } from '@redux/reducers/training-slice';
import { inviteSelector, trainingSelector } from '@redux/selectors';
import { getKeyByPeriod, getPeriodByItem, periodOptions } from '@utils/find-period-option';
import { isOldDate } from '@utils/index';
import { Avatar, Checkbox, DatePicker, DatePickerProps } from 'antd';
import moment, { Moment } from 'moment';

import styles from './training-form.module.scss';

type Props = {
    isEditExercises: boolean;
};

export const TrainingForm = ({ isEditExercises }: Props) => {
    const dispatch = useAppDispatch();
    const { training, trainingList, createdTraining } = useAppSelector(trainingSelector);
    const { createdTrainingPal } = useAppSelector(inviteSelector);
    const [isShowPeriod, setIsShowPeriod] = useState(createdTraining.parameters?.repeat);

    const [firstName, lastName] = createdTrainingPal?.name.split(' ') ?? [];

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
        <div className={styles.trainingForm}>
            {createdTrainingPal ? (
                <div className={styles.partner}>
                    <div className={styles.userInfo}>
                        <Avatar
                            size={42}
                            alt={createdTrainingPal.name}
                            src={createdTrainingPal.imageSrc}
                            icon={!createdTrainingPal.imageSrc && <UserOutlined />}
                        />

                        <h6>
                            {firstName}
                            <br /> {lastName}
                        </h6>
                    </div>
                    <BadgeCustom text={createdTrainingPal.trainingType} />
                </div>
            ) : (
                <TrainingListSelect
                    dataTestId={DATA_TEST_ID.MODAL_CREATE_EXERCISE_SELECT}
                    trainingList={trainingList}
                    selectedTrainings={[]}
                    changeSelectHandler={onChangeName}
                    defaultValue={createdTraining.name}
                    disabled={isEditExercises}
                />
            )}

            <div className={styles.period}>
                <div className={styles.inputWrapper}>
                    <DatePicker
                        size='small'
                        data-test-id={DATA_TEST_ID.MODAL_DRAWER_RIGHT_DATE_PICKER}
                        disabledDate={disabledDateHandler}
                        dateRender={dateCellRender}
                        onChange={onChangeDate}
                        defaultValue={
                            createdTraining.date ? moment(createdTraining.date) : undefined
                        }
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
                <div className={styles.inputWrapper}>
                    <TrainingListSelect
                        dataTestId={DATA_TEST_ID.MODAL_DRAWER_RIGHT_SELECT_PERIOD}
                        trainingList={periodOptions}
                        selectedTrainings={[]}
                        changeSelectHandler={onChangePeriod}
                        defaultValue={
                            getKeyByPeriod(createdTraining.parameters?.period) ||
                            periodOptions[0].name
                        }
                    />
                </div>
            )}
        </div>
    );
};
