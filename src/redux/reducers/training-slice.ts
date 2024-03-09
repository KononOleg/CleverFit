import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Training, TrainingList } from '../../types';

type AuthState = {
    training: Training[];
    selectedDate: string | null;
    trainingList: TrainingList;
};

const initialState: AuthState = {
    training: [],
    selectedDate: null,
    trainingList: [],
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setTraining(state, action: PayloadAction<{ training: Training[] }>) {
            state.training = action.payload.training;
        },
        setSelectedDate(state, action: PayloadAction<{ selectedDate: string }>) {
            state.selectedDate = action.payload.selectedDate;
        },
        setTrainingList(state, action: PayloadAction<{ trainingList: TrainingList }>) {
            state.trainingList = action.payload.trainingList;
        },
    },
});

export const { setTraining, setSelectedDate, setTrainingList } = trainingSlice.actions;
