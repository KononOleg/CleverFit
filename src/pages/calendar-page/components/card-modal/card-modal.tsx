import { CardTraining } from '../card-training';
import { CardExercises } from '../card-exercises';
import { useEffect, useState } from 'react';
import { DrawerExercise } from '../drawer-exercise';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { getTrainingByDay } from '@utils/index';
import { setExercises } from '@redux/reducers/training-slice';

type Props = {
    closeModalHandler: () => void;
};

export const CardModal = ({ closeModalHandler }: Props) => {
    const dispatch = useAppDispatch();
    const { selectedDate, training } = useAppSelector(trainingSelector);
    const [isCardExercises, setIsCardExercises] = useState(false);
    const [openDrawerExercises, setOpenDrawerExercises] = useState(false);

    const trainingByDay = getTrainingByDay(selectedDate, training);

    useEffect(() => {
        dispatch(setExercises({ trainingByDay }));
    }, []);

    const nextModalHandler = () => setIsCardExercises(true);
    const prevModalHandler = () => setIsCardExercises(false);

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
                <CardTraining
                    closeModalHandler={closeModalHandler}
                    nextModalHandler={nextModalHandler}
                    trainingByDay={trainingByDay}
                />
            )}

            <DrawerExercise
                openDrawerExercises={openDrawerExercises}
                closeDrawerExercisesHandler={closeDrawerExercisesHandler}
            />
        </>
    );
};
