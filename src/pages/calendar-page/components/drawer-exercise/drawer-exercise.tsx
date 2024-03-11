import { Button, Drawer } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './drawer-exercise.module.scss';

import moment from 'moment';
import { BadgeCustom } from '../badge-custom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';

import { addExercise } from '@redux/reducers/training-slice';
import { ExerciseForm } from '../exercise-form';
import { DATA_TEST_ID } from '@constants/index';

type Props = { openDrawerExercises: boolean; closeDrawerExercisesHandler: () => void };

export const DrawerExercise = ({ openDrawerExercises, closeDrawerExercisesHandler }: Props) => {
    const dispatch = useAppDispatch();
    const { selectedDate, createdTraining } = useAppSelector(trainingSelector);

    const closeHandler = () => {
        if (createdTraining.exercises[createdTraining.exercises.length - 1].name)
            dispatch(addExercise());
        closeDrawerExercisesHandler();
    };

    const addExcerciseHandler = () => {
        dispatch(addExercise());
    };

    return (
        <Drawer
            title='Добавление упражнений'
            destroyOnClose={true}
            placement='right'
            closeIcon={<PlusOutlined />}
            open={openDrawerExercises}
            className={styles.DrawerExercises}
            data-test-id={DATA_TEST_ID.MODAL_DRAWER_RIGHT}
            extra={
                <Button
                    data-test-id={DATA_TEST_ID.MODAL_DRAWER_RIGHT_BUTTON_CLOSE}
                    type='text'
                    size='small'
                    icon={<CloseOutlined />}
                    onClick={closeHandler}
                />
            }
        >
            <div className={styles.Status}>
                <BadgeCustom text={createdTraining?.name as string} />
                <p>{moment(selectedDate).format('DD.MM.YYYY')}</p>
            </div>
            <div className={styles.Exercises}>
                {createdTraining?.exercises.map(({ name, replays, weight, approaches }, index) => (
                    <ExerciseForm
                        excerciseNameInitial={name}
                        replaysInitial={replays}
                        weightInitial={weight}
                        approachesInitial={approaches}
                        index={index}
                    />
                ))}

                <div className={styles.Buttons}>
                    <Button
                        type='link'
                        icon={<PlusOutlined />}
                        size='small'
                        onClick={addExcerciseHandler}
                    >
                        Добавить ещё
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};
