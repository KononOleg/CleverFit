import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Nullable, Tariff, User } from '../../types';

type AuthState = {
    profile: Nullable<User>;
    tariffs: Tariff[];
};

const initialState: AuthState = {
    profile: null,
    tariffs: [],
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile(state, { payload: profile }: PayloadAction<Nullable<User>>) {
            state.profile = profile;
        },
        setTariffs(state, { payload: tariffs }: PayloadAction<Tariff[]>) {
            state.tariffs = tariffs;
        },
    },
});

export const { setProfile, setTariffs } = profileSlice.actions;
