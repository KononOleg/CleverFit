import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nullable, User } from '../../types';

type AuthState = {
    profile: Nullable<User>;
};

const initialState: AuthState = {
    profile: null,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile(state, { payload: profile }: PayloadAction<Nullable<User>>) {
            state.profile = profile;
        },
    },
});

export const { setProfile } = profileSlice.actions;
