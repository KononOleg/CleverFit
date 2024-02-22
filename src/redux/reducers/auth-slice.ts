import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthState = {
    token: string | null;
};

const initialState: AuthState = {
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut(state) {
            localStorage.clear();
            state.token = null;
        },
        setToken(state, action: PayloadAction<{ accessToken: string; remember: boolean }>) {
            if (!action.payload.remember) localStorage.setItem('token', action.payload.accessToken);

            state.token = action.payload.accessToken;
        },
    },
});

export const { signOut, setToken } = authSlice.actions;
