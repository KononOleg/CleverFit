import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthState = {
    token: string | null;
    email: string;
    password: string;
};

const initialState: AuthState = {
    token: null,
    email: '',
    password: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut(state) {
            localStorage.clear();
            state.token = null;
        },
        setConfirmEmail(state, action: PayloadAction<{ email: string }>) {
            state.email = action.payload.email;
        },
        setPassword(state, action: PayloadAction<{ password: string }>) {
            state.email = action.payload.password;
        },
        setToken(state, action: PayloadAction<{ accessToken: string; remember: boolean }>) {
            if (action.payload.remember) localStorage.setItem('token', action.payload.accessToken);

            state.token = action.payload.accessToken;
        },
    },
});

export const { signOut, setToken, setConfirmEmail, setPassword } = authSlice.actions;
