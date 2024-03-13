import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    isDesktopVersion: boolean;
};

const initialState: AuthState = {
    isDesktopVersion: true,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setisDesktopVersion(state, { payload: isDesktopVersion }: PayloadAction<boolean>) {
            state.isDesktopVersion = isDesktopVersion;
        },
    },
});

export const { setisDesktopVersion } = appSlice.actions;
