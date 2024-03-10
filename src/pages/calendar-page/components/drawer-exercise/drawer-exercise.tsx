import { Button, Drawer } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './drawer-exercise.module.scss';

import moment from 'moment';
import { BadgeCustom } from '../badge-custom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';

import { addExercise } from '@redux/reducers/training-slice';
import { ExerciseForm } from '../exercise-form';

type Props = { openDrawerExercises: boolean; closeDrawerExercisesHandler: () => void };

export const DrawerExercise = ({ openDrawerExercises, closeDrawerExercisesHandler }: Props) => {
    const dispatch = useAppDispatch();
    const { selectedDate, createdTraining } = useAppSelector(trainingSelector);

    const closeHandler = () => closeDrawerExercisesHandler();

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
            extra={
                <Button type='text' size='small' icon={<CloseOutlined />} onClick={closeHandler} />
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
