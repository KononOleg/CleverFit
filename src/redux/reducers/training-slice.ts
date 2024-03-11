import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exercise, Training, TrainingList } from '../../types';

type AuthState = {
    training: Training[];
    selectedDate: string | null;
    trainingList: TrainingList;
    exercises: Exercise[];
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
    exercises: [],
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
        setIsCardExercises(state, action: PayloadAction<{ isCardExercises: boolean }>) {
            state.isCardExercises = action.payload.isCardExercises;
        },
        setTraining(state, action: PayloadAction<{ training: Training[] }>) {
            state.training = action.payload.training;
        },

        updateTraining(state, action: PayloadAction<{ training: Training }>) {
            state.training.push(action.payload.training);
        },
        setExercises(state, action: PayloadAction<{ trainingByDay: Training[] }>) {
            const exercises: Exercise[] = [];
            action.payload.trainingByDay.map((training) => exercises.push(...training.exercises));
            state.exercises = exercises;
            state.createdTraining = initialTraining;
        },
        setSelectedDate(state, action: PayloadAction<{ selectedDate: string }>) {
            state.selectedDate = action.payload.selectedDate;
        },
        setTrainingList(state, action: PayloadAction<{ trainingList: TrainingList }>) {
            state.trainingList = action.payload.trainingList;
        },
        addTraining(state, action: PayloadAction<{ training: Training }>) {
            state.createdTraining = action.payload.training;
            state.createdTraining.exercises = [initialExercise];
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

        addExercise(state) {
            state.createdTraining.exercises.push(initialExercise);
        },
    },
});

export const {
    setTraining,
    setIsCardExercises,
    setSelectedDate,
    setTrainingList,
    addTraining,
    setExercises,
    addExercise,
    setExercise,
    updateTraining,
    closeModal,
} = trainingSlice.actions;
