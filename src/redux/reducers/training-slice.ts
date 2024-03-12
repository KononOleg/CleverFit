import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise, Training, TrainingList } from '../../types';

type AuthState = {
    training: Training[];
    selectedDate: string | null;
    trainingList: TrainingList;
    createdTraining: Training;
    isCardExercises: boolean;
};
const initialExercise = {
    name: '',
    approaches: 1,
    weight: 0,
    replays: 1,
};

const initialTraining = {
    date: '',
    name: '',
    exercises: [initialExercise],
};

const initialState: AuthState = {
    training: [],
    selectedDate: null,
    trainingList: [],
    createdTraining: initialTraining,
    isCardExercises: false,
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        closeModal(state) {
            state.selectedDate = null;
        },
        setIsCardExercises(state, { payload: isCardExercises }: PayloadAction<boolean>) {
            state.isCardExercises = isCardExercises;
        },
        setSelectedDate(state, { payload: selectedDate }: PayloadAction<string>) {
            state.selectedDate = selectedDate;
        },
        setTraining(state, { payload: training }: PayloadAction<Training[]>) {
            state.training = training;
        },

        createTraining(state, { payload: training }: PayloadAction<Training>) {
            state.training.push(training);
        },
        setExercise(
            state,
            { payload: exercises }: PayloadAction<Partial<Exercise> & { index: number }>,
        ) {
            state.createdTraining.exercises[exercises.index] = {
                ...state.createdTraining.exercises[exercises.index],
                ...exercises,
            };
        },
        deleteExercises(state, { payload: indexes }: PayloadAction<number[]>) {
            state.createdTraining.exercises = state.createdTraining.exercises.filter(
                (_, index) => !indexes.includes(index),
            );
        },
        addExercise(state) {
            state.createdTraining.exercises.push(initialExercise);
        },
        setTrainingList(state, { payload: trainingList }: PayloadAction<TrainingList>) {
            state.trainingList = trainingList;
        },
        addCreatedTraining(state, { payload: training }: PayloadAction<Training>) {
            state.createdTraining = training;
            state.createdTraining.exercises = [initialExercise];
        },
        setCreatedTraining(state, { payload: createdTraining }: PayloadAction<Training>) {
            state.createdTraining = createdTraining;
        },
        resetCreatedTraining(state) {
            state.createdTraining = initialTraining;
        },
    },
});

export const {
    closeModal,
    setIsCardExercises,
    setSelectedDate,
    setTraining,
    createTraining,
    setExercise,
    deleteExercises,
    addExercise,
    setTrainingList,
    addCreatedTraining,
    setCreatedTraining,
    resetCreatedTraining,
} = trainingSlice.actions;
