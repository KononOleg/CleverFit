import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserJointTrainig } from '../../types';

type InviteState = {
    userJointTrainigList: UserJointTrainig[];
    trainingPals: UserJointTrainig[];
};

const initialState: InviteState = {
    userJointTrainigList: [],
    trainingPals: [],
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
    },
});

export const { setUserJointTrainigList, setTrainingPals } = inviteSlice.actions;
