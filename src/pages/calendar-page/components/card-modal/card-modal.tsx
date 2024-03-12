import { CardTraining } from '../card-training';
import { CardExercises } from '../card-exercises';
import { useEffect, useState } from 'react';
import { DrawerExercise } from '../drawer-exercise';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { getTrainingByDay } from '@utils/index';
import { setCreatedTraining, setIsCardExercises } from '@redux/reducers/training-slice';

export const CardModal = () => {
    const dispatch = useAppDispatch();
    const { selectedDate, training, isCardExercises } = useAppSelector(trainingSelector);
    const [openDrawerExercises, setOpenDrawerExercises] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
    const [isEditExercises, setisEditExercises] = useState(false);

    const trainingByDay = getTrainingByDay(selectedDate, training);

    useEffect(() => {
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
    const prevModalHandler = () => {
        setSelectedTraining(null);
        dispatch(
            setIsCardExercises({
                isCardExercises: false,
            }),
        );
    };

    const closeDrawerExercisesHandler = () => setOpenDrawerExercises(false);

    const openDrawerExercisesHandler = () => {
        setisEditExercises(false);
        setOpenDrawerExercises(true);
    };
    const setSelectedTrainingHandler = (value: string) => setSelectedTraining(value);

    const onChangeTrainingHandler = (name: string) => {
        const trainingFilter = trainingByDay.find((exercise) => exercise.name === name);

        if (trainingFilter) {
            dispatch(
                setCreatedTraining({
                    training: trainingFilter,
                }),
            );
        }

        nextModalHandler();
        setSelectedTraining(name);
    };

    const onChangeExerciseHandler = () => {
        setisEditExercises(true);
        setOpenDrawerExercises(true);
    };

    return (
        <>
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
                    nextModalHandler={nextModalHandler}
                    trainingByDay={trainingByDay}
                    onChange={onChangeTrainingHandler}
                />
            )}

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
