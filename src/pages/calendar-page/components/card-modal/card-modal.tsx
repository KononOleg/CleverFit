import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setCreatedTraining, setIsCardExercises } from '@redux/reducers/training-slice';
import { trainingSelector } from '@redux/selectors';
import { getTrainingByDay } from '@utils/index';
import cn from 'classnames';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { CardExercises } from '../card-exercises';
import { CardTraining } from '../card-training';
import { DrawerExercise } from '../drawer-exercise';
import styles from './card-modal.module.scss';

type Props = {
    offsetTop: number;
};

export const CardModal = ({ offsetTop }: Props) => {
    const dispatch = useAppDispatch();
    const { selectedDate, training, isCardExercises } = useAppSelector(trainingSelector);
    const [openDrawerExercises, setOpenDrawerExercises] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
    const [isEditExercises, setisEditExercises] = useState(false);

    useEffect(() => {
        dispatch(setIsCardExercises(false));
    }, [dispatch]);

    useEffect(() => {
        if (!isCardExercises) setSelectedTraining(null);
    }, [isCardExercises]);

    const trainingByDay = getTrainingByDay(selectedDate, training);
    const isRight = moment(selectedDate).day() === 0 || moment(selectedDate).day() === 6;

    const nextModalHandler = () => dispatch(setIsCardExercises(true));
    const prevModalHandler = () => {
        setSelectedTraining(null);
        dispatch(setIsCardExercises(false));
    };

    const closeDrawerExercisesHandler = () => setOpenDrawerExercises(false);
    const openDrawerExercisesHandler = () => {
        setisEditExercises(false);
        setOpenDrawerExercises(true);
    };

    const setSelectedTrainingHandler = (value: string) => setSelectedTraining(value);

    const onChangeTrainingHandler = (name: string) => {
        const trainingFind = trainingByDay.find((exercise) => exercise.name === name);
        if (trainingFind) dispatch(setCreatedTraining(trainingFind));
        nextModalHandler();
        setSelectedTraining(name);
    };

    const onChangeExerciseHandler = () => {
        setisEditExercises(true);
        setOpenDrawerExercises(true);
    };

    return (
        <>
            <div
                className={cn(styles.CardWrapper, {
                    [styles.CardWrapperRight]: isRight && !offsetTop,
                    [styles.CardWrapperLeft]: !isRight && !offsetTop,
                })}
                style={{ top: offsetTop }}
            >
                {isCardExercises ? (
                    <CardExercises
                        trainingByDay={trainingByDay}
                        prevModalHandler={prevModalHandler}
                        openDrawerExercisesHandler={openDrawerExercisesHandler}
                        selectedTraining={selectedTraining}
                        setSelectedTraining={setSelectedTrainingHandler}
                        onChange={onChangeExerciseHandler}
                        isEditExercises={isEditExercises}
                    />
                ) : (
                    <CardTraining
                        trainingByDay={trainingByDay}
                        nextModalHandler={nextModalHandler}
                        onChange={onChangeTrainingHandler}
                    />
                )}
            </div>

            <DrawerExercise
                trainingByDay={trainingByDay}
                openDrawerExercises={openDrawerExercises}
                closeDrawerExercisesHandler={closeDrawerExercisesHandler}
                isEditExercises={isEditExercises}
                selectedTraining={selectedTraining as string}
            />
        </>
    );
};
