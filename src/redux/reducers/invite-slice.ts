import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Nullable, UserJointTrainig } from '../../types';

type InviteState = {
    userJointTrainigList: UserJointTrainig[];
    trainingPals: UserJointTrainig[];
    createdTrainingPal: Nullable<UserJointTrainig>;
};

const initialState: InviteState = {
    userJointTrainigList: [],
    trainingPals: [],
    createdTrainingPal: null,
};

export const inviteSlice = createSlice({
    name: 'invite',
    initialState,
    reducers: {
        setUserJointTrainigList(
            state,
            { payload: userJointTrainigList }: PayloadAction<UserJointTrainig[]>,
        ) {
            state.userJointTrainigList = userJointTrainigList;
        },
        setTrainingPals(state, { payload: trainingPals }: PayloadAction<UserJointTrainig[]>) {
            state.trainingPals = trainingPals;
        },
        setCreatedTrainingPal(
            state,
            { payload: createdTrainingPal }: PayloadAction<UserJointTrainig>,
        ) {
            state.createdTrainingPal = createdTrainingPal;
        },
        setJointTrainingStatus(
            state,
            { payload: { id, status } }: PayloadAction<{ id: string; status: string }>,
        ) {
            const findIndex = state.userJointTrainigList.findIndex((joint) => joint.id === id);

            state.userJointTrainigList[findIndex].status = status;
        },
    },
});

export const {
    setUserJointTrainigList,
    setTrainingPals,
    setCreatedTrainingPal,
    setJointTrainingStatus,
} = inviteSlice.actions;
