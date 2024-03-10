import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise, Training, TrainingList } from '../../types';

type AuthState = {
    training: Training[];
    selectedDate: string | null;
    trainingList: TrainingList;
    exercises: Exercise[];
    createdTraining: Training | null;
};

const initialState: AuthState = {
    training: [],
    selectedDate: null,
    trainingList: [],
    exercises: [],
    createdTraining: null,
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setTraining(state, action: PayloadAction<{ training: Training[] }>) {
            state.training = action.payload.training;
        },
        setExercises(state, action: PayloadAction<{ trainingByDay: Training[] }>) {
            const exercises: Exercise[] = [];
            action.payload.trainingByDay.map((training) => exercises.push(...training.exercises));
            state.exercises = exercises;
            state.createdTraining = null;
        },
        setSelectedDate(state, action: PayloadAction<{ selectedDate: string }>) {
            state.selectedDate = action.payload.selectedDate;
        },
        setTrainingList(state, action: PayloadAction<{ trainingList: TrainingList }>) {
            state.trainingList = action.payload.trainingList;
        },
        addTraining(state, action: PayloadAction<{ training: Training }>) {
            state.createdTraining = action.payload.training;
        },

        addExercise(state, action: PayloadAction<{ exercise: Exercise }>) {
            state.createdTraining?.exercises.push(action.payload.exercise);
        },
    },
});

export const {
    setTraining,
    setSelectedDate,
    setTrainingList,
    addTraining,
    setExercises,
    addExercise,
} = trainingSlice.actions;
