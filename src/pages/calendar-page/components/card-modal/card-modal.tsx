import { CardTraining } from '../card-training';
import { CardExercises } from '../card-exercises';
import { useEffect, useState } from 'react';
import { DrawerExercise } from '../drawer-exercise';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { getTrainingByDay } from '@utils/index';
import { setCreatedTraining, setIsCardExercises } from '@redux/reducers/training-slice';
import moment from 'moment';

export const CardModal = () => {
    const dispatch = useAppDispatch();
    const { selectedDate, training, isCardExercises } = useAppSelector(trainingSelector);
    const [openDrawerExercises, setOpenDrawerExercises] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
    const [isEditExercises, setisEditExercises] = useState(false);

    useEffect(() => {
        dispatch(setIsCardExercises(false));
    }, []);

    useEffect(() => {
        if (!isCardExercises) setSelectedTraining(null);
    }, [isCardExercises]);

    const trainingByDay = getTrainingByDay(selectedDate, training);
    const isRight = moment(selectedDate).day() === 0;

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
            {isCardExercises ? (
                <CardExercises
                    trainingByDay={trainingByDay}
                    isRight={isRight}
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
                    isRight={isRight}
                    nextModalHandler={nextModalHandler}
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
