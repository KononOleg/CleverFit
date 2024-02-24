import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthState = {
    token: string | null;
    email: string;
};

const initialState: AuthState = {
    token: null,
    email: '',
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
        setToken(state, action: PayloadAction<{ accessToken: string; remember: boolean }>) {
            if (!action.payload.remember) localStorage.setItem('token', action.payload.accessToken);

            state.token = action.payload.accessToken;
        },
    },
});

export const { signOut, setToken, setConfirmEmail } = authSlice.actions;
