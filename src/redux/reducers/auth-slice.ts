import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Nullable } from '@/types/index';



type AuthState = {
    token: Nullable<string>;
    email: string;
    password: string;
    isLoading: boolean;
};

const initialState: AuthState = {
    token: null,
    email: '',
    password: '',
    isLoading: true,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkAuth(state) {
            const token = localStorage.getItem('token');

            if (token) state.token = token;
            state.isLoading = false;
        },
        signOut(state) {
            localStorage.clear();
            state.token = null;
        },
        setConfirmEmail(state, { payload: email }: PayloadAction<string>) {
            state.email = email;
        },
        setPassword(state, { payload: password }: PayloadAction<string>) {
            state.password = password;
        },
        setToken(state, action: PayloadAction<{ accessToken: string; remember: boolean }>) {
            if (action.payload.remember) localStorage.setItem('token', action.payload.accessToken);

            state.token = action.payload.accessToken;
        },
    },
});

export const { checkAuth, signOut, setToken, setConfirmEmail, setPassword } = authSlice.actions;
