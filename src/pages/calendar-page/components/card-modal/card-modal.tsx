import { CardTraining } from '../card-training';
import { CardExercises } from '../card-exercises';
import { useState } from 'react';
import { DrawerExercise } from '../drawer-exercise';

type Props = {
    closeModalHandler: () => void;
};

export const CardModal = ({ closeModalHandler }: Props) => {
    const [isCardExercises, setIsCardExercises] = useState(false);
    const [openDrawerExercises, setOpenDrawerExercises] = useState(false);

    const nextModalHandler = () => setIsCardExercises(true);
    const prevModalHandler = () => setIsCardExercises(false);

    const closeDrawerExercisesHandler = () => setOpenDrawerExercises(false);
    const openDrawerExercisesHandler = () => setOpenDrawerExercises(true);

    return (
        <>
            {isCardExercises ? (
                <CardExercises
                    prevModalHandler={prevModalHandler}
                    openDrawerExercisesHandler={openDrawerExercisesHandler}
                />
            ) : (
                <CardTraining
                    closeModalHandler={closeModalHandler}
                    nextModalHandler={nextModalHandler}
                />
            )}

            <DrawerExercise
                openDrawerExercises={openDrawerExercises}
                closeDrawerExercisesHandler={closeDrawerExercisesHandler}
            />
        </>
    );
};
