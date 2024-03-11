import { CardTraining } from '../card-training';
import { CardExercises } from '../card-exercises';
import { useEffect, useState } from 'react';
import { DrawerExercise } from '../drawer-exercise';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { getTrainingByDay } from '@utils/index';
import { setExercises, setIsCardExercises } from '@redux/reducers/training-slice';

export const CardModal = () => {
    const dispatch = useAppDispatch();
    const { selectedDate, training, isCardExercises } = useAppSelector(trainingSelector);
    const [openDrawerExercises, setOpenDrawerExercises] = useState(false);

    const trainingByDay = getTrainingByDay(selectedDate, training);

    useEffect(() => {
        dispatch(setExercises({ trainingByDay }));
        dispatch(
            setIsCardExercises({
                isCardExercises: false,
            }),
        );
    }, []);

    const nextModalHandler = () =>
        dispatch(
            setIsCardExercises({
                isCardExercises: true,
            }),
        );
    const prevModalHandler = () =>
        dispatch(
            setIsCardExercises({
                isCardExercises: false,
            }),
        );

    const closeDrawerExercisesHandler = () => setOpenDrawerExercises(false);
    const openDrawerExercisesHandler = () => setOpenDrawerExercises(true);

    return (
        <>
            {isCardExercises ? (
                <CardExercises
                    trainingByDay={trainingByDay}
                    prevModalHandler={prevModalHandler}
                    openDrawerExercisesHandler={openDrawerExercisesHandler}
                />
            ) : (
                <CardTraining nextModalHandler={nextModalHandler} trainingByDay={trainingByDay} />
            )}

            <DrawerExercise
                openDrawerExercises={openDrawerExercises}
                closeDrawerExercisesHandler={closeDrawerExercisesHandler}
            />
        </>
    );
};
