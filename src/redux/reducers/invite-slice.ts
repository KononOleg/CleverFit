import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Invite, JointTrainig, Nullable } from '@/types/index';



type InviteState = {
    jointTrainigList: JointTrainig[];
    trainingPals: JointTrainig[];
    createdTrainingPal: Nullable<JointTrainig>;
    inviteList: Invite[];
};

const initialState: InviteState = {
    jointTrainigList: [],
    trainingPals: [],
    createdTrainingPal: null,
    inviteList: [],
};

export const inviteSlice = createSlice({
    name: 'invite',
    initialState,
    reducers: {
        setJointTrainigList(
            state,
            { payload: userJointTrainigList }: PayloadAction<JointTrainig[]>,
        ) {
            state.jointTrainigList = userJointTrainigList;
        },
        setJointTrainingStatus(
            state,
            { payload: { id, status } }: PayloadAction<{ id: string; status: string }>,
        ) {
            const findIndex = state.jointTrainigList.findIndex((joint) => joint.id === id);

            state.jointTrainigList[findIndex].status = status;
        },
        setTrainingPals(state, { payload: trainingPals }: PayloadAction<JointTrainig[]>) {
            state.trainingPals = trainingPals;
        },
        removeTrainingPal(state, { payload: id }: PayloadAction<string>) {
            state.trainingPals = state.trainingPals.filter(({ inviteId }) => inviteId !== id);
        },
        setCreatedTrainingPal(state, { payload: createdTrainingPal }: PayloadAction<JointTrainig>) {
            state.createdTrainingPal = createdTrainingPal;
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
    setJointTrainigList,
    setTrainingPals,
    removeTrainingPal,
    setCreatedTrainingPal,
    setJointTrainingStatus,
    setInviteList,
    removeInvite,
} = inviteSlice.actions;
