import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Invite, Nullable, UserJointTrainig } from '../../types';

type InviteState = {
    userJointTrainigList: UserJointTrainig[];
    trainingPals: UserJointTrainig[];
    createdTrainingPal: Nullable<UserJointTrainig>;
    inviteList: Invite[];
};

const initialState: InviteState = {
    userJointTrainigList: [],
    trainingPals: [],
    createdTrainingPal: null,
    inviteList: [],
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
        removeTrainingPal(state, { payload: id }: PayloadAction<string>) {
            state.trainingPals = state.trainingPals.filter(({ inviteId }) => inviteId !== id);
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

        setInviteList(state, { payload: inviteList }: PayloadAction<Invite[]>) {
            state.inviteList = inviteList;
        },

        removeInvite(state, { payload: id }: PayloadAction<string>) {
            // eslint-disable-next-line no-underscore-dangle
            state.inviteList = state.inviteList.filter((invite) => invite._id !== id);
        },
    },
});

export const {
    setUserJointTrainigList,
    setTrainingPals,
    removeTrainingPal,
    setCreatedTrainingPal,
    setJointTrainingStatus,
    setInviteList,
    removeInvite,
} = inviteSlice.actions;
